const searchBtn = document.getElementById('search-button');
const searchInputField = document.getElementById('input-value');
const popularMealSection = document.getElementById('random-meal');
const searchedMealsSection = document.getElementById('cards-container');
const modalInner = document.getElementById("modal-inner");

window.addEventListener('load', () =>{
    fetchRecipeRandomData();
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userInput = searchInputField.value;
    fetchRecipeData(userInput);
});

const fetchRecipeData = async (userInput) => {
    try {
        const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`);
        const recipesData = await apiResponse.json();
        renderRecipes(recipesData.meals);
    } catch (error) {
        console.error('Error while fetching recipes:', error);
    }
};

const fetchRecipeRandomData = async () => {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        const recipesData = await res.json();
        renderRandomRecipes(recipesData.meals[0]);
    } catch (error) {
        console.error('Error while fetching recipes:', error);
    }
};

const renderRandomRecipes = (randomMealData) => {
    // Clear previous content
    popularMealSection.innerHTML = '';
    const mealCard = document.createElement('div');
    mealCard.className = 'card';
    mealCard.innerHTML = `
        <div class="card-image">
            <img src="${randomMealData.strMealThumb}" alt="Image of ${randomMealData.strMeal}">
        </div>
        <div class="card-text">
            <h3>${randomMealData.strMeal}</h3>
        </div>
    `;
    const viewRecipeCard = document.createElement('div');
    viewRecipeCard.className = 'view-card-recipe';
    const viewRecipeBtn = document.createElement('button');
    viewRecipeBtn.innerHTML = 'View Recipe';
    viewRecipeBtn.className = 'view-recipe';
    viewRecipeCard.append(viewRecipeBtn);
    mealCard.append(viewRecipeCard);

    viewRecipeBtn.addEventListener('click', (e) => {
        modalInner.classList.toggle('hidden');
        document.getElementById("overlay").style.display = "block";
    })

    popularMealSection.appendChild(mealCard);
};

const renderRecipes = (mealData) => {
    // Clear previous content
    searchedMealsSection.innerHTML = '';

    if (!mealData) {
        // Display a message if no recipes are found.
        searchedMealsSection.innerHTML = '<p>No recipes found. Try another search!</p>';
        return;
    }

    mealData.forEach((mealItem) => {
        const mealCard = document.createElement('div');
        mealCard.className = 'card';
        mealCard.innerHTML = `
            <div class="card-image">
                <img src="${mealItem.strMealThumb}" alt="Image of ${mealItem.strMeal}">
            </div>
            <div class="card-text">
                <h3>${mealItem.strMeal}</h3>
            </div>
        `;
        searchedMealsSection.appendChild(mealCard);
    });
};


function off() {
    document.getElementById("overlay").style.display = "none";
  }


