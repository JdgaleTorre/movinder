"use client"
import { api } from "~/trpc/react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import VoteCircle from "./VoteCircle";
import { useState } from "react";

export default function HybridRecommendations() {
    // const [recommendedMovies] = api.movie.getHybridRecommendations.useSuspenseQuery(12, { retry: 2, staleTime: 1000 * 60 });
    const [enabled, setEnabled] = useState(false);
    // Hook stays at top level but is conditionally enabled
    const { data, isLoading } = api.movie.trainModel.useQuery(undefined, {
        enabled, // only runs when enabled === true
    });
    const router = useRouter();

    const handleTrainModel = () => {
        setEnabled(true);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 hover:cursor-pointer max-w-6xl mx-auto ">
            <button
                className="col-span-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={handleTrainModel}
            >
                Train Model
            </button>
        </div>
    );
}


// {recommendedMovies?.map(movie => (
//                 <div
//                     key={movie.id}
//                     className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md  hover:shadow-lg transition duration-300 transform hover:scale-105"
//                     onClick={() => {
//                         // Handle movie click
//                         router.push(`/movie/${movie.movieId}`)
//                     }}
//                 >
//                     {/* Poster */}
//                     <Image
//                         unoptimized
//                         src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/fallback.jpg"}
//                         alt={movie.title}
//                         className="object-cover rounded-t-xl w-full"
//                         width={300}
//                         height={500}
//                     />

//                     {/* Content */}
//                     <div className=" p-4 flex flex-col space-y-2">
//                         <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
//                             {movie.title}
//                         </h3>
//                         {/* Circular Vote Average Badge */}
//                         <div className="absolute top-3 left-3">
//                             <VoteCircle vote={movie.vote_average} />
//                         </div>
//                     </div>
//                 </div>
//             ))}