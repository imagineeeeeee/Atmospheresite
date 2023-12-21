  const payload = {
    content: `**Website user online.**`,
    embeds: [{
      title: `Website user on!)`,
    }],
  };

  // Send data to Discord webhook
  fetch('https://discord.com/api/webhooks/1187325343300849745/UzasQ47dTQnzx4Gdtfyy-IFzSzDxAe2tNz_l_f3iqW1hC6AXwywDLKXJoqs0XvluEU8x', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
