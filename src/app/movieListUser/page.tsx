import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Suspense } from "react";
import MovieList from "../_components/MovieList";

export default async function MovieListUser() {
    void api.movieVote.get_votes_user.prefetch();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white pb-1">
            <div className="container flex flex-col items-center justify-center gap-9 px-4 py-4">
                <div className="flex flex-col items-stretch justify-center top-15 pt-7">
                    <Suspense fallback={<img src="/rings.svg" className="w-[300px] h-[450px]" />}>
                        <MovieList />
                    </Suspense>
                </div>
            </div>
        </main>

    );
}
