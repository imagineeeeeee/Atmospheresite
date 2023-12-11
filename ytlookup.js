function getSubscriberCount() {
    const username = document.getElementById('username').value;
    const url = 'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=UC' + username + '&key=[AIzaSyCUV6XDxzgfeplRMPOgiKZV3v9Aa4KemJQ]';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const channel = data.items[0];

            document.getElementById('profile-picture').src = channel.snippet.thumbnails.default.url;
            document.getElementById('channel-name').textContent = channel.snippet.title;
            document.getElementById('subscriber-count').textContent = channel.statistics.subscriberCount + ' subscribers';
        });
}
