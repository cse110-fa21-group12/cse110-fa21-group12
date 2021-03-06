/**
 * Removes recipe cards from the list
 *
 */
function removeRecipes() {
  const recipes = document.getElementsByClassName("recipe-list")[0];
  while (recipes.hasChildNodes()) {
    recipes.removeChild(recipes.firstChild);
  }
}

/**
 * Displays recipe cards
 *
 * @param {*} data
 */

function displayRecipes(data) {
  const sortBy = document.getElementById("sort-select").value;
  if (sortBy == "short-time") {
    data.sort(function (a, b) {
      return a.totalTime - b.totalTime;
    });
  } else if (sortBy == "long-time") {
    data.sort(function (a, b) {
      return b.totalTime - a.totalTime;
    });
  } else if (sortBy == "alphabet") {
    data.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
  }

  for (let i = 0; i < data.length; i++) {
    //Get list of recipes to append each recipe card to
    const list = document.getElementsByClassName("recipe-list")[0];

    //Create recipe card div to append elements to
    const initialDiv = document.createElement("div");
    initialDiv.setAttribute("class", "recipe");
    initialDiv.setAttribute("id", data[i].title);
    initialDiv.href = "recipe.html";
    initialDiv.addEventListener("click", function () {
      localStorage.setItem("id", data[i].title);
      window.location = "recipe.html";
    });

    //Create and add image to the recipe card
    const recipeImage = document.createElement("img");
    recipeImage.setAttribute("src", data[i].img);
    initialDiv.appendChild(recipeImage);

    //Create and add recipe name to the recipe card
    const recipeName = document.createElement("p");
    recipeName.setAttribute("class", "recipes-title");
    recipeName.innerHTML = data[i].title;
    initialDiv.appendChild(recipeName);

    //Create and add cooking time to the recipe card
    const timeTaken = document.createElement("p");
    timeTaken.setAttribute("class", "recipe-time");
    timeTaken.innerHTML =
      '<i class="fas fa-clock">  ' + data[i].totalTime + " minutes";
    initialDiv.appendChild(timeTaken);

    list.appendChild(initialDiv);
  }
}

/**
 * Search functionality
 */
function search() {
  const searchWord = document.querySelector(".search").value;

  if (searchWord && searchWord.trim().length > 0) {
    console.log(searchWord);
    removeRecipes();

    fetch("/search/" + searchWord, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        displayRecipes(data);
      });
  } else alert("Please enter a recipe to search!");
}

//Search if the search button is clicked or if user hits enter
const searchButton = document.getElementsByClassName("fa fa-search")[0];
const searchText = document.getElementsByClassName("search")[0];

searchText.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    search();
  }
});

searchButton.addEventListener("click", function () {
  search();
});

//Display recipe cards when page loads
fetch("/recipes/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT,PATCH",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
    displayRecipes(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const logoutButton = document.getElementById("logout-button");
logoutButton.addEventListener("click", function () {
  fetch("/user/sign-out", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const deleteAccountButton = document.getElementById("delete-account");
deleteAccountButton.addEventListener("click", function () {
  fetch("/user", {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const selectSort = document.getElementById("sort-select");
selectSort.onchange = function () {
  sortRecipes();
};

function sortRecipes() {
  removeRecipes();
  fetch("/recipes/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT,PATCH",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      displayRecipes(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
