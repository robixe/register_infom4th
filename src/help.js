export function auth() {
    const token = localStorage.getItem("Token");
    const role = localStorage.getItem("role");
    const timestamp = localStorage.getItem("loginTimestamp");
    const now = Date.now();

    // Check if the token is expired (older than 24 hours)
    if (!token || role === null || (timestamp && (now - timestamp >= 24 * 60 * 60 * 1000))) {
        console.log("You do not have a valid token");
        localStorage.removeItem("Token");
        localStorage.removeItem("role");
        localStorage.removeItem("loginTimestamp");
        return false; // Return false to indicate authentication failure
    }
    return true; // Return true if authenticated
}

export function rootauth() {
    const token = localStorage.getItem("Token");
    const role = localStorage.getItem("role");
    const timestamp = localStorage.getItem("loginTimestamp");
    const now = Date.now();

    // Check if the token is expired (older than 24 hours)
    if (!token || role === "user" || (timestamp && (now - timestamp >= 24 * 60 * 60 * 1000))) {
        console.log("You do not have a valid token");
        localStorage.removeItem("Token");
        localStorage.removeItem("role");
        localStorage.removeItem("loginTimestamp");
        return false; // Return false to indicate authentication failure
    }
    return true; // Return true if authenticated
}
