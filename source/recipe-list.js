/**
 * Displays recipe cards created by the logged in user
 * @param {json} data
 * @return {void} Nothing
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
    if (data[i].creator == user) {
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
}

//Get email of user currently logged in and assign it to variable user
let user;
fetch("/user", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
    user = data.email;
  });

/**
 * Removes recipe cards from page
 * @return {void} Nothing
 */
function removeRecipes() {
  const recipes = document.getElementsByClassName("recipe-list")[0];
  while (recipes.hasChildNodes()) {
    recipes.removeChild(recipes.firstChild);
  }
}

/**
 * Retrieves recipes from database based on user's search and displays them
 * @return {void} Nothing
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

const searchButton = document.getElementsByClassName("fa fa-search")[0];
const searchText = document.getElementsByClassName("search")[0];

/**
 * Listen for keypress on 'Enter' on searchText and calls search function
 *
 * @type {text}
 * @listens document#keypress
 */
searchText.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    search();
  }
});


/**
 * Listen for click on searchButton and calls search function
 *
 * @type {button}
 * @listens document#click
 */
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

const selectSort = document.getElementById("sort-select");
selectSort.onchange = function () {
  sortRecipes();
};

/**
 * Sorts recipes by retrieving recipes from database
 * @return {void} Nothing
 */
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
