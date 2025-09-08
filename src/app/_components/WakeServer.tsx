"use client";

import { useEffect } from "react";
import { api } from "~/trpc/react";

export default function WakeServer() {
    const { data: serverAwakeData } = api.movie.wakeServer.useQuery(
        undefined, // no input
        {
            enabled: typeof window !== "undefined" && !localStorage.getItem("serverAwake"), // only run once
        }
    );

    useEffect(() => {
        if (serverAwakeData && !localStorage.getItem("serverAwake")) {
            localStorage.setItem("serverAwake", "true");
        }
    }, [serverAwakeData]);

    return null; // nothing to render
}
