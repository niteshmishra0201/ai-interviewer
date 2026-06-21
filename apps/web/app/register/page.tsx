"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../../context/AuthContext"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
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

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      setIsLoading(false)
      return
    }

    if (!/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
      setError("Password must contain an uppercase letter and a number")
      setIsLoading(false)
      return
    }

    try {
      await register(formData.name, formData.email, formData.password)
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
            Create your account
          </h1>
          <p style={{ color: "#71717A", fontSize: "14px", margin: 0 }}>
            Start practicing interviews today
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
              lineHeight: "1.5",
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
                Full name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Nitesh Mishra"
                value={formData.name}
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
              <label style={{
                display: "block",
                color: "#A1A1AA",
                fontSize: "13px",
                fontWeight: "500",
                marginBottom: "6px",
              }}>
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Min 8 chars, 1 uppercase, 1 number"
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
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <p style={{
          textAlign: "center",
          color: "#52525B",
          fontSize: "13px",
          marginTop: "24px",
        }}>
          Already have an account?{" "}
          <Link href="/login" style={{
            color: "#6366F1",
            textDecoration: "none",
            fontWeight: "500",
          }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}