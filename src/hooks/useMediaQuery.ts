import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
    const getMatches = () =>
        window.matchMedia(query).matches;

    const [matches, setMatches] =
        useState<boolean>(getMatches);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        const handler = (
            event: MediaQueryListEvent
        ) => {
            setMatches(event.matches);
        };

        setMatches(mediaQuery.matches);

        mediaQuery.addEventListener("change", handler);

        return () =>
            mediaQuery.removeEventListener(
                "change",
                handler
            );
    }, [query]);

    return matches;
}