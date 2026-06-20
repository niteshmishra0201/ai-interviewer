import type { User } from "@ai-interviewer/types"

export default function HomePage() {

  const sampleUser: User = {
    id: "user_001",
    name: "Nitesh Mishra",
    email: "nitesh@example.com",
    createdAt: new Date()
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          AI Interviewer 🎯
        </h1>
        <p className="mt-4 text-gray-500">
          {}
          Welcome, {sampleUser.name}
        </p>
      </div>
    </main>
  )
}