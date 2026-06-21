import { Hono } from "hono"
import { logger } from "hono/logger"
import { cors } from "hono/cors"
import { prisma } from "./lib/prisma"
import authRouter from "./routes/auth"

const app = new Hono()

app.use("*", logger())
app.use("*", cors({
  origin: "http://localhost:3000",
}))

app.route("/api/auth", authRouter)

app.get("/", (c) => {
  return c.json({
    message: "AI Interviewer API is running 🚀",
    version: "1.0.0",
    status: "healthy"
  })
})

app.get("/health", async (c) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    return c.json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return c.json({
      status: "error",
      database: "disconnected",
      timestamp: new Date().toISOString()
    }, 500)
  }
})

export default {
  port: 8000,
  fetch: app.fetch,
}

console.log("🚀 Server running on http://localhost:8000")