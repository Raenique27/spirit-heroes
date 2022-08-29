// search by ingredient section
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
var showDrinkIngredients = function(ingredients) {
    console.log(ingredients);
}




// Search by drink name section
var displayDrinkNameResults = function(drinkName, data) {
    var drinkNameResultsContainer = document.querySelector("#drink-name-results-container")
    var drinkNameImageEl = document.querySelector(".drink-name-image-container");
    var drinkNameResultsEl = document.querySelector(".drink-name-results");
    var drinkNameRecipe = document.querySelector("#drink-name-recipe");

    var drinkNameResultsHeader = document.createElement("h4");
    drinkNameResultsContainer.append(drinkNameResultsHeader);
    drinkNameResultsHeader.innerHTML = "<h4 id='drink-name-image-header' class='drink-name-headers'>" + drinkName + "</h4>";
    
    var drinkNameImage = document.createElement("img");
    drinkNameImageEl.append(drinkNameImage);
    drinkNameImageEl.innerHTML = "<img src='"+ data.drinks[0].strDrinkThumb + "/preview' alt='image of " + drinkName + "'>";

    var drinkNameIngredientsListEl = document.createElement("ul");
    drinkNameResultsEl.append(drinkNameIngredientsListEl);
    drinkNameIngredientsListEl.textContent = "Ingredients:"
    drinkNameIngredientsListEl.setAttribute("data-ingredients", data.drinks[0]);

    var drinkDataIngredientsFinal = [];
    var drinkData = data.drinks[0];
    console.log(drinkData);
    var drinkDataIngredients = [{
        "Ingredient1": drinkData.strMeasure1  + drinkData.strIngredient1 ,
        "Ingredient2": drinkData.strMeasure2  + drinkData.strIngredient2 ,
        "Ingredient3": drinkData.strMeasure3  + drinkData.strIngredient3 , 
        "Ingredient4": drinkData.strMeasure4  + drinkData.strIngredient4 , 
        "Ingredient5": drinkData.strMeasure5  + drinkData.strIngredient5 , 
        "Ingredient6": drinkData.strMeasure6  + drinkData.strIngredient6 ,
        "Ingredient7": drinkData.strMeasure7  + drinkData.strIngredient7 ,
        "Ingredient8": drinkData.strMeasure8  + drinkData.strIngredient8 ,
        "Ingredient9": drinkData.strMeasure9  + drinkData.strIngredient9 ,
        "Ingredient10": drinkData.strMeasure10  + drinkData.strIngredient10 ,
        "Ingredient11": drinkData.strMeasure11  + drinkData.strIngredient11 ,
        "Ingredient12": drinkData.strMeasure12  + drinkData.strIngredient12 ,
        "Ingredient13": drinkData.strMeasure13  + drinkData.strIngredient13 ,
        "Ingredient14": drinkData.strMeasure14  + drinkData.strIngredient14 ,
        "Ingredient15": drinkData.strMeasure15  + drinkData.strIngredient15       
        }];
    var filterIngredients = function() {
       
        console.log(drinkDataIngredients);
        // for (let i=0; i < drinkDataIngredients.length; i++) { // condense array to only contain objects with valid ingredients
        //     if (drinkDataIngredients[i].value !== "0" || drinkDataIngredients[i].value !== "null null" ) {
        //         drinkDataIngredientsFinal.push(drinkDataIngredients[i]);// still returning all objects instead of selected. help pls
        //     }
        // }
        // drinkDataIngredients.forEach(Object =>{ // need to get rid of ingredient objects that have an invalid value
        //     if (Object.value  === 0) {
        //         delete Object;
                
        //     }
        // });
        drinkDataIngredients = drinkDataIngredients.filter(function(value) {
            return value !== 0, null, Number;

        });
        console.log(drinkDataIngredients);
        console.log(drinkDataIngredientsFinal);
    }
    filterIngredients();

    drinkDataIngredients.forEach(function(Object) {  // for each object with a valid ingredient, create a list element
        console.log(Object);
        var ingredientsEl = document.createElement("li");
        ingredientsEl.innerHTML = "<li class='ingredients-list-el' data-search='" + Object.value + "'>" + Object.value + "</li>" // returning as undefined. help pls
        drinkNameIngredientsListEl.append(ingredientsEl);
    }); 
}

showDrinkIngredients();
var showDrinkIngredients = function(drinkIngredient, data) {
    var ingredientDisplyContainer = document.querySelector("#drink-name-results-container")
    var drinkIngredientImageEl = document.querySelector(".ingredient-image");
    var drinkIngredientRecipe = document.querySelector("#ingredient-recipe");
}

drinkNameButton.addEventListener("click", drinkNameHandler) // eventlistener for drink name searc