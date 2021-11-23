const addIngredientButton = document.getElementById("add-shopping-button");
const ingredientForm = document.getElementById("shopping-form");

addIngredientButton.addEventListener("click", function() {
    const newIngredient = document.getElementById("ingredient");
    const newIngredientAmount = document.getElementById("ingredient-quantity");
    newIngredient.setAttribute("id", "ingredient");
    newIngredientAmount.setAttribute("id", "ingredient-quantity");
    const box = document.createElement("input");
    box.setAttribute("type", "checkbox");
    const shoppingIngredient = document.createElement("label");
    shoppingIngredient.innerText = newIngredientAmount.value + " " + newIngredient.value;
    ingredientForm.appendChild(box);
    ingredientForm.appendChild(shoppingIngredient);
    ingredientForm.append(document.createElement("br"));
});

//addIngredientButton.click();