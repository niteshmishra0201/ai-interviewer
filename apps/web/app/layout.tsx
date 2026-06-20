// This is the ROOT LAYOUT — it wraps EVERY page in your entire app
// Think of it like a picture frame — every page goes inside this frame
// Whatever you put here (navbar, footer) appears on ALL pages

import type { Metadata } from "next"
// Metadata type from Next.js — used to define page title, description
// These show up in browser tab and in Google search results

import "./globals.css"
// Importing our global CSS here so Tailwind works on every page
// You only import global CSS in the root layout, not in individual pages

// Metadata object — Next.js reads this and puts it in the <head> tag
export const metadata: Metadata = {
  title: "AI Interviewer",
  description: "Practice interviews with AI — voice, adaptive, and personalized",
}

// RootLayout receives "children" — children is whatever page is currently active
// When user visits "/dashboard", the dashboard page becomes the "children" here
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  // React.ReactNode means "any valid React content"
  // Could be a component, text, number, array of elements, etc.
}) {
  return (
    <html lang="en">
      {/* lang="en" tells browsers and screen readers this is English content */}
      <body>
        {children}
        {/* 
          This is where the actual page content renders
          Every page you create gets injected here automatically by Next.js
        */}
      </body>
    </html>
  )
}