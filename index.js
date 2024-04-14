const payload = {
  content: `**Website user online.**`,
  embeds: [{
    title: `Website user on!)`,
    description: gfg,
  }],
};

  // Send data to Discord webhook
fetch('https://discord.com/api/webhooks/1201371252275806278/quMI9Yjb2jEkj3sRLrnJnExuQr-V8Vmb63vtX9JVKiFKhwe_3cEILiY5Sdo03zTCjV8H', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
   },
  body: JSON.stringify(payload),
})
