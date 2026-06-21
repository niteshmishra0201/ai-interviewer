import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "../context/AuthContext"

export const metadata: Metadata = {
  title: "AI Interviewer",
  description: "Practice interviews with AI — voice, adaptive, and personalized",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}