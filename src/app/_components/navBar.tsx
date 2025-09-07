"use client"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { LogOut, Star, Menu, X, Search, Router } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function Navbar({ name, image }: { name: string | null | undefined; image: string | null | undefined }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [search, setSearch] = useState("")
    const router = useRouter();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const toggleSearch = () => {
        setSearch("")
        setIsSearchActive(!isSearchActive)
    }

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here, e.g., redirect to a search results page
        if (search.trim() !== "") {
            router.push(`/movie/search/${encodeURIComponent(search)}`);
        }
    };

    return (
        <>
            <nav
                className={`bg-primary text-primary-foreground sticky flex top-0 w-full ${isSearchActive ? "h-32 md:h-20" : "h-20"} items-center justify-center z-50 transition-all duration-1000 ease-in-out`}
            >
                <div className="container mx-auto px-4 py-3 flex flex-col max-w-6xl">
                    <div className="flex items-center justify-between w-full">
                        <div className="text-3xl font-bold">
                            <Link href="/">Movinder</Link>
                        </div>

                        <div className="flex items-center w-2/3 justify-end">
                            {isSearchActive && (
                                <div className="hidden md:block w-2/3">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search movies, actor, director or keywords..."
                                            className="w-full px-4 py-3 rounded-lg bg-white/10 text-primary-foreground placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                                            autoFocus
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSearchSubmit(e);
                                                }
                                            }}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={toggleSearch}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-foreground hover:bg-white/10 h-8 w-8"
                                        >
                                            <X size={16} />
                                        </Button>
                                    </div>
                                </div>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleSearch}
                                className="text-primary-foreground hover:bg-white/10 mx-4"
                            >
                                <Search size={20} />
                            </Button>

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
                    </div>

                    {isSearchActive && (
                        <div className="mt-4 w-full md:hidden">
                            <div className="relative duration-1000">
                                <input
                                    type="text"
                                    placeholder="Search movies, actor, director or keywords..."
                                    className="w-full px-4 py-3 pr-10 rounded-lg bg-white/10 text-primary-foreground placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                                    autoFocus
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchSubmit(e);
                                        }
                                    }}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleSearch}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-foreground hover:bg-white/10 h-8 w-8"
                                >
                                    <X size={16} />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleMobileMenu} />}

            <div
                className={`fixed top-20 right-0 h-[calc(100vh-5rem)] w-80 bg-primary text-primary-foreground transform transition-transform duration-600 ease-in-out z-50 md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
