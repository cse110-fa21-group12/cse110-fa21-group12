//Remove recipe cards
function removeRecipes() {
  const recipes = document.getElementsByClassName("recipe-list")[0];
  while (recipes.hasChildNodes()) {
    recipes.removeChild(recipes.firstChild);
  }
}

//Display recipe cards
function displayRecipes(data) {
  for (let i = 0; i < data.length; i++) {
    //Get list of recipes to append each recipe card to
    const list = document.getElementsByClassName("recipe-list")[0];

    //Create recipe card div to append elements to
    const initialDiv = document.createElement("div");
    initialDiv.setAttribute("class", "recipe");
    initialDiv.setAttribute("id", data[i].title);
    initialDiv.href = "recipe.html";
    initialDiv.addEventListener("click", function (event) {
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
    timeTaken.innerHTML = '<i class="fas fa-clock">  ' + data[i].totalTime;
    initialDiv.appendChild(timeTaken);

    //Create and add rating to the recipe card
    const recipeRating = document.createElement("p");
    recipeRating.setAttribute("class", "recipe-time");
    recipeRating.innerHTML = "5"; //change to totalTime
    initialDiv.appendChild(recipeRating);

    list.appendChild(initialDiv);
  }
}

//Search functionality
function search() {
  const searchWord = document.getElementsByClassName("search")[0].value;
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
