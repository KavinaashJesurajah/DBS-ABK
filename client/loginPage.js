document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from being submitted normally

    // const userName = document.getElementById("userName").value;
    // const password = document.getElementById("password").value;

    // I just update it
    const postData = {
      userName: document.getElementById("userName").value,
      password: document.getElementById("password").value,
    };
    console.log(postData);
    fetch("http://localhost:8800/api/auth/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log("Response from API:", data);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
      });
  });
