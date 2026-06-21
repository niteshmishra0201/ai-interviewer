import { createMiddleware } from "hono/factory"
import { verifyToken } from "../utils/auth"

export const authMiddleware = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("Authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Authentication required" }, 401)
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    return c.json({ error: "Token not provided" }, 401)
  }

  const payload = verifyToken(token)

  if (!payload) {
    return c.json({ error: "Invalid or expired token" }, 401)
  }

  c.set("userId", payload.userId)
  c.set("userEmail", payload.email)

  await next()
})