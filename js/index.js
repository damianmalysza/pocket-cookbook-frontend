const recipeIndexUrl = "http://localhost:3000/recipes"
const categoriesIndexUrl = "http://localhost:3000/categories"
const mainContainer = document.querySelector(".main-container")
const recipes = []
const categories = []
const navBar = document.querySelector('#nav-tab')
const tabContent = document.querySelector('#nav-tabcontent')

document.addEventListener("DOMContentLoaded",() => {
  fetchRecipes()
  fetchAndCreateCategories()
  // display recipe details for clicked on recipe
})

function fetchRecipes(){
  fetch(recipeIndexUrl)
  .then(response => response.json())
  .then(json => {
    json.data.forEach(recipe => {
      recipes.push(new Recipe(recipe))
    })
  })
}

function createCategoryTabs(categories) {
  categories.forEach(category => {
    let tab = document.createElement('a')
    tab.className = 'nav-item nav-link'
    tab.setAttribute('data-toggle', 'tab')
    tab.setAttribute('category', `${category}`)
    tab.href = `#nav-${category}`
    tab.innerText = `${category}`
    tab.addEventListener("click", displayCards)
    
    navBar.appendChild(tab)
  })
}


function fetchAndCreateCategories(){
  fetch(categoriesIndexUrl)
  .then(response => response.json())
  .then(json => {
    json.forEach(category => categories.push(category))
    createCategoryTabs(categories)
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
  button.addEventListener('click', displayRecipe)
  
  cardBody.append(cardTitle,cardSubTitle,cardText,button)
  
  return cardOuterShell
}

function createRecipeDisplay(recipe) {
  let contentOuterShell = document.createElement('div')
  contentOuterShell.className = 'card w-100'

  let contentTitle = document.createElement('h5')
  contentTitle.className = 'card-header'
  contentTitle.innerText = recipe.name
  contentOuterShell.appendChild(contentTitle)

  let contentBody = document.createElement('div')
  contentBody.className = 'card-body'

  let recipeInfo = document.createElement('h6')
  recipeInfo.className = 'card-title'
  recipeInfo.innerText = `Prep Time: ${recipe.preptime} minutes | Cook Time: ${recipe.cooktime} minutes | Servings: ${recipe.servings}`
  contentBody.appendChild(recipeInfo)

  let ingredientsGroup = document.createElement('ul')
  ingredientsGroup.className = 'list-group list-group-flush d-flex flex-row flex-wrap border-bottom'
  recipe.ingredients.forEach(ingredient => {
    let ingredientRow = document.createElement('li')
    ingredientRow.className = 'list-group-item w-50'
    ingredientRow.innerText = `${ingredient.quantity} ${ingredient.unit} : ${ingredient.ingredient}`
    ingredientsGroup.appendChild(ingredientRow)
  })
  contentBody.appendChild(ingredientsGroup)

  let directionsGroup = document.createElement('ul')
  directionsGroup.className = 'list-group mt-3 border'
  recipe.directions.forEach(direction => {
    let directionRow = document.createElement('li')
    directionRow.className = 'list-group-item border-0'
    directionRow.innerText = `${direction.step_number}. ${direction.direction}`
    directionsGroup.appendChild(directionRow)
  })
  contentBody.appendChild(directionsGroup)

  let backButton = document.createElement('button')
  backButton.className = 'btn btn-primary mt-3'
  backButton.setAttribute('category',`${recipe.category}`)
  backButton.addEventListener('click',displayCards)
  backButton.innerText = "Back"
  contentBody.appendChild(backButton)

  contentOuterShell.appendChild(contentBody)
  return contentOuterShell
}

function displayCards(event){
  removeCurrentDisplay()
  const selectedCategory = event.target.attributes['category'].value

  const filteredRecipes = recipes.filter(recipe => recipe.category === selectedCategory)

  filteredRecipes.forEach(recipe => {
    tabContent.appendChild(createRecipeCard(recipe))
  })
}

function displayRecipe(event){
  removeCurrentDisplay()
  const selectedRecipeId = event.target.attributes['id'].value
  const selectedRecipe = recipes.find(recipe => recipe.recipe_id == selectedRecipeId)
  tabContent.appendChild(createRecipeDisplay(selectedRecipe))
}

function removeCurrentDisplay(){
  while (tabContent.firstChild) {
    tabContent.removeChild(tabContent.firstChild)
  }
}