import type React from "react"
import { Toolbar } from "basehub/next-toolbar"
import { basehub } from "basehub"
import Footer from "./components/footer"
import { PlaygroundSetupModal } from "./components/playground-notification"
import "./globals.css"
import "../basehub.config"
import { ThemeProvider } from "@/components/theme-provider"
import "../basehub.config"

export const dynamic = "force-static"
export const revalidate = 30

export const metadata = {
  generator: "v0.dev",
}

const envs: Record<string, { isValid: boolean; name: string; label: string }> = {}
const _vercel_url_env_name = "VERCEL_URL"
const isMainV0 = process.env[_vercel_url_env_name]?.startsWith("kzmquqo4qg7kooxw6eex")

let allValid = true
const subscribeEnv = ({
  name,
  label,
  value,
}: {
  name: string
  label: string
  value: string | undefined
}) => {
  const isValid = !!value
  if (!isValid) {
    allValid = false
  }
  envs[name] = {
    isValid,
    name,
    label,
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  let playgroundNotification = null

  subscribeEnv({
    name: "BASEHUB_TOKEN",
    label: "BaseHub Read Token",
    value: process.env.BASEHUB_TOKEN,
  })

  if (!isMainV0 && !allValid && process.env.NODE_ENV !== "production") {
    const playgroundData = await basehub().query({
      _sys: {
        playgroundInfo: {
          expiresAt: true,
          editUrl: true,
          claimUrl: true,
        },
      },
    })

    if (playgroundData._sys.playgroundInfo) {
      playgroundNotification = <PlaygroundSetupModal playgroundInfo={playgroundData._sys.playgroundInfo} envs={envs} />
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {!isMainV0 && <Toolbar />}
          {playgroundNotification}
          <main className="min-h-screen bg-white">
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
