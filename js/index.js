const recipeIndexUrl = "http://localhost:3000/recipes"
const mainContainer = document.querySelector(".main-container")
const recipes = []
fetchRecipes()

function fetchRecipes(){
  fetch(recipeIndexUrl)
  .then(response => response.json())
  .then(json => {
    json.data.forEach(recipe => {
      recipes.push(new Recipe(recipe))
    })
  })
}
