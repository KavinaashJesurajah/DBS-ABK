// fetch = Function used for making HTTP requests to fetch resources.
//              (JSON style data, images, files)
//              Simplifies asynchronous data fetching in JavaScript and
//              used for interacting with APIs to retrieve and send
//              data asynchronously over the web.
//              fetch(url, {options})
/*
const { response } = require("express");

fetch("http://localhost:8800/api/auth/loginUser")
    .then(response => {
        if (response.ok) {
            throw new Error("Request failed!");
        }
        return response
    }
    )
    .then (data => console.log(data.id))
    .catch(error => console.log(error)) */
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from being submitted normally

    const username = document.getElementById('userName').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8800/api/auth/loginUser', {
        method: 'get',
        headers: {
            "Content-Type": "text/plain",
            'Authorization': 'Basic ' + btoa(username + ":" + password),
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Login failed!");
        }
        return response.json();
    })
    .then(data => {
        console.log('Login successful');
        console.log(data.id);
    })
    .catch(error => {
        console.log('Error:', error);
    });
});