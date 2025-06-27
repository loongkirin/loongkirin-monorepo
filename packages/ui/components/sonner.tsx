"use client"

import { useTheme } from "next-themes"
import * as Sonner from "sonner"

const Toaster = ({ ...props }: Sonner.ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner.Toaster
      theme={theme as Sonner.ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster, Sonner }
