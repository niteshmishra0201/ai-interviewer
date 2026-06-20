import { Hono } from "hono"
import { logger } from "hono/logger"
import { cors } from "hono/cors"


const app = new Hono()


app.use("*", logger())
app.use("*", cors({
  origin: "http://localhost:3000",

}))


app.get("/", (c) => {
  return c.json({
    message: "AI Interviewer API is running 🚀",
    version: "1.0.0",
    status: "healthy"
  })
})


app.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString()

  })
})


export default {
  port: 8000,
  fetch: app.fetch,

}

console.log("🚀 Server running on http://localhost:8000")