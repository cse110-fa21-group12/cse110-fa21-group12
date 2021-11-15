const addIngredientbutton = document.getElementById("add-ingredient-button");
const ingredientForm = document.getElementById("ingredients-form");

addIngredientbutton.addEventListener("click", function() {
    const newIngredient = document.createElement("input");
    const newIngredientAmount = document.createElement("input");
    newIngredient.placeholder = "Ingredient Name";
    newIngredient.setAttribute("id", "ingredient");
    newIngredientAmount.setAttribute("id", "quantity");
    newIngredientAmount.placeholder = "Amount";
    ingredientForm.appendChild(newIngredientAmount);
    ingredientForm.appendChild(newIngredient);
    ingredientForm.appendChild(document.createElement("br"));
});

const addDirectionsButton = document.getElementById("add-directions-button");
const directionsForm = document.getElementById("enter-directions");
var i = 2; 

addDirectionsButton.addEventListener("click", function() {
    const newDirection = document.createElement("input");
    newDirection.placeholder = "Step" + i;
    i++;
    newDirection.setAttribute("id", "directions");
    directionsForm.appendChild(document.createElement("br"));
    directionsForm.appendChild(newDirection);
    directionsForm.appendChild(document.createElement("br"));
});
