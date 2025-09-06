"use client"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { LogOut, Star, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Navbar({ name, image }: { name: string | null | undefined; image: string | null | undefined }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <nav className="bg-primary text-primary-foreground sticky flex top-0 w-full h-20 items-center justify-center z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl">
          <div className="text-3xl font-bold">
            <Link href="/">Movinder</Link>
          </div>

          <div className="hidden md:flex items-center">
            {image == null && (
              <Link
                href="/api/auth/signin"
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                Log In
              </Link>
            )}
            {image && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 md:h-14 w-12 md:w-14 rounded-full bg-white">
                    <Avatar className="h-10 md:h-10 w-10 md:w-10">
                      <AvatarImage src={image || "/placeholder.svg"} alt="@user" />
                      <AvatarFallback className="text-black">{name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem>
                    <Star className="mr-2 h-4 w-4" />
                    <Link href="/movieListUser">My Ratings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <Link href="/api/auth/signout">Sign out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-primary-foreground hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleMobileMenu} />}

      <div
        className={`fixed top-20 right-0 h-[calc(100vh-5rem)] w-80 bg-primary text-primary-foreground transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          {image == null ? (
            <Link
              href="/api/auth/signin"
              className="block w-full text-center rounded-full bg-white/10 px-6 py-3 font-semibold no-underline transition hover:bg-white/20"
              onClick={toggleMobileMenu}
            >
              Log In
            </Link>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-4 border-b border-white/20">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={image || "/placeholder.svg"} alt="@user" />
                  <AvatarFallback className="text-black">{name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-lg font-semibold">{name}</div>
              </div>

              <Link
                href="/movieListUser"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={toggleMobileMenu}
              >
                <Star size={20} />
                <span>My Ratings</span>
              </Link>

              <Link
                href="/api/auth/signout"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={toggleMobileMenu}
              >
                <LogOut size={20} />
                <span>Sign out</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
