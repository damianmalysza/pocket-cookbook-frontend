const recipeIndexUrl = "http://localhost:3000/recipes"
const mainContainer = document.querySelector(".main-container")
const recipes = []
const categories = []

document.addEventListener("DOMContentLoaded",() => {
  fetchRecipes()

})

function fetchRecipes(){
  fetch(recipeIndexUrl)
  .then(response => response.json())
  .then(json => {
    json.data.forEach(recipe => {
      let newRecipe = new Recipe(recipe)
      recipes.push(newRecipe)
      if (!categories.includes(newRecipe.category)) {
        categories.push(newRecipe.category)
      }
    })
  })
}

function createRecipeCard(recipe) {
  let cardOuterShell = document.createElement('div')
  cardOuterShell.className = 'col-sm-3'

  let cardInnerShell = document.createElement('div')
  cardInnerShell.className = 'card mt-3'
  cardOuterShell.appendChild(cardInnerShell)

  let cardBody = document.createElement('div')
  cardBody.className = 'card-body text-center'
  cardInnerShell.appendChild(cardBody)

  let cardTitle = document.createElement('h5')
  cardTitle.className = 'card-title'
  cardTitle.innerText = recipe.name

  let cardSubTitle = document.createElement('h6')
  cardSubTitle.className = 'card-subtitle mb-2 text-muted'
  cardSubTitle.innerText = `${recipe.totalTime} minutes`

  let cardText = document.createElement('p')
  cardText.className = 'card-text'
  cardText.innerText = `${recipe.servings} Servings`

  let button = document.createElement('button')
  button.className = 'btn btn-primary'
  button.id = recipe.recipe_id
  button.innerText = 'View Recipe'

  cardBody.append(cardTitle,cardSubTitle,cardText,button)

  return cardOuterShell
}