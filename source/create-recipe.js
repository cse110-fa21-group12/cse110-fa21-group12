//const { json } = require("stream/consumers");

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

const addIngredientButton = document.getElementById("add-ingredient-button");
const ingredientForm = document.getElementById("ingredients-form");

addIngredientButton.addEventListener("click", function () {
  const newIngredient = document.createElement("input");
  const newIngredientAmount = document.createElement("input");
  newIngredient.placeholder = "Ingredient Name";
  newIngredient.setAttribute("class", "ingredient");
  newIngredientAmount.setAttribute("class", "quantity");
  newIngredientAmount.placeholder = "Amount";
  ingredientForm.appendChild(newIngredientAmount);
  ingredientForm.appendChild(newIngredient);
  //ingredientForm.appendChild(document.createElement("br"));
});

addIngredientButton.click();

const addDirectionsButton = document.getElementById("add-directions-button");
const directionsForm = document.getElementById("enter-directions");
var i = 1;

addDirectionsButton.addEventListener("click", function () {
  const newDirection = document.createElement("input");
  newDirection.placeholder = "Step " + i;
  i++;
  newDirection.setAttribute("class", "directions");
  directionsForm.appendChild(document.createElement("br"));
  directionsForm.appendChild(newDirection);
  directionsForm.appendChild(document.createElement("br"));
});

addDirectionsButton.click();

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

  const categoriesArray = [];
  for (let i = 0; i < categories.length; i++) {
    categoriesArray[i] = categories[i].value;
  }

  const tagsArray = [];
  for (let i = 0; i < tags.length; i++) {
    tagsArray[i] = tags[i].value;
  }

  const ingredientsArray = {};
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

  fetch("/recipes/create", {
    method: "PUT",
    body: formDataRecipe,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if (data.error) {
        if (
          data.error.includes("Function DocumentReference.set() called with")
        ) {
          alert("Please fill in all elements");
        }
      } else {
        localStorage.setItem("id", title);
        setTimeout(1000);
        window.location = "recipe.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
