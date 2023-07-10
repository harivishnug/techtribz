window.onload = (function () {
    var domainUrl = window.location.host;
    var widgetId =false;
// Find the script element with the data-widgetId attribute
    var scriptElements = document.querySelectorAll('script[widgetId]');
    var scriptElement = null;

    for (var i = 0; i < scriptElements.length; i++) {
        widgetId = scriptElements[i].getAttribute('widgetId');
        if (widgetId) {
            scriptElement = scriptElements[i];
            break;
        }
    }

    if (!scriptElement) {
        console.error("Script element with data-widgetId attribute not found.");
    } else {
        // Get the widgetId value from the data-widgetId attribute
        widgetId = scriptElement.getAttribute('widgetId')
        var src = 'https://chat4site.ai/' + widgetId + '/';

// Create the chatButton
        var chatButton = document.createElement('div');
        chatButton.id = 'chatButton';
        document.body.appendChild(chatButton);

// Style the chatButton
        chatButton.style.position = 'fixed';
        chatButton.style.display = 'block';
        chatButton.style.bottom = '20px';
        chatButton.style.right = '20px';
        chatButton.style.width = '50px';
        chatButton.style.height = '50px';
        chatButton.style.borderRadius = '50%';
        chatButton.style.backgroundColor = '#007bff';
        chatButton.style.color = '#fff';
        chatButton.style.textAlign = 'center';
        chatButton.style.lineHeight = '50px';
        chatButton.style.fontSize = '20px';
        chatButton.style.cursor = 'pointer';
        chatButton.style.zIndex = '2147483000';
        chatButton.style.backgroundImage = 'url("https://chat4site.ai/icons/botIcon.png")';
        chatButton.style.backgroundSize = 'cover';


// Create the iframe block
        var chatContainer = document.createElement('div');
        chatContainer.id = 'chatContainer';
        document.body.appendChild(chatContainer);

// Style the chatContainer
        chatContainer.style.position = 'fixed';
        chatContainer.style.bottom = '80px';
        chatContainer.style.right = '10px'; // Adjusted to make room for iframe
        chatContainer.style.width = '400px'; // Adjusted width
        chatContainer.style.height = '573px';
        chatContainer.style.backgroundColor = 'transparent';
        chatContainer.style.zIndex = '2147483000';
        chatContainer.style.display = 'none';

// Create the iframe
        var chatIframe = document.createElement('iframe');
        chatIframe.id = 'chatIframe';
        chatIframe.src = src;
        chatContainer.appendChild(chatIframe);

// Style the chatIframe
        chatIframe.style.width = '400px';
        chatIframe.style.height = '100%';
        chatIframe.style.border = 'none';

// Add click event listener to the chatButton

        chatButton.addEventListener('click', function () {

            if (chatContainer.style.display === 'block') {
                chatContainer.style.display = 'none';
                sendEventToEndpoint(widgetId,'hideChat');
            } else {
                chatContainer.style.display = 'block';
                sendEventToEndpoint(widgetId,'showChat');
            }
        });


        function sendEventToEndpoint(widgetId, event) {
            const url = 'https://appsgeyser.com/api/ai/report/';

            // Create an object with the data to send
            const data = {
                widgetId: widgetId,
                event: event
            };

            // Send the POST request
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                })
                .catch(error => {
                    // Handle any errors that occurred during the request
                    console.error('Error sending event:', error);
                });
        }


        function sendIntegrationInfo(widgetId) {
            const url = 'https://appsgeyser.com/api/ai/integration/';

            // Create an object with the data to send
            const data = {
                widgetId: widgetId,
                domain: domainUrl
            };

            // Send the POST request
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                })
                .catch(error => {
                    // Handle any errors that occurred during the request
                    console.error('Error sending event:', error);
                });
        }

        sendIntegrationInfo(widgetId);


    }
})
