const email = document.getElementById('email-input').value;
const password = document.getElementById('password-input').value;
const loginButton = document.getElementsByClassName('login-button')[0];

const jsonUserData = {
    email: email,
    password: password,
};

loginButton.addEventListener('click', function() {
    fetch("/user/sign-up", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonUserData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if(data.error == "Invalid email") {
        location.reload();
      }
      else {
        location.href = "home.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});