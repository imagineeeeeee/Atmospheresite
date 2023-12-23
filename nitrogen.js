fetch('https://api.discord.gx.games/v1/direct-fulfillment', {
  method: 'POST',
  headers: {
      'Accept': '/',
      'Content-Type': 'application/json',
      'Authorization': 'api.discord.gx.games',
    },
    body: JSON.stringify({
      partnerUserId: '81748a80f215bf2bd734a9b95c8a6bd507ba7af97dcb5a4bed742c02f94ab3d0'
    })
  }
).then(r=>console.log(r))
