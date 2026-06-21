"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../../context/AuthContext"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError("")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login(formData.email, formData.password)
      router.push("/dashboard")
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } }
      setError(error.response?.data?.error || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0A0A0A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#6366F1",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "20px",
          }}>
            🎯
          </div>
          <h1 style={{
            color: "#F5F5F5",
            fontSize: "22px",
            fontWeight: "600",
            margin: "0 0 8px",
            letterSpacing: "-0.3px",
          }}>
            Welcome back
          </h1>
          <p style={{ color: "#71717A", fontSize: "14px", margin: 0 }}>
            Continue your interview practice
          </p>
        </div>

        <div style={{
          backgroundColor: "#111111",
          border: "1px solid #1F1F1F",
          borderRadius: "16px",
          padding: "32px",
        }}>
          {error && (
            <div style={{
              backgroundColor: "#1C0A0A",
              border: "1px solid #3F1111",
              borderRadius: "8px",
              padding: "12px 14px",
              marginBottom: "20px",
              color: "#F87171",
              fontSize: "13px",
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block",
                color: "#A1A1AA",
                fontSize: "13px",
                fontWeight: "500",
                marginBottom: "6px",
              }}>
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  backgroundColor: "#0A0A0A",
                  border: "1px solid #2A2A2A",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  color: "#F5F5F5",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#6366F1"}
                onBlur={(e) => e.target.style.borderColor = "#2A2A2A"}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
              }}>
                <label style={{
                  color: "#A1A1AA",
                  fontSize: "13px",
                  fontWeight: "500",
                }}>
                  Password
                </label>
                <Link href="/forgot-password" style={{
                  color: "#6366F1",
                  fontSize: "12px",
                  textDecoration: "none",
                }}>
                  Forgot password?
                </Link>
              </div>
              <input
                name="password"
                type="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  backgroundColor: "#0A0A0A",
                  border: "1px solid #2A2A2A",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  color: "#F5F5F5",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#6366F1"}
                onBlur={(e) => e.target.style.borderColor = "#2A2A2A"}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                backgroundColor: isLoading ? "#4338CA" : "#6366F1",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "8px",
                padding: "11px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "background-color 0.15s",
                letterSpacing: "0.1px",
              }}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p style={{
          textAlign: "center",
          color: "#52525B",
          fontSize: "13px",
          marginTop: "24px",
        }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{
            color: "#6366F1",
            textDecoration: "none",
            fontWeight: "500",
          }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}