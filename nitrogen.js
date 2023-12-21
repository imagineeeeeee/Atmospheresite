const button = document.getElementById('send-request-button');
const responseContainer = document.getElementById('response-container');

button.addEventListener('click', async () => {
  try {
    const response = await fetch('https://api.discord.gx.games/v1/direct-fulfillment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        partnerUserId: '81748a80f215bf2bd734a9b95c8a6bd507ba7af97dcb5a4bed742c02f94ab3d0',
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    responseContainer.textContent = JSON.stringify(data, null, 2); // Display response in a formatted way
  } catch (error) {
    responseContainer.textContent = `Error: ${error.message}`;
  }
});
