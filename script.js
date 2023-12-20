const searchBtn = document.getElementById('search-button');
const searchInputField = document.getElementById('input-value');
const popularMealSection = document.getElementById('random-meal');
const searchedMealsSection = document.getElementById('cards-container');
const modalInner = document.getElementById("modal-inner");


// Event listener for window load to fetch a random recipe
window.addEventListener('load', () =>{
    fetchRecipeRandomData();
})

// Event listener for the search button
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userInput = searchInputField.value;
    fetchRecipeData(userInput);
});

// Event listener for closing the modal
document.getElementById('close-btn').addEventListener('click', () => {
    modalInner.classList.add('hidden');
})

// Async Function to fetch a random recipe
const fetchRecipeRandomData = async () => {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        const recipesData = await res.json();
        renderRandomRecipes(recipesData.meals[0]);
    } catch (error) {
        console.error('Error while fetching recipes:', error);
    }
};

// Function to render a random recipe and display the data
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
        modalInner.classList.remove('hidden');
    })

    displayIngredients(randomMealData.idMeal, randomMealData.strMealThumb );

    popularMealSection.appendChild(mealCard);
};


// Function to display ingredients of the random meal
const displayIngredients = async (mealId, imageUrl) => {
    try {
        const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const mealData = await apiResponse.json();
        const meal = mealData.meals[0];

        const ingredientsList = document.getElementById("modal-ingredients").querySelector('ul');
        ingredientsList.innerHTML = ''; // Clear existing ingredients

        const modalImage = document.querySelector('.modal-img');
        modalImage.src = imageUrl;

        for(let i = 1; i <= 30; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if(ingredient && measure) {
                const li = document.createElement('li');
                li.textContent = `${measure} ${ingredient}`;
                ingredientsList.appendChild(li);
            }
        }
    } catch (error) {
        console.error('Error while fetching ingredients:', error);
    }
};

// Async Function to fetch recipes based on user input
const fetchRecipeData = async (userInput) => {
    try {
        const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${userInput}`);
        const recipesData = await apiResponse.json();
        console.log(recipesData)
        renderRecipes(recipesData.meals);
    } catch (error) {
        console.error('Error while fetching recipes:', error);
    }
};

// Function to render searched recipes and display the data
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

