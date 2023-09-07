import './globals.css'
import { Inter } from 'next/font/google'
import { ToolSwitcherProvider } from './context/toolSwitcherContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chatbot',
  description: 'Created by Jean-Marcel Galloy',
}

export default function RootLayout({ children }) {
  return (
    <ToolSwitcherProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ToolSwitcherProvider>
  )
}
