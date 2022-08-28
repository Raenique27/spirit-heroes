var ingredientFormEl = document.getElementById("ingredient-form");
var ingredientInputEl = document.querySelector("#ingredient-input");
var ingredientButton = document.getElementById("ingredient-button");

// api call by drink ingredient
var getDrinkNameInfo = function(drinkIngredient) { 
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
    });
};

var showDrinkIngredients = function(ingredients) {
    // find out is the api returned any drinks
    if (ingredients.length === 0) {
      console.log("yay");
      return;
    }
};
getDrinkNameInfo();
