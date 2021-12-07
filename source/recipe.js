//Delete recipe functionality
const deleteButton = document.getElementsByClassName("crud")[3];

deleteButton.addEventListener("click", function () {
  const id = localStorage.getItem("id");
  console.log(id);
  fetch("/recipes/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT,PATCH",
    },
  })
    .then((data) => {
      console.log("Success: ", data);
      window.location = "recipe-list.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const editButton = document.getElementById("edit-button");

editButton.addEventListener("click", function () {
  window.location = "edit-recipe.html";
});

//Populates recipe page correctly
const url = localStorage.getItem("id");
console.log(url);
fetch("/recipes/" + url, {
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
    const title = document.getElementsByClassName("recipe-title")[0];
    title.innerHTML = data.title;

    const recipeImage = document.getElementsByClassName("thumbnail")[0];
    recipeImage.setAttribute("src", data.img);

    const description = document.getElementsByClassName("description")[0];
    description.innerHTML = data.description;

    const prepTime = document.getElementById("prep-time");
    prepTime.innerHTML = "Preparation Time: " + data.preparationTime;

    const cookTime = document.getElementById("cook-time");
    cookTime.innerHTML = "Cook Time: " + data.cookingTime;

    const totalTime = document.getElementById("total-time");
    totalTime.innerHTML = "Total Time: " + data.totalTime;

    const arrayIngredientsKeys = Object.keys(data.ingredients);
    const ingredientsBox = document.getElementById("ingredientsBox");
    for (let i = 0; i < arrayIngredientsKeys.length; i++) {
      const newIngredient = document.createElement("input");
      newIngredient.setAttribute("type", "checkbox");
      newIngredient.setAttribute("id", arrayIngredientsKeys[i]);
      newIngredient.setAttribute(
        "value",
        data.ingredients[arrayIngredientsKeys[i]]
      );
      newIngredient.setAttribute("name", "i");
      const newLabel = document.createElement("label");
      newLabel.setAttribute("class", "checklist");
      newLabel.setAttribute("for", "i");
      newLabel.innerHTML =
        data.ingredients[arrayIngredientsKeys[i]] +
        " " +
        arrayIngredientsKeys[i];
      const br = document.createElement("br");
      ingredientsBox.appendChild(newIngredient);
      ingredientsBox.appendChild(newLabel);
      ingredientsBox.appendChild(br);
    }

    const directions = document.getElementById("directions");
    for (let j = 1; j < data.directions.length + 1; j++) {
      const stepDiv = document.createElement("div");
      stepDiv.setAttribute("class", "step");
      const header = document.createElement("h3");
      header.innerHTML = "Step " + j;
      const icon = document.createElement("i");
      icon.setAttribute("class", "fas fa-utensils");
      header.appendChild(icon);
      const instruction = document.createElement("p");
      instruction.innerHTML = data.directions[j - 1];
      stepDiv.appendChild(header);
      stepDiv.appendChild(instruction);
      directions.appendChild(stepDiv);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

//Add ingredients to shopping list
const addButton = document.getElementById("add-button");
addButton.addEventListener("click", function () {
  let ingredientList = document.getElementById("ingredientsBox");
  let ingredients = ingredientList.getElementsByTagName("input");
  let jsonToAdd;
  let updated = false;
  console.log(ingredients);
  for (let i = 0; i < ingredients.length; i++) {
    if (ingredients[i].type == "checkbox") {
      if (ingredients[i].checked) {
        updated = true;
        jsonToAdd = {
          name: ingredients[i].id,
          quantity: ingredients[i].value,
        };
      }
      fetch("/shopping-list", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonToAdd),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  if (updated == true) {
    alert("Your shopping list has been updated!");
  }
});
