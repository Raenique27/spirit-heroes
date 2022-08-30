// search by ingredient section
var ingredientFormEl = document.getElementById("ingredient-form");
var ingredientInputEl = document.querySelector("#ingredient-input");
var ingredientSearchButton = document.getElementById("drink-ingredient-button");

var ingredientFormHandler = function (event) { // handler for submitted ingredient
    // stop page refresh
    event.preventDefault();

    // get a value from the input
    var ingredient = ingredientInputEl.value.trim();
    console.log(ingredient);
    if (ingredient) {
        drinkIngredientInfo(ingredient);

        // clear old content
        ingredientInputEl.value = "";
    }
}

// api call by drink ingredient
var drinkIngredientInfo = function (ingredient) {
    // make fetch request
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient + "")
        .then(function (response) {
            if (response.ok) {
            console.log(response);
            return response.json();
            }
            if (!response.ok) {
                var error = response.status;
                return Promise.reject(error);
            }
        })
        .then(function (data) {
            console.log(data);
            showDrinksByIngredient(data, ingredient);
            // save ingredient to local storage
            var savedIngredients = JSON.parse(localStorage.getItem("ingredients"));
            if (!savedIngredients)
                savedIngredients = []; // if not in storage, add to array for storage
            var alreadyinStorage = false;
            savedIngredients.forEach(function(item) {
                var name = item.name;
                if (name === ingredient) {
                    alreadyinStorage = true;
                }
            });
            // if no match
            if (!alreadyinStorage) {
                // add to storage
                savedIngredients.push({
                    name: ingredient
                });
            }
            localStorage.setItem("ingredients", JSON.stringify(savedIngredients));
        })
        .catch(function() {
            var ingredientSubmitContainer = document.getElementById("ingredient-submit-container");
            var ingredientErrorText = document.createElement("p");
            ingredientErrorText.textContent = "Error: Failed to fetch info from database";
            ingredientErrorText.className = "error-handling";
            ingredientErrorText.id = "ingredient-error-text";
            ingredientSubmitContainer.append(ingredientErrorText);

            var removeIngredientError = document.createElement("button");
            removeIngredientError.textContent = "Remove Error";
            removeIngredientError.setAttribute("remove", removeIngredientError);
            removeIngredientError.className = "alert button";
            removeIngredientError.id = "remove-ingredient-error";
            ingredientSubmitContainer.append(removeIngredientError);

            removeIngredientError.addEventListener("click", ingredientErrorRemover)
        });
}

var ingredientErrorRemover = function() {
    var ingredientErrorText = document.getElementById("ingredient-error-text");
    ingredientErrorText.remove();

    var ingredientErrorButton = document.getElementById("remove-ingredient-error");
    ingredientErrorButton.remove();
}

var showDrinksByIngredient = function (ingredients) {
    console.log(ingredients);
}

ingredientSearchButton.addEventListener("click", ingredientFormHandler);
// Search by drink name section
var drinkNameFormEl = document.getElementById("drink-name-form");
var drinkNameInputEl = document.querySelector("#drink-name-submission");
var drinkNameButton = document.getElementById("drink-name-button");

