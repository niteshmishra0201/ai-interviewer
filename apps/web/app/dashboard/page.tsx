"use client"

import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#71717A",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
      }}>
        Loading...
      </div>
    )
  }

  if (!user) return null

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0A0A0A",
      padding: "40px 24px",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "48px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#6366F1",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}>
              🎯
            </div>
            <span style={{
              color: "#F5F5F5",
              fontSize: "15px",
              fontWeight: "600",
            }}>
              AI Interviewer
            </span>
          </div>
          <button
            onClick={logout}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #2A2A2A",
              borderRadius: "8px",
              padding: "7px 14px",
              color: "#71717A",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>

        <h1 style={{
          color: "#F5F5F5",
          fontSize: "28px",
          fontWeight: "600",
          margin: "0 0 8px",
          letterSpacing: "-0.5px",
        }}>
          Good to see you, {user.name.split(" ")[0]} 👋
        </h1>
        <p style={{
          color: "#71717A",
          fontSize: "15px",
          margin: "0 0 48px",
        }}>
          Your dashboard is being built. More features coming soon.
        </p>

        <div style={{
          backgroundColor: "#111111",
          border: "1px solid #1F1F1F",
          borderRadius: "12px",
          padding: "24px",
          color: "#52525B",
          fontSize: "14px",
        }}>
          Phase 1 complete — Auth is working. Dashboard coming in Phase 2.
        </div>
      </div>
    </div>
  )
}