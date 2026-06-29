export function formatDate(
    date: string | Date,
    locale = "en-US"
): string {
    return new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
    }).format(new Date(date));
}

export function formatDateTime(
    date: string | Date,
    locale = "en-US"
): string {
    return new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(date));
}

export function formatTime(
    date: string | Date,
    locale = "en-US"
): string {
    return new Intl.DateTimeFormat(locale, {
        timeStyle: "short",
    }).format(new Date(date));
}

export function formatRelative(date: string | Date): string {
    const now = Date.now();
    const value = new Date(date).getTime();

    const seconds = Math.floor((now - value) / 1000);

    if (seconds < 60)
        return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60)
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24)
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);

    return `${days} day${days !== 1 ? "s" : ""} ago`;
}
