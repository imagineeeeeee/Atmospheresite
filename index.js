const payload = {
  content: `**Website user online.**`,
  embeds: [{
    title: `Website user on!)`,
  }],
};

  // Send data to Discord webhook
fetch('https://discord.com/api/webhooks/1226025923233583195/QHUF8dx6nnbeJlwEWlCfkQj1pTmO_lKomx5-gqKJNNkw1i_OK3xOk7zu22L8XLrRh1gS', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
   },
  body: JSON.stringify(payload),
})
