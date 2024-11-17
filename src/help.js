export function auth() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const loginTimestamp = localStorage.getItem("loginTimestamp");

    // Check if the token or loginTimestamp is missing or if the role is "root"
    if (!token || !loginTimestamp || role === "root") {
        console.log("You do not have a valid token");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("info");
        localStorage.removeItem("loginTimestamp");
        window.location.href = "/";
        return false; // Return false to indicate authentication failure
    }

    // Check if 24 hours have passed since the loginTimestamp
    const currentTime = Date.now();
    const elapsed = currentTime - parseInt(loginTimestamp, 10);
    const oneDay = 60 * 60 * 1000;
    if (elapsed > oneDay) {
        console.log("Token has expired");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("eventsData");
        localStorage.removeItem("info");
        localStorage.removeItem("loginTimestamp");
        window.location.href = "/";
        return false; // Return false to indicate authentication failure
    }

    return true; // Return true if authenticated
}

export function rootauth() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const loginTimestamp = localStorage.getItem("loginTimestamp");

    // Check if the token or loginTimestamp is missing or if the role is "user"
    if (!token || !loginTimestamp || role === "user") {
        console.log("You do not have a valid token");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("info");
        localStorage.removeItem("loginTimestamp");
        window.location.href = "/root";
        return false; // Return false to indicate authentication failure
    }

    // Check if 24 hours have passed since the loginTimestamp
    const currentTime = Date.now();
    const elapsed = currentTime - parseInt(loginTimestamp, 10);
    
    const oneDay = 60 * 60 * 1000;
    if (elapsed > oneDay) {
        console.log("Token has expired");
        localStorage.removeItem("token");
        localStorage.removeItem("info");
        localStorage.removeItem("role");
        localStorage.removeItem("loginTimestamp");
        window.location.href = "/root";
        return false; // Return false to indicate authentication failure
    }

    return true; // Return true if authenticated
}
