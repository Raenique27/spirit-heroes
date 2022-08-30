// search by ingredient section
var ingredientFormEl = document.getElementById("ingredient-form");
var ingredientInputEl = document.querySelector("#ingredient-input");
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




// Search by drink name section
var drinkNameFormEl = document.getElementById("drink-name-form");
var drinkNameInputEl = document.querySelector("#drink-name-submission");
var drinkNameButton = document.getElementById("drink-name-button");

var getDrinkNameInfo = function(drinkName) { //api call for drink name
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName  + "")
    .then(function(response) {
        if (response.ok) {
        return response.json();
        }
        if (!response.ok) {
            var error = response.status;
            return Promise.reject(error);
        }
        
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
    .catch(function() {
        var nameSubmitContainer = document.getElementById("name-submit-container");
        var nameErrorText = document.createElement("p");
        nameErrorText.textContent = "Error: Failed to fetch info from database";
        nameErrorText.className = "error-handling";
        nameErrorText.id = "error-text"
        nameSubmitContainer.append(nameErrorText);
        
        var removeError = document.createElement("button");
        removeError.textContent = "Remove Error";
        removeError.setAttribute("remove", removeError);
        removeError.className = "alert button";
        removeError.id = "remove-error";
        nameSubmitContainer.append(removeError);

        
        removeError.addEventListener("click", drinkNameErrorRemover);
    })
};

var drinkNameErrorRemover = function() {
    var nameErrorText = document.getElementById("error-text");
    nameErrorText.remove();

    var nameErrorButton = document.getElementById("remove-error");
    nameErrorButton.remove();
   
}

var displayDrinkNameResults = function (drinkName, data) {
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
    drinkNameImageEl.innerHTML = "<img src='" + data.drinks[0].strDrinkThumb + "/preview' alt='image of " + drinkName + "'>";

    var drinkNameIngredientsListEl = document.createElement("ul");
    drinkNameRecipe.append(drinkNameIngredientsListEl);
    drinkNameIngredientsListEl.textContent = "Ingredients:"
    drinkNameIngredientsListEl.setAttribute("data-ingredients", data.drinks[0]);

    drinkNameResultsContainer.appendChild(drinkNameRecipe);




    var drinkDataIngredientsFinal = [];
    var drinkData = data.drinks[0];
    console.log(drinkData);
    var drinkDataIngredients = [
        drinkData.strMeasure1 + drinkData.strIngredient1,
        drinkData.strMeasure2 + drinkData.strIngredient2,
        drinkData.strMeasure3 + drinkData.strIngredient3,
        drinkData.strMeasure4 + drinkData.strIngredient4,
        drinkData.strMeasure5 + drinkData.strIngredient5,
        drinkData.strMeasure6 + drinkData.strIngredient6,
        drinkData.strMeasure7 + drinkData.strIngredient7,
        drinkData.strMeasure8 + drinkData.strIngredient8,
        drinkData.strMeasure9 + drinkData.strIngredient9,
        drinkData.strMeasure10 + drinkData.strIngredient10,
        drinkData.strMeasure11 + drinkData.strIngredient11,
        drinkData.strMeasure12 + drinkData.strIngredient12,
        drinkData.strMeasure13 + drinkData.strIngredient13,
        drinkData.strMeasure14 + drinkData.strIngredient14,
        drinkData.strMeasure15 + drinkData.strIngredient15
    ];
    var filterIngredients = function () {

        console.log(drinkDataIngredients);
        for (let i = 0; i < drinkDataIngredients.length; i++) { // condense array to only contain objects with valid ingredients
            if (drinkDataIngredients[i] != 0) {
                drinkDataIngredientsFinal.push(drinkDataIngredients[i]);// still returning all objects instead of selected. help pls
            }
        }

    }
    filterIngredients();
    drinkDataIngredientsFinal.forEach(function(Object) {  // for each object with a valid ingredient, create a list element
        console.log(Object);
        var ingredientsEl = document.createElement("li");
        ingredientsEl.textContent = Object;
        ingredientsEl.setAttribute("data-search", Object);
        ingredientsEl.setAttribute("class", "ingredients-list-el")
        drinkNameIngredientsListEl.appendChild(ingredientsEl);
        drinkNameRecipe.appendChild(drinkNameIngredientsListEl);
        drinkNameResultsContainer.appendChild(drinkNameRecipe);
    }); 

}
var drinkNameHandler = function (event) {  //submission handler for search by drink name
    // prevent page from refreshing on submission
    event.preventDefault();
    // get value from input element
    var drinkName = drinkNameInputEl.value.trim();
    console.log(drinkName)
    if (drinkName !== null || drinkName !== "") { // if drinkName is properly entered
        getDrinkNameInfo(drinkName);
        drinkNameInputEl.value = "";
    }
    else if (drinkName === null || drinkName === "") { // if drinkName is not properly entered
        return;
        // create a modal for error
    }
}

drinkNameButton.addEventListener("click", drinkNameHandler) // eventlistener for drink name search

drinkNameButton.addEventListener("click", drinkNameHandler) // eventlistener for drink name search

// Non-Alcoholic Search-Bar

var nonalcoholicNameEl = document.getElementById("non-alcoholic-form");
var nonalcoholicInputEl = document.querySelector("#non-alcoholic-name-submission"); 
var nonalcoholicBarEl = document.getElementById("non-alcoholic-search-bar");
var nonalcoholicButtonEl = document.getElementById("non-alcoholic-search-button");
let nonalcohalicDrink = [];
// console.log(nonalcoholicBarEl);

var formSubmitHandler = function (event) {
    // stop page refresh
    event.preventDefault();

    // get a value from the input
    var nonalcoholicName = nonalcoholicInputEl.value.trim();

    if (nonalcoholicName) {
        nonalcoholicNameInfo(nonalcoholicname);

        // clear old content
        nonalcoholicInputEl.value = "";
    }
}

var getNonalcoholicNameInfo = function(nonalcoholicName) {
    fetch('http://https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic' + nonalcohalicDrink + "")
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        displayNonalcoholicNameResults(nonalcoholicName, data);
        //save nonalcoholicdrinkName to local storage
        var savednonalcoholicNames = JSON.parse(localStorage.getItem("non-alcoholic drink names")); // load saves
        if (!savednonalcoholicNames) 
        savednonalcoholicNames = [];
        var alreadyinStorage = false;
        savednonalcoholicNames.forEach(function(item){
            var name = item.name;
            if (name === nonalcoholicName) {
                alreadyinStorage = true;
            }
        });
        // no match
        if(!alreadyinStorage) {
            savednonalcoholicNames.push({
                name: nonalcoholicName 
            })
        } 
        localStorage.setItem("non-alcoholic drink names", JSON.stringify(savednonalcoholicDrinkNames));
    });
};
    displayNonalcoholicDrinkNameResults = function(nonalcoholicdrinkName, data) {
        var nonalcoholicNameResultsContainer = document.querySelector("#non-alcoholic-results-container");
        var nonalcoholicNameImageEl = document.querySelector(".non-alcoholic-image-container");
        var nonalcohalicNameResultsEl = document.querySelector(".non-alcoholic-results");
        var nonalcoholicNameRecipe = document.querySelector("#non-alcoholic-recipe");

        var nonalcoholicNameResultsHeader = document.createElement("h4");
        nonalcohalicNameResultsEl.append(nonalcoholicNameResultsHeader);
        nonalcoholicNameResultsHeader.innerHTML = "<h4 'non-alcoholic-name-image-header' class='non-alcoholic-name-headers'>" + nonalcoholicName + "</h4>";

        var nonalcoholicNameImage = document.createElement("img");
        nonalcoholicNameImageEl.append(nonalcoholicNameImage);
        nonalcoholicNameImageEl.innerHTML = "<img src='" + data.nonalcoholic[0].strDrinkThumb + "/preview' alt='image of " + nonalcoholicName + "'>";
    }

    
// var drinkNameErrorRemoval = document.getElementById("remove-error");
// drinkNameErrorRemoval.addEventListener("click", drinkNameErrorRemover)
