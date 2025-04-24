"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageSquare, BarChart2, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      name: "AI Best Practices Chatbot",
      path: "/chat",
      icon: <MessageSquare className="h-4 w-4 mr-2" />,
    },
    {
      name: "YouTube Video Analyzer",
      path: "/analyzer",
      icon: <BarChart2 className="h-4 w-4 mr-2" />,
    },
  ]

  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl ml-10">
            AI Tools
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                pathname === route.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {route.icon}
              {route.name}
            </Link>
          ))}
          <ModeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center py-2 text-sm font-medium transition-colors hover:text-primary ${
                      pathname === route.path ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {route.icon}
                    {route.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
