const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipeContainer');

//Function to get recipes
const fetchRecipes = async (query) =>{
    recipeContainer.innerHTML="<h2>Fetching Recipes</h2>"
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);  //Getting the promises into the data variable
    const response = await data.json();  //Converting the response into json format
    recipeContainer.innerHTML=""; //Removing previously written html elements

    response.meals.forEach(meal => {
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
        recipeContainer.appendChild(recipeDiv);

        button.addEventListener('click', ()=>{
            openRecipePopUp(meal);
        });
    });
}


searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});