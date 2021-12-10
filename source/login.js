const email = document.getElementById("email-input").value;
const password = document.getElementById("password-input").value;
const loginButton = document.getElementsByClassName("login-button")[0];

const jsonUserData = {
  email: email,
  password: password,
};

/**
 * Listen for click on login button to sign in
 *
 * @type {button}
 * @listens document#click
 */
loginButton.addEventListener("click", function () {
  fetch("/user/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonUserData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if (data.error == "Invalid email") {
        alert("Invalid email");
        if (data.error == "Invalid password") {
          alert("Invalid password");
        }
      } else {
        location.href = "home.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
