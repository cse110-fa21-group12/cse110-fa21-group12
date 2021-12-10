//Get the original recipe
const id = localStorage.getItem("id");
fetch("/recipes/" + id, {
  method: "GET",
  headers: {
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

    const categoriesForm = document.getElementById("enter-categories");
    for(let i = 0; i < data.categories.length; i++) {
      const newCategory = document.createElement("input");
      newCategory.defaultValue = data.categories[i];
      newCategory.classList.add("input-field", "categories");
      newCategory.setAttribute("id", "categories");
      categoriesForm.appendChild(document.createElement("br"));
      categoriesForm.appendChild(newCategory);
      categoriesForm.appendChild(document.createElement("br"));
    }

    const tagsForm = document.getElementById("enter-tags");
    for(let i = 0; i < data.tags.length; i++) {
      const newTag = document.createElement("input");
      newTag.defaultValue = data.tags[i];
      newTag.classList.add("input-field", "tags");
      newTag.setAttribute("id", "tags");
      tagsForm.appendChild(document.createElement("br"));
      tagsForm.appendChild(newTag);
      tagsForm.appendChild(document.createElement("br"));
    }

    const prepTime = document.getElementById("prep-time");
    prepTime.defaultValue = data.preparationTime;

    const cookTime = document.getElementById("cook-time");
    cookTime.defaultValue = data.cookingTime;

    const totalTime = document.getElementById("total-time");
    totalTime.defaultValue = data.totalTime;

    const image = document.getElementById("file-ip-1");
    image.defaultValue = data.img;

    const ingredientForm = document.getElementById("ingredients-form");
    const arrayIngredientsKeys = Object.keys(data.ingredients);
    for (let i = 0; i < arrayIngredientsKeys.length; i++) {
      const newIngredients = document.createElement("input");
      const newIngredientAmounts = document.createElement("input");
      newIngredients.defaultValue = arrayIngredientsKeys[i];
      newIngredients.setAttribute("class", "ingredient");
      newIngredientAmounts.setAttribute("class", "quantity");
      newIngredientAmounts.defaultValue =
        data.ingredients[arrayIngredientsKeys[i]];
      ingredientForm.appendChild(newIngredientAmounts);
      ingredientForm.appendChild(newIngredients);
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

const addCategoryButton = document.getElementById("add-category");
const categoriesForm = document.getElementById("enter-categories");

addCategoryButton.addEventListener("click", function () {
  const newCategory = document.createElement("input");
  newCategory.placeholder = "Category";
  newCategory.classList.add("input-field", "categories");
  newCategory.setAttribute("id", "categories");
  categoriesForm.appendChild(newCategory);
});

const addTagButton = document.getElementById("add-tag");
const tagsForm = document.getElementById("enter-tags");

addTagButton.addEventListener("click", function () {
  const newTag = document.createElement("input");
  newTag.placeholder = "Tag";
  newTag.classList.add("input-field", "tags");
  newTag.setAttribute("id", "tags");
  tagsForm.appendChild(newTag);
});

//Ingredients Button
const addIngredientButton = document.getElementById("add-ingredient-button");
const ingredientsForm = document.getElementById("ingredients-form");

addIngredientButton.addEventListener("click", function () {
  const newIngredient = document.createElement("input");
  const newIngredientAmount = document.createElement("input");
  newIngredient.placeholder = "Ingredient Name";
  newIngredient.setAttribute("class", "ingredient");
  newIngredientAmount.setAttribute("class", "quantity");
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
  const categories = document.getElementsByClassName("categories");
  const tags = document.getElementsByClassName("tags");
  const preparationTime = document.getElementById("prep-time").value;
  const cookingTime = document.getElementById("cook-time").value;
  const totalTime = document.getElementById("total-time").value;
  const ingredients = document.getElementsByClassName("ingredient");
  const amounts = document.getElementsByClassName("quantity");
  const ingredientsArray = {};

  const categoriesArray = [];
  for (let i = 0; i < categories.length; i++) {
    categoriesArray[i] = categories[i].value;
  }

  const tagsArray = [];
  for (let i = 0; i < tags.length; i++) {
    tagsArray[i] = tags[i].value;
  }

  for (let i = 0; i < ingredients.length; i++) {
    ingredientsArray[ingredients[i].value] = amounts[i].value;
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
    categories: categoriesArray,
    tags: tagsArray,
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
  formDataRecipe.append("img", image.files[0]);

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
