export function auth() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Check if the token is expired (older than 24 hours)
    if (!token || role != "user") {
        console.log("You do not have a valid token");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("loginTimestamp");
        return false; // Return false to indicate authentication failure
    }
    return true; // Return true if authenticated
}

export function rootauth() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Check if the token is expired (older than 24 hours)
    if ((!token || role === "user")) {
        console.log("You do not have a valid token");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("loginTimestamp");
        window.location.href = "/"
        return false; // Return false to indicate authentication failure
    }
    return true; // Return true if authenticated
}
