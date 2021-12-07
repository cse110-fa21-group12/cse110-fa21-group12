//Get the original recipe
const id = localStorage.getItem("id");
fetch("/recipes/" + id, {
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
    const title = document.getElementById("title");
    title.defaultValue = data.title;

    const description = document.getElementById("description");
    description.defaultValue = data.description;

    const categories = document.getElementById("categories");
    categories.defaultValue = data.categories;

    const tags = document.getElementById("tags");
    tags.defaultValue = data.tags;

    const prepTime = document.getElementById("prep-time");
    prepTime.defaultValue = data.preparationTime;

    const cookTime = document.getElementById("cook-time");
    cookTime.defaultValue = data.cookingTime;

    const totalTime = document.getElementById("total-time");
    totalTime.defaultValue = data.totalTime;

    const ingredientsForm = document.getElementById("ingredients-form");
    for (let i = 0; i < data.ingredients.length; i++) {
      const newIngredient = document.createElement("input");
      const newIngredientAmount = document.createElement("input");
      newIngredient.defaultValue = data.ingredients[i];
      newIngredient.setAttribute("class", "ingredient");
      newIngredientAmount.setAttribute("id", "quantity");
      newIngredientAmount.placeholder = "Amount";
      ingredientsForm.appendChild(newIngredientAmount);
      ingredientsForm.appendChild(newIngredient);
      ingredientsForm.appendChild(document.createElement("br"));
    }

    const directionsForm = document.getElementById("enter-directions");
    for (let i = 0; i < data.directions.length; i++) {
      const newDirection = document.createElement("input");
      newDirection.defaultValue = data.directions[i];
      newDirection.setAttribute("class", "directions");
      directionsForm.appendChild(document.createElement("br"));
      directionsForm.appendChild(newDirection);
      directionsForm.appendChild(document.createElement("br"));
    }
  });

//Ingredients Button
const addIngredientButton = document.getElementById("add-ingredient-button");
const ingredientsForm = document.getElementById("ingredients-form");

addIngredientButton.addEventListener("click", function () {
  const newIngredient = document.createElement("input");
  const newIngredientAmount = document.createElement("input");
  newIngredient.placeholder = "Ingredient Name";
  newIngredient.setAttribute("class", "ingredient");
  newIngredientAmount.setAttribute("id", "quantity");
  newIngredientAmount.placeholder = "Amount";
  ingredientsForm.appendChild(newIngredientAmount);
  ingredientsForm.appendChild(newIngredient);
  ingredientsForm.appendChild(document.createElement("br"));
});

//Directions Button
const addDirectionsButton = document.getElementById("add-directions-button");
const directionsForm = document.getElementById("enter-directions");
let j = 0;
addDirectionsButton.addEventListener("click", function () {
  const newDirection = document.createElement("input");
  newDirection.placeholder = "New Step";
  j++;
  newDirection.setAttribute("class", "directions");
  directionsForm.appendChild(document.createElement("br"));
  directionsForm.appendChild(newDirection);
  directionsForm.appendChild(document.createElement("br"));
});

//Save recipe
const saveRecipeButton = document.getElementById("save-recipe");

saveRecipeButton.addEventListener("click", () => {
  //Creating the JSON data to send
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const categories = document.getElementById("categories").value;
  const tags = document.getElementById("tags").value;
  const preparationTime = document.getElementById("prep-time").value;
  const cookingTime = document.getElementById("cook-time").value;
  const totalTime = document.getElementById("total-time").value;
  const ingredients = document.getElementsByClassName("ingredient");
  const ingredientsArray = [];
  for (let i = 0; i < ingredients.length; i++) {
    ingredientsArray[i] = ingredients[i].value;
  }
  const directions = document.getElementsByClassName("directions");

  const directionsArray = [];
  for (let i = 0; i < directions.length; i++) {
    directionsArray[i] = directions[i].value;
  }

  const jsonRecipe = {
    id: title,
    title: title,
    description: description,
    categories: categories,
    tags: tags,
    preparationTime: preparationTime,
    cookingTime: cookingTime,
    totalTime: totalTime,
    ingredients: ingredientsArray,
    directions: directionsArray,
  };

  const stringJson = JSON.stringify(jsonRecipe);

  const image = document.getElementById("file-ip-1");

  const formDataRecipe = new FormData();
  formDataRecipe.append("json", stringJson);
  formDataRecipe.append("img", image.value);

  fetch("/recipes/edit", {
    method: "PUT",
    body: formDataRecipe,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  setTimeout(1000);
  location.href = "recipe-list.html";
});
