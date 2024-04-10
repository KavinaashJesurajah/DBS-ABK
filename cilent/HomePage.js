// Mock data
const user = {
    name: 'Test User',
    id: '123',
    university_id: '456'
};

// Use the mock data directly
document.getElementById('welcomeMessage').textContent = 'Welcome ' + user.name + '!';
document.getElementById('name').textContent = 'Name: ' + user.name;
document.getElementById('id').textContent = 'ID: ' + user.id;
document.getElementById('university_id').textContent = 'University ID: ' + user.university_id;

/*
// Replace with your actual fetch request
fetch('http://localhost:8800/api/info', {
    method: 'POST',
    headers: {
        "Content-Type": "text/plain",
        'Authorization': 'Basic ' + btoa(username + ":" + password),
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error("Failed to fetch user information");
    }
    return response.json();
})
.then(data => {
    document.getElementById('welcomeMessage').textContent = 'Welcome ' + data.name + '!';
    document.getElementById('name').textContent = 'Name: ' + data.name;
    document.getElementById('id').textContent = 'ID: ' + data.id;
    document.getElementById('university_id').textContent = 'University ID: ' + data.university_id;
})
.catch(error => {
    console.log('Error:', error);
}); */