const addWebhookButton = document.getElementById('add-webhook');
const webhookDesigner = document.getElementById('webhook-designer');
const addFieldButton = document.getElementById('add-field');
const fieldsContainer = document.getElementById('fields-container');
const sendMessageButton = document.getElementById('send-message');

let webhookUrl;
let fields = [];

addWebhookButton.addEventListener('click', () => {
    webhookUrl = document.getElementById('webhook-url').value;

    if (webhookUrl) {
        webhookDesigner.classList.remove('hidden');
        document.getElementById('webhook-url').value = '';
    } else {
        alert('Please enter a valid webhook URL.');
    }
});

addFieldButton.addEventListener('click', () => {
    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('field-container');

    const fieldNameInput = document.createElement('input');
    fieldNameInput.placeholder = 'Field Name';
    fieldContainer.appendChild(fieldNameInput);

    const fieldValueInput = document.createElement('input');
    fieldValueInput.placeholder = 'Field Value';
    fieldContainer.appendChild(fieldValueInput);

    const removeFieldButton = document.createElement('button');
    removeFieldButton.textContent = 'Remove Field';
    removeFieldButton.addEventListener('click', () => {
        fieldContainer.parentNode.removeChild(fieldContainer);
    });
    fieldContainer.appendChild(removeFieldButton);

    fieldsContainer.appendChild(fieldContainer);
});

sendMessageButton.addEventListener('click', () => {
    const messageContent = document.getElementById('message-content').value;

    const embed = {
        title: document.getElementById('embed-title').value,
        color: document.getElementById('embed-color').value,
        description: document.getElementById('embed-description').value,
        footer: {
            text: document.getElementById('embed-footer').value
        },
        author: {
            name: document.getElementById('embed-author').value,
            icon_url: document.getElementById('embed-author-image').value
        },
        fields: []
    };

    for (const fieldContainer of document.querySelectorAll('.field-container')) {
        embed.fields.push({
            name: fieldContainer.querySelector('input[placeholder="Field Name"]').value,
            value: fieldContainer.querySelector('input[placeholder="Field Value"]').value
        });
    }

    const data = {
        embeds: [embed],
        content: messageContent || null
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => {
        alert('Message sent successfully!');
        fields = [];
        clearEmbedInputs();
    }).catch(error => {
        alert('Error sending message:', error);
    });
});

function clearEmbedInputs() {
    document.getElementById('embed-title').value = '';
    document.getElementById('embed-color').value = '';
    document.getElementById('embed-description').value = '';
    document.getElementById('embed-footer').value = '';
    document.getElementById('embed-author').value = '';
    document.getElementById('embed-author-image').value = '';
    document.getElementById('message-content').value = '';
}
