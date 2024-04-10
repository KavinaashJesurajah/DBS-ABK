window.onload = function() {
    const eventData = JSON.parse(localStorage.getItem('eventData'));
    const eventsTable = document.getElementById('eventsTable');

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
}