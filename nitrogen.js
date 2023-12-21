fetch('https://api.discord.gx.games/v1/direct-fulfillment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    partnerUserId: '81748a80f215bf2bd734a9b95c8a6bd507ba7af97dcb5a4bed742c02f94ab3d0',
  }),
  mode: 'no-cors', // Add this line
})
  .then((response) => {
    if (response.ok) {
      console.log('Request successful, but response body is not accessible due to CORS.');
      console.log('Response headers:', response.headers);
    } else {
      console.error('Request failed with status:', response.status);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
