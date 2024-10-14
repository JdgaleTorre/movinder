'use client'

import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"
import { Button } from "~/components/ui/button"
import Link from 'next/link'

export default function ProfileMenu({ name, image }: { name: string, image: string | null }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <TooltipProvider>
            <Tooltip open={isOpen} onOpenChange={setIsOpen}>
                <TooltipTrigger asChild>
                    <div className="flex size-16 items-center justify-center rounded-full bg-white">
                        <Button variant="outline" className="size-16 rounded-full px-0" onClick={() => setIsOpen(!isOpen)}>
                            {image ? (<img
                                className="size-12 rounded-full"
                                src={image}
                                alt="profile picture"
                            />) : (
                                <div className='size-12'>{name?.charAt(0)}</div>
                            )}
                            <span className="sr-only">Sign out</span>
                        </Button>
                    </div>
                </TooltipTrigger>
                <TooltipContent
                    side="bottom"
                    className="bg-primary text-primary-foreground p-2 overflow-hidden"
                    style={{
                        animation: isOpen ? 'slideDown 0.3s ease-out' : 'none',
                    }}
                >
                    <Button
                        variant="ghost"
                        className="w-full justify-start rounded-none px-4 py-2 font-normal"
                    >
                        <Link
                            href={"/api/auth/signout"}
                        // className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                        >
                            Sign out
                        </Link>

                    </Button>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}