import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { LogOut, Star } from "lucide-react"
import Link from "next/link"

export default function Navbar({ name, image }: { name: string | null | undefined, image: string | null | undefined }) {
    return (
        <nav className="bg-primary text-primary-foreground sticky flex top-0 w-full h-20 items-center justify-center z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl ">
                <div className="text-3xl font-bold">
                    <Link href="/">
                        Movinder
                    </Link>
                </div>
                {image &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-12 md:h-14 w-12 md:w-14 rounded-full bg-white">
                                <Avatar className="h-10 md:h-10 w-10 md:w-10">
                                    <AvatarImage src={image} alt="@user" />
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
                }
            </div>
        </nav>
    )
}