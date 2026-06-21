import { Hono } from "hono"
import { prisma } from "../lib/prisma"
import { hashPassword, comparePassword, generateToken } from "../utils/auth"
import { registerSchema, loginSchema } from "../validators/auth.validator"

const authRouter = new Hono()

authRouter.post("/register", async (c) => {
  try {
    const body = await c.req.json()

    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      return c.json({
        error: "Validation failed",
        details: validation.error.flatten().fieldErrors
      }, 400)
    }

    const { name, email, password } = validation.data

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return c.json({ error: "Email already registered" }, 409)
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    })

    const token = generateToken({ userId: user.id, email: user.email })

    return c.json({
      message: "Account created successfully",
      user,
      token,
    }, 201)

  } catch (error) {
    console.error("Register error:", error)
    return c.json({ error: "Internal server error" }, 500)
  }
})

authRouter.post("/login", async (c) => {
  try {
    const body = await c.req.json()

    const validation = loginSchema.safeParse(body)
    if (!validation.success) {
      return c.json({
        error: "Validation failed",
        details: validation.error.flatten().fieldErrors
      }, 400)
    }

    const { email, password } = validation.data

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.password) {
      return c.json({ error: "Invalid email or password" }, 401)
    }

    const passwordMatch = await comparePassword(password, user.password)

    if (!passwordMatch) {
      return c.json({ error: "Invalid email or password" }, 401)
    }

    const token = generateToken({ userId: user.id, email: user.email })

    return c.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    })

  } catch (error) {
    console.error("Login error:", error)
    return c.json({ error: "Internal server error" }, 500)
  }
})

authRouter.get("/me", async (c) => {
  const authHeader = c.req.header("Authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "No token provided" }, 401)
  }

  const token = authHeader.split(" ")[1]

  const { verifyToken } = await import("../utils/auth")
  const payload = verifyToken(token)

  if (!payload) {
    return c.json({ error: "Invalid or expired token" }, 401)
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      createdAt: true,
    }
  })

  if (!user) {
    return c.json({ error: "User not found" }, 404)
  }

  return c.json({ user })
})

export default authRouter