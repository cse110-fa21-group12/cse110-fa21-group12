const { init } = require("grunt");

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
            initialDiv.addEventListener("click", function(event) {
                localStorage.setItem("id", data[i].title);
                window.location = "recipe.html";
            });

            const RecipeDiv = document.createElement("div");
            RecipeDiv.setAttribute("class", "recipe-content");

            //Create and add cooking time to the recipe card
            const timeTaken = document.createElement("p");
            timeTaken.setAttribute("class", "recipe-time");
            timeTaken.innerHTML = "Time taken: " + data[i].cookingTime;
            RecipeDiv.appendChild(timeTaken);

            //create and add recipe rating to the recipe card
            const rating = document.createElement("p");
            rating.setAttribute("class", "recipe-rating");
            rating.innerHTML = "Time taken: " + "10"; //data[i].cookingTime;
            RecipeDiv.appendChild(rating);

            //Create and add recipe name to the recipe card
            const recipeName = document.createElement("p");
            recipeName.setAttribute("class", "recipes-title");
            recipeName.innerHTML = data[i].title;
            RecipeDiv.appendChild(recipeName);


            //Create and add image to the recipe card
            const RecipeImg = document.createElement("div");
            RecipeImg.setAttribute("class", "recipe-img");

            //temp solution
            const recipepicture = document.createElement("img");
            recipepicture.setAttribute("src", "media/sample.jpg");

            RecipeImg.appendChild(recipepicture);

            initialDiv.appendChild(RecipeImg);
            initialDiv.appendChild(RecipeDiv);

            list.appendChild(initialDiv);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });