var ingredientFormEl = document.querySelector("#ingredient-form");
var ingedientInputEl = document.querySelector("#ingredient-name");

// var drinkNameByIngredient = function() {
//     var apiUrl = "https://thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka";

//     fetch(apiUrl).then(function(response) {
//         response.json().then(function(data) {
//             console.log(data);
//         });
//     });
// };
// drinkNameByIngredient();

// var formSubmitHandler = function(event) {
//     event.preventDefault();
//     var ingredientName =
//     console.log(event);
// };
// ingredientFormEl.addEventListener("submit", formSubmitHandler);

var getcocktailIngredient = function(ingredient) {
    // format the cocktail api/url
    var apiUrl = "https://thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka";
  
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
