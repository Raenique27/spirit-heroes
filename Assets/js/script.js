// search by ingredient section
var ingredientFormEl = document.getElementById("ingredient-form");
var ingredientInputEl = document.querySelector("#ingredient-input");
var ingredientSearchButton = document.getElementById("drink-ingredient-button");


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
            displayIngredientResults(ingredient, data);
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
            ingredientErrorText.textContent = "Error: Failed to fetch info from database / ingredient is not valid in database";
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

var displayIngredientResults = function (ingredient, data) {
    console.log(ingredient);
    var ingredientResultsContainer = document.querySelector("#ingredient-results-container");
    var ingredientDrinks = document.querySelector("#ingredient-drinks");
    var ingredientImageDiv = document.querySelector("#ingredient-image");

    
    for (let i= data.drinks.length -1;i > 0; i--) {
        var j = Math.floor(Math.random() * (i+1));
        var temp = data.drinks[i];
        data.drinks[i] = data.drinks[j];
        data.drinks[j] = temp;
    }

    var ingredientDrinkRandom = document.createElement("h4");
    ingredientDrinks.appendChild(ingredientDrinkRandom);
    ingredientDrinkRandom.id = "ingredient-drink-random";
    ingredientDrinkRandom.textContent = data.drinks[j].strDrink;
   

    ingredientResultsContainer.appendChild(ingredientDrinks);

    var ingredientDrinkImage = document.createElement("img");
    ingredientImageDiv.append(ingredientDrinkImage);
    ingredientDrinkImage.src = data.drinks[j].strDrinkThumb + "/preview"; 
    ingredientDrinkImage.alt = "image of" + ingredient + "";
    ingredientDrinkImage.id = "ingredient-drink-image";
}

var ingredientFormHandler = function (event) { // handler for submitted ingredient
    // stop page refresh
    event.preventDefault();

    // get a value from the input
    var ingredient = ingredientInputEl.value.trim();
    console.log(ingredient);
    if (ingredient === null || ingredient === "") { // if drinkName is not properly entered
        var errorIngredientModal = document.getElementById("error-ingredient-modal");
        errorIngredientModal.style.display = "block";
        var closeModal = document.getElementsByClassName("close")[1];
        closeModal.onclick = function() {
            errorIngredientModal.style.display = "none";
        }
        window.onclick  = function (event) {
            if (event.target == errorIngredientModal) {
                errorIngredientModal.style.display = "none";
            }
        }
        return;
    }
    if (ingredient) {
        drinkIngredientInfo(ingredient);

        // clear old content
        ingredientInputEl.value = "";
    }
    
    
    var ingredientDrinkRandom = document.querySelector("#ingredient-drink-random");
    var ingredientDrinkImage = document.querySelector("#ingredient-drink-image");
    
    if (ingredientDrinkRandom, ingredientDrinkImage)  {
        
        ingredientDrinkRandom.remove();

        ingredientDrinkImage.remove();

    }
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
            nameErrorText.textContent = "Error: Failed to fetch info from database / drink is not valid in database";
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
    var drinkNameRecipe = document.querySelector("#drink-name-recipe");
    var drinkNameImageDiv = document.querySelector("#drink-name-image")
    

    var drinkNameResultsHeader = document.createElement("h4");
    drinkNameRecipe.appendChild(drinkNameResultsHeader);
    drinkNameResultsHeader.innerHTML = "<h4 id='drink-name-image-header' class='drink-name-headers'>" + drinkName + "</h4>";
    drinkNameResultsHeader.id = "drink-name-results-header";

    drinkNameResultsContainer.appendChild(drinkNameRecipe);

    var drinkNameImage = document.createElement("img");
    drinkNameImageDiv.append(drinkNameImage);
    drinkNameImage.src = data.drinks[0].strDrinkThumb + "/preview";
    drinkNameImage.alt  = "image of" + drinkName + "";
    drinkNameImage.id = "image-of-drink";

    var drinkNameIngredientsListEl = document.createElement("ul");
    drinkNameRecipe.append(drinkNameIngredientsListEl);
    drinkNameIngredientsListEl.id = "drinkName-ingredient-list";
    drinkNameIngredientsListEl.textContent = "Ingredients:";
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
    if (drinkName === null || drinkName === "") { // if drinkName is not properly entered
        var errorDrinkModal = document.getElementById("error-drink-modal");
        errorDrinkModal.style.display = "block";
        var closeModal = document.getElementsByClassName("close")[0];
        closeModal.onclick = function() {
            errorDrinkModal.style.display = "none";
        }
        window.onclick  = function (event) {
            if (event.target == errorDrinkModal) {
                errorDrinkModal.style.display = "none";
            }
        }
        return;
    }
    if (drinkName !== null || drinkName !== "") { // if drinkName is properly entered
        getDrinkNameInfo(drinkName);
        drinkNameInputEl.value = "";
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
var errorModal = document.getElementById("error-modal");


drinkNameButton.addEventListener("click", drinkNameHandler) // eventlistener for drink name search

// // var drinkNameErrorRemoval = document.getElementById("remove-error");
// // drinkNameErrorRemoval.addEventListener("click", drinkNameErrorRemover)
