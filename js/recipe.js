class Recipe {
  recipe_id;
  name;
  preptime;
  cooktime;
  servings;
  category;
  ingredients;
  directions; 

  constructor(params){
    this.recipe_id = params.id;
    this.name = params.attributes.name;
    this.preptime = params.attributes.preptime
    this.cooktime = params.attributes.cooktime
    this.servings = params.attributes.servings
    this.category = params.attributes.category
    this.ingredients = params.attributes.ingredients
    this.directions = params.attributes.directions
  }

  get totalTime() {
    return this.preptime + this.cooktime
  }

}