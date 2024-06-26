window.onload = function() {
    fetch('http://localhost:8800/api/Event')
        .then(response => response.json())
        .then(eventData => {
            const eventsTable = document.getElementById('eventsTable');

            eventData.forEach(event => {
    const row = eventsTable.insertRow(-1);
    row.insertCell(-1).textContent = eventData.name;
    row.insertCell(-1).textContent = eventData.description;
    row.insertCell(-1).textContent = eventData.time;
    row.insertCell(-1).textContent = eventData.date;
    row.insertCell(-1).textContent = eventData.location;
    row.insertCell(-1).textContent = eventData.contactPhone;
    row.insertCell(-1).textContent = eventData.contactEmail;
    row.insertCell(-1).textContent = eventData.visibility;
    row.insertCell(-1).textContent = eventData.eventID;
    row.insertCell(-1).textContent = eventData.eventCategoryID;
    row.insertCell(-1).textContent = eventData.RSOID;
    
    const commentButton = document.createElement('button');
                commentButton.textContent = 'Comment';
                commentButton.addEventListener('click', function() {
                    const comment = prompt('Enter your comment:');
                    const commentDisplay = document.createElement('div');
                    commentDisplay.textContent = comment;
                    row.appendChild(commentDisplay);
                });
                row.appendChild(commentButton);
            });
        })
        .catch(error => console.error('Error:', error));
}