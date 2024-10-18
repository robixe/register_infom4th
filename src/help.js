export  function auth() {
    const token = localStorage.getItem("Token");
    const role = localStorage.getItem("role");
    if (!token || role === null) {
        console.log("You do not have a token");
        window.location.href = "/";
    }
}

export  function rootauth() {
    const token = localStorage.getItem("Token");
    const role = localStorage.getItem("role");
    if (!token || role === null && role != "root") {
        console.log("You do not have a token");
        window.location.href = "/root";
    }
}
