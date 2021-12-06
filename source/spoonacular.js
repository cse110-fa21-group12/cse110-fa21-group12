// let recipe = {};

async function randomRecipe() {
  try {
    let recipe = {};
    fetch(
      "https://api.spoonacular.com/recipes/random?apiKey=dcbc0b69649b45209cb13948ce64a893"
    )
      .then((response) => response.json())
      .then((data) => {
        let {
          title,
          summary,
          dishTypes,
          diets,
          readyInMinutes,
          analyzedInstructions,
          extendedIngredients,
          // image,
        } = data.recipes[0];

        // getting the categories and tags fields working
        dishTypes = dishTypes || "";
        const tags = dishTypes.concat(diets);

        // parse cooking time
        if (readyInMinutes >= 60) {
          if (parseInt(readyInMinutes / 60) == 1) {
            readyInMinutes = `${parseInt(readyInMinutes / 60)} hour and ${
              readyInMinutes % 60
            } minutes`;
          } else {
            readyInMinutes = `${parseInt(readyInMinutes / 60)} hours and ${
              readyInMinutes % 60
            } minutes`;
          }
        } else {
          readyInMinutes = `${readyInMinutes} minutes`;
        }

        // extracting instructions from analyzedInstructions
        const directions = analyzedInstructions[0].steps.map((step) => {
          return step.step;
        });

        // extracting ingredients from extendedIngredients
        const ingredients = extendedIngredients.map((ingredient) => {
          const { amount, unit, name } = ingredient;
          return `${amount} ${unit} ${name}`;
        });

        recipe = {
          id: title,
          title: title,
          description: summary,
          categories: dishTypes,
          tags: tags,
          preparationTime: readyInMinutes,
          cookingTime: readyInMinutes,
          ingredients: ingredients,
          directions: directions,
          // img: image,
        };
        console.log(recipe);
        console.log(JSON.stringify(recipe));

        fetch("/recipes/create", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT,PATCH",
          },
          body: JSON.stringify(recipe),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
  } catch (error) {
    console.error(error);
  }
}

const button = document.querySelector("button");
button.addEventListener("click", () => {
  randomRecipe();
});