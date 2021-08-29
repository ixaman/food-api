const searchResult = () => {
    const searchInput = document.getElementById('search-field');
    const searchText = searchInput.value;
    if (searchText == ''){
        document.getElementById('meal-container').style.display = 'none';
    }
    else {
        // clear data
    searchInput.value = '';
    // load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data.meals))
    }
    
}

const displayResult = fooditems  => {
    const foodItemContainer = document.getElementById('meal-container');
    foodItemContainer.textContent = '';
    fooditems.forEach( fooditem => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick = "getFoodDetails(${fooditem.idMeal})" class="card">
                <img src=" ${fooditem.strMealThumb} " class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${fooditem.strMeal}</h5>
                    <p class="card-text">
                    ${fooditem.strInstructions.slice(0,250)}
                    </p>
                </div>
            </div> 

        `;
        foodItemContainer.appendChild(div);
    })
    

}

const getFoodDetails = mealId => {
    console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.meals[0]));
}

const displayDetails = foodItemDetails => {
    console.log(foodItemDetails);
    const detailsContainer = document.getElementById('food-description');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML  = ` 
        <img src="${foodItemDetails.strMealThumb}" class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title">${foodItemDetails.strMeal}</h5>
            <p class="card-text">
            ${foodItemDetails.strInstructions.slice(0,250)}
            </p>
            <a href="${foodItemDetails.strSource}" class="btn btn-danger">Watch Video</a>
        </div>  
    `;
    detailsContainer.appendChild(div);

}

