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
  }).catch((error) => {
    console.error("Error:", error);
  });
  //location.href="recipe-list.html"
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

    const description = document.getElementsByClassName("description")[0];
    description.innerHTML = data.description;

    const prepTime = document.getElementById("prep-time");
    prepTime.innerHTML = "Preparation Time: " + data.preparationTime;

    const cookTime = document.getElementById("cook-time");
    cookTime.innerHTML = "Cook Time: " + data.cookingTime;

    const totalTime = document.getElementById("total-time");
    //totalTime.innerHTML = 'Total Time: ' + data.totalTime;

    const ingredientsBox = document.getElementById("ingredientsBox");
    for (let i = 0; i < data.ingredients.length; i++) {
      const newIngredient = document.createElement("input");
      newIngredient.setAttribute("type", "checkbox");
      newIngredient.setAttribute("id", data.ingredients[i]);
      newIngredient.setAttribute("name", "i");
      const newLabel = document.createElement("label");
      newLabel.setAttribute("class", "checklist");
      newLabel.setAttribute("for", "i");
      newLabel.innerHTML = data.ingredients[i];
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

//Add ingredients to shopping list: Ready to go, comment out when backend has ingredient quantities
/*
const addButton = document.getElementById("add-button");
addButton.addEventListener("click", function () {
  let ingredientList = document.getElementById("ingredientsCheckboxes");
  let ingredients = ingredientList.getElementsByTagName("input");
  let len = ingredients.length;
  let jsonToDelete;
  for (let i = 0; i < len; i++) {
    if (ingredients[i].type == "checkbox") {
      if (ingredients[i].checked) {
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
});
*/
