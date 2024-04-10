document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const eventData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        time: document.getElementById('time').value,
        date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        contactPhone: document.getElementById('contactPhone').value,
        contactEmail: document.getElementById('contactEmail').value,
        visibility: document.getElementById('visibility').value,
        eventID: generateUniqueID(),
        eventCategoryID: generateUniqueID(),
        RSOID: generateUniqueID()
    };
    localStorage.setItem('eventData', JSON.stringify(eventData));
    window.location.href = 'HomePage.html';
});

function generateUniqueID() {
    return Math.random().toString(36).substr(2, 9);
}