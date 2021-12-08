const addIngredientButton = document.getElementById("add-shopping-button");
const ingredientForm = document.getElementById("shopping-form");
populateList();

//Display shopping list
function populateList() {
  fetch("/shopping-list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      while (ingredientForm.hasChildNodes()) {
        ingredientForm.removeChild(ingredientForm.lastChild);
      }
      let box, shoppingIngredient;
      for (let i = 0; i < data.length; i++) {
        shoppingIngredient = document.createElement("label");
        box = document.createElement("input");
        box.setAttribute("type", "checkbox");
        box.setAttribute("id", data[i].name);
        box.setAttribute("value", data[i].quantity);
        shoppingIngredient.appendChild(box);
        shoppingIngredient.appendChild(
          document.createTextNode(data[i].quantity + " " + data[i].name)
        );
        ingredientForm.appendChild(shoppingIngredient);
        ingredientForm.append(document.createElement("br"));
      }
    });
}

addIngredientButton.addEventListener("click", function () {
  const newIngredient = document.getElementById("ingredient");
  const newIngredientAmount = document.getElementById("ingredient-quantity");
  const ingred = newIngredient.value;
  const amount = newIngredientAmount.value;
  const jsonIngredient = {
    name: ingred,
    quantity: amount,
  };
  fetch("/shopping-list", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonIngredient),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  location.href = "shopping-list.html";
  populateList(); //Update display of shopping list
});

const doneButton = document.getElementById("done-button");
doneButton.addEventListener("click", function () {
  let ingredientList = document.getElementById("shopping-form");
  let ingredients = ingredientList.getElementsByTagName("input");
  console.log(ingredients);
  let len = ingredients.length;
  let jsonToDelete;
  for (let i = 0; i < len; i++) {
    if (ingredients[i].type == "checkbox") {
      if (ingredients[i].checked) {
        console.log("in");
        jsonToDelete = {
          name: ingredients[i].id,
          quantity: ingredients[i].value,
        };
      }
      fetch("/shopping-list", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonToDelete),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      location.href = "shopping-list.html";
    }
  }
  populateList();
});
