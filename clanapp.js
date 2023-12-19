const form = document.getElementById('quiz-form');
const results = document.getElementById('results');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Access input data
  const robloxUsername = document.getElementById('roblox_username').value;
  const discordUsername = document.getElementById('discord_username').value;
  const gems = document.getElementById('gems').value;
  const reason = document.getElementById('reason').value;
  const contribution = document.getElementById('contribution').value;

  // Validate data (adjust further if needed)
  if (!robloxUsername || !discordUsername || !gems || !reason || !contribution) {
    results.textContent = 'Please fill out all fields';
    return;
  }

  // Build Discord webhook payload
  const payload = {
    content: `**Clan Application Received:**`,
    embeds: [{
      title: `R-User ${robloxUsername} (D-User @${discordUsername})`,
      description: `**Gems:** ${gems}\n**Reason for joining:** ${reason}\n**Contribution:** ${contribution}`,
    }],
  };

  // Send data to Discord webhook
  fetch('https://discord.com/api/webhooks/1186573662229368863/vYWTfLedOtIxe9YmMmlhmDwiB-4hjFMRf5q7PHP2USF5LTuwkwocqg7lsrHHDFPo6iLF', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        results.textContent = 'Application submitted! Thanks for your interest.';
      } else {
        results.textContent = 'There was an error submitting your application. Please try again later.';
      }
    })
    .catch((error) => {
      results.textContent = `Error: ${error}`;
    });

  // Reset form (optional)
  form.reset();
});
