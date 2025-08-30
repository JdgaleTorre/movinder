import SingleMoviePage from "~/app/_components/SingleMovie";
import { Suspense } from "react";
import Image from "next/image";
import { api } from "~/trpc/server";

export default async function MoviePage({ params }: { params: { id: string } }) {

    void api.movie.getMovie.prefetch(parseInt(params.id, 10));
    return <Suspense
        fallback={
            <div className="flex justify-center items-center min-h-screen">
                <Image src={`/rings.svg`} width={300} height={450} alt="Loading" />
            </div>
        }
    >
        <SingleMoviePage id={Number(params.id)} />
    </Suspense>;
}