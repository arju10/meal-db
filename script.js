document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const mealCardRow = document.getElementById('mealCardRow');
    const mealModalBody = document.getElementById('mealModalBody');

    // Function to fetch data from API based on search term
    async function fetchData(searchTerm) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        return data.meals;
    }

    // Function to display meals as cards
    function displayMeals(meals) {
        mealCardRow.innerHTML = '';
        meals.forEach(meal => {
            const card = `
                <div class="col-md-3 mb-4">
                    <div class="card">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <button class="btn btn-primary btn-sm btn-block view-details" data-toggle="modal" data-target="#mealModal" data-id="${meal.idMeal}">View Details</button>
                        </div>
                    </div>
                </div>
            `;
            mealCardRow.innerHTML += card;
        });
    }

    // Function to display meal details in modal
    async function displayMealDetails(mealId) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        const meal = data.meals[0];
        const modalContent = `
            <img src="${meal.strMealThumb}" class="img-fluid mb-3" alt="${meal.strMeal}">
            <h5>${meal.strMeal}</h5>
            <p>${meal.strInstructions}</p>
        `;
        mealModalBody.innerHTML = modalContent;
    }

    // Event listener for search input
    searchInput.addEventListener('input', async () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            const meals = await fetchData(searchTerm);
            displayMeals(meals);
        }
    });

    // Event listener for view details buttons
    document.body.addEventListener('click', event => {
        if (event.target.classList.contains('view-details')) {
            const mealId = event.target.dataset.id;
            displayMealDetails(mealId);
        }
    });
});
