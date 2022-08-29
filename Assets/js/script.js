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

// api call by drink ingredien
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
var drinkNameFormEl = document.getElementById("drink-name-form");
var drinkNameInputEl = document.querySelector("#drink-name-submission");
var drinkNameButton = document.getElementById("drink-name-button");

var getDrinkNameInfo = function(drinkName) { //api call for drink name
    fetch("https:/www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName  + "")
    .then(function(response) {
        return response.json();
    })
    .then(function(data)  {
        console.log(data);
        displayDrinkNameResults(drinkName, data);
        // save drinkName to localstorage
        var savedDrinkNames = JSON.parse(localStorage.getItem("drink names")); // load saves to compare existing values w/ values yet to exist
        if (!savedDrinkNames)
            savedDrinkNames = []; // if the value is not in storage, add it to the array for storage
        var alreadyinStorage = false;
        savedDrinkNames.forEach(function(item) {
            var name = item.name;
            if (name === drinkName) {
                alreadyinStorage = true;
            }
        });
        // if there isn't a match 
        if (!alreadyinStorage) { // if the value is not already in storage: 
            //add to storage
            savedDrinkNames.push({
                name: drinkName // we're only saving names to storage. we'll make an api call each time for the values stored in localstorage that are going to be entered into the dropdown menu for search bar 
            });
        } 
        localStorage.setItem("drink names", JSON.stringify(savedDrinkNames));
    })
}

var displayDrinkNameResults = function(drinkName, data) {
    var drinkNameResultsContainer = document.querySelector("#drink-name-results-container")
    var drinkNameImageEl = document.querySelector(".drink-name-image-container");
    var drinkNameResultsEl = document.querySelector(".drink-name-results");
    var drinkNameRecipe = document.querySelector("#drink-name-recipe");

    var drinkNameResultsHeader = document.createElement("h4");
    drinkNameRecipe.appendChild(drinkNameResultsHeader);
    drinkNameResultsHeader.innerHTML = "<h4 id='drink-name-image-header' class='drink-name-headers'>" + drinkName + "</h4>";

    drinkNameResultsContainer.appendChild(drinkNameRecipe);
    
    var drinkNameImage = document.createElement("img");
    drinkNameImageEl.append(drinkNameImage);
    drinkNameImageEl.innerHTML = "<img src='"+ data.drinks[0].strDrinkThumb + "/preview' alt='image of " + drinkName + "'>";

    var drinkNameIngredientsListEl = document.createElement("ul");
    drinkNameRecipe.append(drinkNameIngredientsListEl);
    drinkNameIngredientsListEl.textContent = "Ingredients:"
    drinkNameIngredientsListEl.setAttribute("data-ingredients", data.drinks[0]);

    drinkNameResultsContainer.appendChild(drinkNameRecipe);




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
//     var filterIngredients = function() {
       
//         console.log(drinkDataIngredients);
//          for (let i=0; i < drinkDataIngredients.length; i++) { // condense array to only contain objects with valid ingredients
//             if (drinkDataIngredients[i].value !== "0" || drinkDataIngredients[i].value !== "null" ) {
//                 drinkDataIngredientsFinal.push(drinkDataIngredients);// still returning all objects instead of selected. help pls
//             }
//          }
//         drinkDataIngredients.forEach(Object =>{ // need to get rid of ingredient objects that have an invalid value
//              if (Object.value  === 0) {
//                 delete Object;
                
//              }
//         });
//         drinkDataIngredients = drinkDataIngredients.filter(function(value) {
//             return value !== 0, null, Number;

//         });
//         console.log(drinkDataIngredients);
//         console.log(drinkDataIngredientsFinal);
// }
//     filterIngredients();

    drinkDataIngredients.forEach(function(Object) {  // for each object with a valid ingredient, create a list element
        console.log(Object);
        var ingredientsEl = document.createElement("li");
        ingredientsEl.innerHTML = "<li class='ingredients-list-el' data-search='" + Object.value + "'>" + Object.value + "</li>" // returning as undefined. help pls
        drinkNameIngredientsListEl.append(ingredientsEl);
    }); 
     
}
var drinkNameHandler = function(event) {  //submission handler for search by drink name
    // prevent page from refreshing on submission
    event.preventDefault();
    // get value from input element
    var drinkName = drinkNameInputEl.value.trim();
    console.log(drinkName)
    if (drinkName !== null || drinkName !== "") { // if drinkName is properly entered
        getDrinkNameInfo(drinkName);
        drinkNameInputEl.value = "";
    } 
    else if ( drinkName === null || drinkName === "") { // if drinkName is not properly entered
        return;
        // create a modal for error
    }
}

drinkNameButton.addEventListener("click", drinkNameHandler) // eventlistener for drink name search