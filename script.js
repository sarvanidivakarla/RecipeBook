//Declaring variables for responsiveness
const searchBox = document.querySelector('.searchBox');  //Search Box
const searchBtn = document.querySelector('.searchBtn');  //Search Button
const recipeContainer = document.querySelector('.recipeContainer');  //Recipe Container for overview of recipe
const recipeDetailsContent = document.querySelector('.recipeDetailsContent');  //Recipe details [Ingredients+Instructions]
const recipeCloseBtn = document.querySelector('.recipeCloseBtn');  //Close button

//Function to get recipes
const fetchRecipes = async (query) =>{  //Async function: 
    recipeContainer.innerHTML="<h2>Fetching Recipes</h2>"  //Message to be displayed while the api request is called
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);  //Getting response from api in the form of a promise
    const response = await data.json();  //Converting the response into json format 
    recipeContainer.innerHTML=""; //Removing previously written html elements

    response.meals.forEach(meal => {  //ForEach loop where each meal represents an array
        const recipeDiv = document.createElement('div');   //Adding a div element in html
        recipeDiv.classList.add('recipe'); //Naming the div class recipe
        
        //Adding the html elements inside the div element
        recipeDiv.innerHTML = `   
            <img src = "${meal.strMealThumb}">
            <div class="overview">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strArea}</p>
                <p>${meal.strCategory}</p>
            </div>    
        ` 
        //Creating a button for every div to view full recipe
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
        
        button.addEventListener('click', ()=>{
            openRecipePopUp(meal);
        });

        recipeContainer.appendChild(recipeDiv);

        
    });
    if(!recipeContainer.hasChildNodes()){
        recipeContainer.innerHTML="<h2>No recipes Found</h2>";
    }
}

const fetchIngredients = (meal) =>{
    let ingredientsList="";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measurement = meal[`strMeasure${i}`];
            ingredientsList += `<li><b>${ingredient}:</b> ${measurement}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopUp = (meal) =>{
    recipeDetailsContent.innerHTML = `
        <h2><bold>${meal.strMeal}</bold></h2>
        <h3>Ingredients</h3>
        <ul>${fetchIngredients(meal)}</ul>
        <br>
        <div>
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div>
            <a href="${meal.strYoutube}" target="_blank">
                <button type="button" class="videoBtn">Click here for video recipe</button>
            </a>
        </div>
    `

    recipeDetailsContent.parentElement.style.display = "block"; 
}
recipeCloseBtn.addEventListener('click', (e)=>{
    recipeDetailsContent.parentElement.style.display = "none";
});
searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});