var ingredientsFormEl = document.getElementById("ingredients-form");
var ingredientsInputEl = document.querySelector("#ingredients-submission");
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
};
getDrinkNameInfo();
