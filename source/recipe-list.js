
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

      //Create and add cooking time to the recipe card
      const timeTaken = document.createElement("p");
      timeTaken.innerHTML = "Time taken: " + data[i].cookingTime; //change to totalTime
      initialDiv.appendChild(timeTaken);

      //Create and add recipe name to the recipe card
      const recipeName = document.createElement("h3");
      recipeName.innerHTML = "Recipe name: " + data[i].title;
      initialDiv.appendChild(recipeName);

      //Create and add image to the recipe card

      //Create and add rating to the recipe card

      list.appendChild(initialDiv);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });


