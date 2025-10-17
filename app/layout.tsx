import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Newsline Training Agency - Attachment Opportunities',
  description: 'Apply for attachment opportunities in Media, Public Relations, Film Production, IT, and more.',
  keywords: 'attachment, internship, training, media, IT, film production, Kenya',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
