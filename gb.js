function updateServerCount() {
    fetch("/get_server_count")
        .then(response => response.json())
        .then(data => {
            const serverCountElement = document.getElementById("server-count");
            serverCountElement.textContent = data.server_count;
        });
}

// Call the function every few minutes to update the count
setInterval(updateServerCount, 18000); // Update every 3 minutes
