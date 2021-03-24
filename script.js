const searchButton = document.getElementById('search-btn');
        searchButton.addEventListener('click', function () {
            //console.log("button clicked");
            const searchInput = document.getElementById('search-input').value;
            //console.log(searchInput);

            //fetching Meal Data]
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`)
                .then(res => res.json())
                .then(data => displayMeal(data))
        })

        const displayMeal = allMeal => {
            //console.log(allMeal.meals[0].idMeal);
            const mealContainer = document.getElementById('meal-container');

            for (let i = 0; i < allMeal.meals.length; i++) {
                const meal = allMeal.meals[i];
                //console.log(meal)
                //console.log(meal.strMeal);
                const mealDiv = document.createElement('div');
                mealDiv.className = 'single-meal col-md-3'

                const mealsInfo = `
                    <div class="" onclick="displayMealDetails('${meal.idMeal}')">
                        <img class="meal-img" src=${meal.strMealThumb}>
                        <div class="card p-2">
                            <h5>${meal.strMeal}</h5>
                        </div>
                    </div>
                `
                mealDiv.innerHTML = mealsInfo;
                mealContainer.appendChild(mealDiv);
            }
        }


        //Showing Single Meal Details

        const displayMealDetails = id => {
            const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            //console.log(url);
            fetch(url)
                .then(res => res.json())
                .then(data => renderMealInfo(data))
                
        }

        const renderMealInfo = meal => {
            //console.log(meal);
            const mealInfo = meal.meals[0];
            const detailsMealDiv = document.getElementById('details-meal');
            detailsMealDiv.innerHTML = `
                <img class="meal-img" src=${mealInfo.strMealThumb}>
                <div class="card p-2 meal-details">
                    <h1 class="mt-4">${mealInfo.strMeal}</h1>
                    <h3 class="mt-2">Ingredients</h3>
                <ul>
                    <li>${mealInfo.strIngredient1}</li>
                    <li>${mealInfo.strIngredient2}</li>
                    <li>${mealInfo.strIngredient3}</li>
                    <li>${mealInfo.strIngredient4}</li>
                    <li>${mealInfo.strIngredient5}</li>
                    <li>${mealInfo.strIngredient6}</li>
                </ul>
                </div>
            `
            const mealContainer = document.getElementById('primary-meals');
                mealContainer.style.display = "none";
        }