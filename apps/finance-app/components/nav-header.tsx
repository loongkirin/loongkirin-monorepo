"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChartNoAxesCombinedIcon, MenuIcon, UserRoundIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@loongkirin/ui/src/navigation-menu"
import { useIsMobile } from "@loongkirin/ui/hooks/use-mobile"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@loongkirin/ui/src/sheet"
import { useState } from "react"
import { Button } from "@loongkirin/ui/src/button"

const routes = [
  {
    href: "/",
    label: "Home",
    icon: <ChartNoAxesCombinedIcon className="size-6"/>
  },
  {
    href: "/docs",
    label: "Docs",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/account/login",
    label: "Login",
    icon: <UserRoundIcon className="size-4"/>
  },
];

export function NavHeader() {
  const isMobile = useIsMobile()
  const router = useRouter();
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if(isMobile) {
    return(
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="font-normal border-none outline-none transition"
          >
            <MenuIcon className="size-4 font-bold" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <SheetTitle/>
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathname ? "secondary" : "ghost"}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }
  return (
    <NavigationMenu className="flex">
      <NavigationMenuList className="gap-2 *:data-[slot=navigation-menu-item]:h-7 **:data-[slot=navigation-menu-link]:py-1 **:data-[slot=navigation-menu-link]:font-medium">
        {routes.map((route) => (
          <NavigationMenuItem key={route.href}>
            <NavigationMenuLink asChild data-active={pathname === route.href}>
              <Link href={route.href}>{route.icon ? <div className="flex items-center gap-2">{route.icon}{route.label}</div> : route.label} </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
