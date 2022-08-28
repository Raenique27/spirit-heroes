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
    } else {
      console.log("enter something")
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

var showDrinkIngredients = function(ingredients) {
    // find out is the api returned any drinks
    if (ingredients.length === 0) {
      console.log("yay");
      return;
    }
}
drinkIngredientInfo();