var getDrinkNameInfo = function (drinkName) { //api call for drink name
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName + "")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            if (!response.ok) {
                var error = response.status;
                return Promise.reject(error);
            }

        })
        .then(function (data) {
            console.log(data);
            displayDrinkNameResults(drinkName, data);
            // save drinkName to localstorage
            var savedDrinkNames = JSON.parse(localStorage.getItem("drink names")); // load saves to compare existing values w/ values yet to exist
            if (!savedDrinkNames)
                savedDrinkNames = []; // if the value is not in storage, add it to the array for storage
            var alreadyinStorage = false;
            savedDrinkNames.forEach(function (item) {
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
        .catch(function () {
            var nameSubmitContainer = document.getElementById("name-submit-container");
            var nameErrorText = document.createElement("p");
            nameErrorText.textContent = "Error: Failed to fetch info from database";
            nameErrorText.className = "error-handling";
            nameErrorText.id = "name-error-text";
            nameSubmitContainer.append(nameErrorText);

            var removeNameError = document.createElement("button");
            removeNameError.textContent = "Remove Error";
            removeNameError.setAttribute("remove", removeNameError);
            removeNameError.className = "alert button";
            removeNameError.id = "remove-name-error";
            nameSubmitContainer.append(removeNameError);


            removeNameError.addEventListener("click", drinkNameErrorRemover);
        })
};

var drinkNameErrorRemover = function () {
    var nameErrorText = document.getElementById("name-error-text");
    nameErrorText.remove();

    var nameErrorButton = document.getElementById("remove-name-error");
    nameErrorButton.remove();

}

var displayDrinkNameResults = function (drinkName, data) {
    var drinkNameResultsContainer = document.querySelector("#drink-name-results-container")
    var drinkNameImageEl = document.querySelector(".drink-name-image-container");
    var drinkNameResultsEl = document.querySelector(".drink-name-results");
    var drinkNameRecipe = document.querySelector("#drink-name-recipe");
    var drinkNameImageDiv = document.querySelector("#drink-name-image")
    

    var drinkNameResultsHeader = document.createElement("h4");
    drinkNameRecipe.appendChild(drinkNameResultsHeader);
    drinkNameResultsHeader.innerHTML = "<h4 id='drink-name-image-header' class='drink-name-headers'>" + drinkName + "</h4>";
    drinkNameResultsHeader.id = "drink-name-results-header"

    drinkNameResultsContainer.appendChild(drinkNameRecipe);

    var drinkNameImage = document.createElement("img");
    drinkNameImageDiv.append(drinkNameImage);
    drinkNameImage.src = data.drinks[0].strDrinkThumb + "/preview";
    drinkNameImage.alt  = "image of" + drinkName + "";
    drinkNameImage.id = "image-of-drink";
    // drinkNameImage.innerHTML = "<img src='" + data.drinks[0].strDrinkThumb + "/preview' alt='image of " + drinkName + "'>";

    var drinkNameIngredientsListEl = document.createElement("ul");
    drinkNameRecipe.append(drinkNameIngredientsListEl);
    drinkNameIngredientsListEl.id = "drinkName-ingredient-list";
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
            if (drinkDataIngredients[i] != 0){
                drinkDataIngredientsFinal.push(drinkDataIngredients[i]);// still returning all objects instead of selected. help pls
            } 
        }

    }
    filterIngredients();


    drinkDataIngredientsFinal.forEach(function (Object) {  // for each object with a valid ingredient, create a list element
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
    if (drinkName === null || drinkName === "") { // if drinkName is not properly entered
        return;
        // create a modal for error
    }
    var drinkNameResultsHeader = document.getElementById("drink-name-results-header")
    var drinkNameImage = document.querySelector("#image-of-drink");
    var drinkNameIngredientsListEl = document.querySelector("#drinkName-ingredient-list");
    if (drinkNameResultsHeader, drinkNameImage, drinkNameIngredientsListEl)  {
        
        drinkNameResultsHeader.remove();

        drinkNameImage.remove();

        drinkNameIngredientsListEl.remove();
    }

}

drinkNameButton.addEventListener("click", drinkNameHandler) // eventlistener for drink name search

// // Non-Alcoholic Search-Bar

// var nonalcoholicFormEl = document.getElementById("non-alcoholic-form");
// var nonalcoholicInputEl = document.querySelector("#non-alcoholic-input"); 
// var nonalcoholicButtonEl = document.getElementById("non-alcoholic-button");


// // var getNonalcoholicNameInfo = function(nonalcoholicName) {
//     fetch('http://https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic' + nonalcoholicName + "")
//         .then(function(response) {
//             if (response.ok) {
//             return response.json();   
//             }
//             if (!response.ok) {
//                 var error = response.status;
//                 return Promise.reject(error);
//             }
            
//         })
//         .then(function(data) {
//             console.log(data);
//             displayNonalcoholicNameResults(nonalcoholicName, data);
//             //save nonalcoholicdrinkName to local storage
//             var savednonalcoholicNames = JSON.parse(localStorage.getItem("non-alcoholic drink names")); // load saves
//             if (!savednonalcoholicNames) 
//             savednonalcoholicNames = [];
//             var alreadyinStorage = false;
//             savednonalcoholicNames.forEach(function(item){
//                 var name = item.name;
//                 if (name === nonalcoholicName) {
//                     alreadyinStorage = true;
//                 }
//             });
//             // no match
//             if(!alreadyinStorage) {
//                 savednonalcoholicNames.push({
//                     name: nonalcoholicName 
//                 });
//             } 
//             localStorage.setItem("non-alcoholic drink names", JSON.stringify(savednonalcoholicDrinkNames));
//         })
//         .catch(function () {
//             var nonalcoholicnameSubmitContainer = document.getElementById("non-alcoholic-name-container");
//             var nameErrorText = document.createElement("p");
//             nameErrorText.textContent = "Error: Failed to fetch info from database";
//             nameErrorText.className = "error-handling";
//             nameErrorText.id = "name-error-text"
//             nonalcoholicnameSubmitContainer.append(nameErrorText);

//             var removeNameError = document.createElement("button");
//             removeNameError.textContent = "Remove Error";
//             removeNameError.setAttribute("remove", removeNameError);
//             removeNameError.classname = "alert-button";
//             removeNameError.id = "remove-ingredient-error";
//             nonalcoholicnameSubmitContainer.append(removeNameError);

//             removeNameError.addEventListener("click", nonalcoholicNameErrorRemover);
//         })

// //};
// var nonalcoholicNameErrorRemover = function () {
//     var nameErrorText = document.getElementById("name-error-text");
//     nameErrorText.remove();

//     var  nameErrorButton = document.getElementById("remove-name-error");
//     nameErrorButton.remove();
// } 

//     displayNonalcoholicDrinkNameResults = function(nonalcoholicdrinkName, data) {
//         var nonalcoholicNameResultsContainer = document.querySelector("#non-alcoholic-results-container");
//         var nonalcoholicNameImageEl = document.querySelector(".non-alcoholic-image-container");
//         var nonalcohalicNameResultsEl = document.querySelector(".non-alcoholic-results");
//         var nonalcoholicNameRecipe = document.querySelector("#non-alcoholic-recipe");

//         var nonalcoholicNameResultsHeader = document.createElement("h4");
//         nonalcohalicNameResultsEl.appendChild(nonalcoholicNameResultsHeader);
//         nonalcoholicNameResultsHeader.innerHTML = "<h4 'non-alcoholic-name-image-header' class='non-alcoholic-name-headers'>" + nonalcoholicName + "</h4>";

//         nonalcohalicNameResultsContainer.appendChild(nonalcoholicNameRecipe);

//         var nonalcoholicNameImage = document.createElement("img");
//         nonalcoholicNameImageEl.append(nonalcoholicNameImage);
//         nonalcoholicNameImageEl.innerHTML = "<img src='" + data.nonalcoholic[0].strDrinkThumb + "/preview' alt='image of " + nonalcoholicName + "'>";

//         nonalcohalicNameResultsContainer.appendChild(nonalcoholicNameRecipe);

//        var nonalcoholicDataIngredientsFinal = [];
//        var nonalcoholicData = data.nonalcoholic[0];
//        console.log(nonalcoholicData);
//        var nonalcoholicDataIngredients = [
//         nonalcoholicData.strMeasure1 + nonalcoholicData.strIngredient1,
//         nonalcoholicData.strMeasure2 + nonalcoholicData.strIngredient2,
//         nonalcoholicData.strMeasure3 + nonalcoholicData.strIngredient3,
//         nonalcoholicData.strMeasure4 + nonalcoholicData.strIngredient4,
//         nonalcoholicData.strMeasure5 + nonalcoholicData.strIngredient5,
//         nonalcoholicData.strMeasure6 + nonalcoholicData.strIngredient6,
//         nonalcoholicData.strMeasure7 + nonalcoholicData.strIngredient7,
//         nonalcoholicData.strMeasure8 + nonalcoholicData.strIngredient8,
//         nonalcoholicData.strMeasure9 + nonalcoholicData.strIngredient9,
//         nonalcoholicData.strMeasure10 + nonalcoholicData.strIngredient10,
//         nonalcoholicData.strMeasure11 + nonalcoholicData.strIngredient11,
//         nonalcoholicData.strMeasure12 + nonalcoholicData.strIngredient12,
//         nonalcoholicData.strMeasure13 + nonalcoholicData.strIngredient13,
//         nonalcoholicData.strMeasure14 + nonalcoholicData.strIngredient14,
//         nonalcoholicData.strMeasure15 + nonalcoholicData.strIngredient15
//        ];

//     var filternonalcoholicIngredients = function () {
//         console.log(nonalcoholicDataIngredients);
//         for (let i=0; i < nonalcoholicDataIngredients.length; i++) {
//             if (nonalcoholicDataIngredients[i] !=0){
//                 nonalcoholicDataIngredientsFinal.push(nonalcoholicDataIngredients[i]);
//             }
//         }
//     }
//     filternonalcoholicIngredients();


//     nonalcoholicDataIngredientsFinal.forEach(function(Object) {
//         console.log(Object);
//         var nonalcoholicIngredientsEl = document.createElement("li");
//         nonalcoholicIngredientsEl.textContent = Object;
//         nonalcoholicIngredientsEl.setAttribute("data-search", Object);
//         nonalcoholicIngredientsEl.setAttribute("class", "non-alcoholic-ingredients-list-el")
//         nonalcoholicIngredientsListEl.appendChild(nonalcoholicingredientsEl);
//         nonalcoholicNameRecipe.appendChild(nonalcoholicIngredientsListEl);
//         nonalcoholicNameResultsContainer.appendChild(nonalcohalicNameRecipe);
//     });  
// }    

// var nonalcoholicHandler = function (event) {
//     event.preventDefault();

//     var nonalcoholicName = nonalcoholicInputEl.value.trim();
//     console.log(nonalcoholicName)
//     if (nonalcoholicName !== null || nonalcoholicName !== "") {
//         getNonalcoholicNameInfo(nonalcoholicName);
//         nonalcoholicInputEl.value = "";
//     }
//     if (nonalcoholicName === null || nonalcoholicName === "") {
//         //modal for error
//     }
    
//     var nonalcoholicResultsHeader = document.getElementById("non-alcoholic-header");
//     var nonalcoholicNameImage = document.querySelector("#image-of-non-alcoholic-drink");
//     var nonalcoholicIngredientsListEl = document.querySelector("#non-alcoholic-ingredient-list");
//     if (nonalcoholicResultsHeader, nonalcoholicNameImage, nonalcoholicIngredientsListEl) {

//         nonalcoholicResultsHeader.remove();

//         nonalcoholicNameImage.remove();

//         nonalcoholicIngredientsListEl.remove();

//     }
// }

// nonalcoholicButtonEl.addEventListener("click", nonalcoholicHandler)
// // var drinkNameErrorRemoval = document.getElementById("remove-error");
// // drinkNameErrorRemoval.addEventListener("click", drinkNameErrorRemover)
