import { ModeSwitcher } from "@loongkirin/ui/src/mode-switcher"
import { NavHeader } from "@/components/nav-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeSelector } from "@loongkirin/ui/src/theme-selector"
import { Separator } from "@loongkirin/ui/src/separator"
import {
  SidebarInset,
} from "@loongkirin/ui/src/sidebar"

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <SidebarInset className="min-h-screen">
        <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
          <div className="flex h-14 w-full items-center gap-2 md:px-4 xl:px-16">
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="flex-grow">
              <NavHeader />
            </div>
            {/* <NavHeader /> */}
            <div className="ml-auto flex items-center gap-2">
              <ThemeSelector />
              <ModeSwitcher />
            </div>
          </div>
        </header>
        <div className="flex-grow">
          {children}
        </div>
        <SiteFooter />
      </SidebarInset>
    </div>
  )
}
