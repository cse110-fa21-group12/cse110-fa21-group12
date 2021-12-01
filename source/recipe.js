const url = localStorage.getItem('id');
console.log(url);
fetch('/recipes/' + url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,PATCH',
    },
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  const title = document.getElementsByClassName('recipe-title')[0];
  title.innerHTML = data.title;
  
  const description = document.getElementsByClassName('description')[0];
  description.innerHTML = data.description;

  const prepTime = document.getElementById('prep-time');
  prepTime.innerHTML = 'Preparation Time: ' + data.preparationTime;

  const cookTime = document.getElementById('cook-time');
  cookTime.innerHTML = 'Cook Time: ' + data.cookingTime;

  const totalTime = document.getElementById('total-time');
  
  const ingredientsBox = document.getElementById('ingredientsBox');
  for(let i = 0; i < data.ingredients.length; i++) {
    const newIngredient = document.createElement('input');
    newIngredient.setAttribute('type', 'checkbox');
    newIngredient.setAttribute('id', 'i');
    newIngredient.setAttribute('name', 'i');
    const newLabel = document.createElement('label');
    newLabel.setAttribute('class', 'checklist');
    newLabel.setAttribute('for', 'i');
    newLabel.innerHTML = data.ingredients[i];
    const br = document.createElement('br');
    ingredientsBox.appendChild(newIngredient);
    ingredientsBox.appendChild(newLabel);
    ingredientsBox.appendChild(br);
  }

  const directions = document.getElementById('directions');
  for(let j = 1; j < data.directions.length + 1; j++) {
    const header = document.createElement('h3');
    header.innerHTML = 'Step ' + j;
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fas fa-utensils');
    header.appendChild(icon);
    const instruction = document.createElement('p');
    instruction.innerHTML = data.directions[j];
    directions.appendChild(header);
    directions.appendChild(instruction);
  }
  
})
.catch((error) => {
  console.error('Error:', error);
});




