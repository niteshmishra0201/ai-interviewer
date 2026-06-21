"use client"

import { createContext, useContext, useEffect, useState } from "react"
import api from "../lib/api"

type User = {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  createdAt: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      fetchCurrentUser(storedToken)
    } else {
      setIsLoading(false)
    }
  }, [])

  async function fetchCurrentUser(storedToken: string) {
    try {
      const response = await api.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      setUser(response.data.user)
    } catch {
      localStorage.removeItem("token")
    } finally {
      setIsLoading(false)
    }
  }

  async function login(email: string, password: string) {
    const response = await api.post("/api/auth/login", { email, password })
    const { token: newToken, user: newUser } = response.data
    localStorage.setItem("token", newToken)
    setToken(newToken)
    setUser(newUser)
  }

  async function register(name: string, email: string, password: string) {
    const response = await api.post("/api/auth/register", { name, email, password })
    const { token: newToken, user: newUser } = response.data
    localStorage.setItem("token", newToken)
    setToken(newToken)
    setUser(newUser)
  }

  function logout() {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    window.location.href = "/login"
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}