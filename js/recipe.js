class Recipe {
  recipe_id;
  name;
  preptime;
  cooktime;
  servings;
  category;
  ingredients = [];
  directions = []; 

  static #recipesUrl = "http://localhost:3000/recipes"
  static recipes = [];
 

}