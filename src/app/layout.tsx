import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";
import Navbar from "./_components/navBar";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Movinder APP",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>
            <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-background dark:bg-background-dark dark:text-white">
              <Navbar name={session?.user.name} image={session?.user.image} />
              <div className="">
                {children}
              </div>
            </div>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}


// {session == null ? (
//                 <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white pb-1">
//                   <div className="flex flex-col items-center gap-2">
//                     <p className="w-2/3 py-5 text-center text-xl">
//                       Please Sign In to keep a track of your preferences in movies
//                     </p>
//                     <div className="flex flex-col items-center justify-center gap-4">
//                       <Link
//                         href={session ? "/api/auth/signout" : "/api/auth/signin"}
//                         className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
//                       >
//                         {session ? "Sign out" : "Sign in"}
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ) : <>{children}</>}
