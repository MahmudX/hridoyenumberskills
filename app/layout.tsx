import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'হৃদয়ে নাম্বারস্কিলস',
  description: "Team Numberskills' desk Occupancy and Memories"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
