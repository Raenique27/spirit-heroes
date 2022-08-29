var ingredientFormEl = document.getElementById("ingredient-form");
var ingredientInputEl = document.querySelector("#ingredient-input");
var ingredientButton = document.getElementById("ingredient-button");

var formSubmitHandler = function(event) {
    // stop page refresh
    event.preventDefault();
  
    // get a value from the input
    var ingredient = ingredientInputEl.value.trim();
  
    if (ingredient) {
        drinkIngredientInfo(ingredient);
  
      // clear old content
      ingredientInputEl.value = "";
    }
}

// api call by drink ingredient
var drinkIngredientInfo = function(drinkIngredient) { 
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + drinkIngredient  + "";
  
    // make fetch request
    fetch(apiUrl)
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        showDrinkIngredients(data, drinkIngredient);
    })
}









showDrinkIngredients();
var showDrinkIngredients = function(drinkIngredient, data) {
    var ingredientDisplyContainer = document.querySelector("#drink-name-results-container")
    var drinkIngredientImageEl = document.querySelector(".ingredient-image");
    var drinkIngredientRecipe = document.querySelector("#ingredient-recipe");
}
drinkIngredientInfo();