//const { json } = require("stream/consumers");

const addIngredientButton = document.getElementById("add-ingredient-button");
const ingredientForm = document.getElementById("ingredients-form");

addIngredientButton.addEventListener("click", function() {
    const newIngredient = document.createElement("input");
    const newIngredientAmount = document.createElement("input");
    newIngredient.placeholder = "Ingredient Name";
    newIngredient.setAttribute("class", "ingredient");
    newIngredientAmount.setAttribute("id", "quantity");
    newIngredientAmount.placeholder = "Amount";
    ingredientForm.appendChild(newIngredientAmount);
    ingredientForm.appendChild(newIngredient);
    ingredientForm.appendChild(document.createElement("br"));
})
.catch((error) => {
    console.error('Error:', error);
});

addIngredientButton.click();

const addDirectionsButton = document.getElementById("add-directions-button");
const directionsForm = document.getElementById("enter-directions");
var i = 1; 

addDirectionsButton.addEventListener("click", function() {
    const newDirection = document.createElement("input");
    newDirection.placeholder = "Step " + i;
    i++;
    newDirection.setAttribute("class", "directions");
    directionsForm.appendChild(document.createElement("br"));
    directionsForm.appendChild(newDirection);
    directionsForm.appendChild(document.createElement("br"));
});

addDirectionsButton.click();

const saveRecipeButton = document.getElementById('save-recipe');


saveRecipeButton.addEventListener('click', () => {
    //Creating the JSON data to send
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const categories = document.getElementById('categories').value;
    const tags = document.getElementById('tags').value;
    const preparationTime = document.getElementById('prep-time').value;
    const cookingTime = document.getElementById('cook-time').value;
    const totalTime = document.getElementById('total-time').value;
    const ingredients = document.getElementsByClassName('ingredient');
    const directions = document.getElementsByClassName('directions');


    const jsonRecipe = {
        "id": title,
        "title": title,
        "description": description,
        "categories": categories,
        "tags": tags,
        "preparationTime": preparationTime,
        "cookingTime": cookingTime,
        "ingredients": ingredients,
        "directions": directions,
    }
    fetch('/recipes/create', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,PATCH',
        },
        body: JSON.stringify(jsonRecipe),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    location.href="recipe-list.html"
});














