"use client"
import { api } from "~/trpc/react";
import Image from "next/image";
import { type Decimal } from "@prisma/client/runtime/library";

import { useRouter } from "next/navigation";

export default function PopularMovies() {
    const [popularMovies] = api.movie.getPopularMovies.useSuspenseQuery();
    const router = useRouter();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 hover:cursor-pointer max-w-6xl mx-auto ">
            {popularMovies?.map(movie => (
                <div
                    key={movie.id}
                    className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md  hover:shadow-lg transition duration-300 transform hover:scale-105"
                    onClick={() => {
                        // Handle movie click
                        router.push(`/movie/${movie.id}`)
                    }}
                >
                    {/* Poster */}
                    <Image
                        unoptimized
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/fallback.jpg"}
                        alt={movie.title}
                        className="object-cover rounded-t-xl mx-auto"
                        width={300}
                        height={500}
                    />

                    {/* Content */}
                    <div className=" p-4 flex flex-col space-y-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                            {movie.title}
                        </h3>
                        {/* Circular Vote Average Badge */}
                        <div className="absolute top-3 left-3">
                            <VoteCircle vote={movie.vote_average} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function VoteCircle({ vote }: { vote: Decimal }) {
    const radius = 28;
    const stroke = 3;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const percent = Math.round(Number(vote) * 10); // TMDB ratings are out of 10 → percent out of 100
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
        <svg
            height={radius * 2}
            width={radius * 2}
            className="bg-gray-800 rounded-full"
        >
            {/* Background circle */}
            <circle
                stroke="gray"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            {/* Progress circle */}
            <circle
                stroke={percent >= 70 ? "limegreen" : percent >= 40 ? "gold" : "red"}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + " " + circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            {/* Text in center */}
            <text
                x="50%"
                y="50%"
                dy=".3em"
                textAnchor="middle"
                fontSize="10"
                fill="white"
            >
                {percent}%
            </text>
        </svg>
    );
}