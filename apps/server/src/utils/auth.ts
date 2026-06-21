import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-never-use-in-production"
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export function generateToken(payload: { userId: string; email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions)
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
  } catch {
    return null
  }
}