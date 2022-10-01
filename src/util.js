
// Returns time formatted as HH:MM:SS from UNIX timestamp
export const timeFromTimestamp = (timestamp) => {
    return (new Date(timestamp)).toLocaleTimeString();
}

export const formatSeconds = (seconds) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = seconds / 60
    if (minutes < 60) return `${Math.floor(minutes)}m`
    const hours = minutes / 60
    return `${Math.floor(hours)}h`
}

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);