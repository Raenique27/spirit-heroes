var ingredientsFormEl = document.getElementById("ingredients-form");
var ingredientsInputEl = document.querySelector("#ingredients-submission");
var ingredientButton = document.getElementById("ingredient-button");


var getcocktailIngredient = function(ingredient) {
    // format the cocktail api/url
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka";
  
    // make a fetch request to url
    fetch(apiUrl)
        .then(function(response) {
        // if the request worked
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                });
            } else {
                console.log('Error: Cocktail Ingredient Not Found');
            }
        })
        .catch(function(error) {
            console.log("Unable to connect to thecocktaildb.com");
        });
};
getcocktailIngredient();
