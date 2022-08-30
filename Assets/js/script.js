// search by ingredient section
var ingredientFormEl = document.getElementById("ingredient-form");
var ingredientInputEl = document.querySelector("#ingredient-input");
var ingredientButton = document.getElementById("ingredient-name-button");

// api call by drink ingredien
var drinkIngredientInfo = function(ingredient) { 
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + ingredient  + "";
  
    // make fetch request
    fetch(apiUrl)
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        showDrinkIngredients(data, drinkIngredient);
        //local storage
        var savedIngredients = JSON.parse(localStorage.getItem("ingredient name"));
        if (!savedIngredients) //if its not in storage, add to storage
            savedIngredients = [];
        var inStorage = false;
        savedIngredients.forEach(function(item) {
            var ingredient = item.ingredient;
            if (ingredient === drinkIngredient) {
                inStorage = true;
            }
        });
        //if nothing matches
        if (!inStorage) {
            savedIngredients.push({
                ingredientName: drinkIngredient
            });
        }
        localStorage.setItem("ingredient names", JSON.stringify(savedIngredients));
    })
}
drinkIngredientInfo();

var showDrinkIngredients = function(drinkIngredient, data) {
    var ingredientResultsContainer = document.querySelector("#ingredient-name-results-container")
    var drinkImageEl = document.querySelector("#ingredient-image");
    var drinkResultsEl = document.querySelector(".drink-name-results");
    var ingredientRecipe = document.querySelector("#ingredient-recipe");

    drinkResultsHeader = document.createElement("h4");
    ingredientResultsContainer.append(drinkResultsHeader);
    drinkResultsHeader.innerHTML = "<h4 id='ingredient-image' class='drink-name-headers'>" + drinkIngredient + "</h4>";

    var drinkIngredientImage = document.createElement("img");
    drinkImageEl.append(drinkIngredientImage);
    drinkImageEl.innerHTML = "<img src='"+ data.ingredients[0].strDrinkThumb + "/preview' alt='image of " + drinkIngredient + "'>";

    var drinkNameIngredientsListEl = document.createElement("ul");
    drinkResultsEl.append(drinkNameIngredientsListEl);
    drinkNameIngredientsListEl.textContent = "Ingredients:"
    //drinkNameIngredientsListEl.setAttribute("data-ingredients", data.drinks[0]);

    var ingredientButton = document.getElementById("ingredient-button");
    var drinkNameSection = document.getElementById("drink-name");

    var formSubmitHandler = function (event) {
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
}

// api call by drink ingredien
var drinkIngredientInfo = function (drinkIngredient) {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + drinkIngredient + "";

    // make fetch request
    fetch(apiUrl)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            showDrinkIngredients(data, drinkIngredient);
        })
}
var showDrinkIngredients = function (ingredients) {
    console.log(ingredients);
}
//showDrinkIngredients();

var ingredientNameHandler = function(event) {  //submission handler for search by ingredient name
    // prevent page from refreshing
    event.preventDefault();
    // get value from input
    var drinkIngredient = ingredientInputEl.value.trim().toLowerCase();
    console.log(drinkIngredient)
    if (drinkIngredient !== null || drinkIngredient !== "") { // if drinkName is properly entered
        getDrinkNameInfo(drinkIngredient);
    } 
    if ( drinkIngredient === null || drinkIngredient === "") { // if drinkName is not properly entered
        return;
        // create a modal for error
    }
}