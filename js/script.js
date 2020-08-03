const btn = document.getElementById('getMeal');
const show = document.getElementById('show-meal');

btn.addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
			createMeal(res.meals[0]);
		})
		.catch(e => {
			console.warn(e);
		});
});

// parse data into html

const createMeal = meal => {
	const ingredients = [];

	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(
				`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
			);
		} else {
			// Stop if there are no more ingredients
			break;
		}
	}

    const newInnerHTML = `

        <div class="container">
        <div class="card mb-3">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="Meal Thumb">
            <div class="card-body">
            <h5 class="card-title">
                ${
                    meal.strCategory
                        ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
                        : ''
                }
            </h5>
            <div class="card-text">
                ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
                ${
                    meal.strTags
                        ? `<p><strong>Tags:</strong> ${meal.strTags
                                .split(',')
                                .join(', ')}</p>`
                        : ''
                }
            </div>
            <div class='card-text'>
                <h5>Ingredients</h5>
                <ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
            </div>
            <div class="card-text">
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
			</div>

            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>

        <div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
            <div class="col-md-4">
            <iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" class='card-img'>
				</iframe>
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Video Recipe - Procedures</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
            </div>
        </div>
        </div>
    </div>
		
	`;

	show.innerHTML = newInnerHTML;
};