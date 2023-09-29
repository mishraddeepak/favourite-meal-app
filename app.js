document.addEventListener('DOMContentLoaded', function () {   // just to ensure that html is loaded first before js


    function fetchResult(query) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            .then((response) => response.json())               // response coming from api is in XML(extensible markup and language) convert to json
            .then((data) => {
                outPutBox.innerHTML = ''
                if (data.meals) {        //selected meals from received data which is a list
                    data.meals.forEach((meal) => {  //iterate through the meals resulted from query
                        const mealCard = document.createElement('div')
                        mealCard.innerHTML = `<div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <button class="btn btn-primary">Favorite</button>
                    </div>
                    </div>`;
                        outPutBox.appendChild(mealCard)//append card to the div
                        // adding the items in to the wishlist
                        input.value = '';
                        const favouriteButton = mealCard.querySelector('.btn-primary')
                        favouriteButton.addEventListener('click', () => {
                            favouriteButton.disabled = true;
                            const wishlistItem = document.createElement('div')
                            wishlistItem.innerHTML = `<div class="card fav-card">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body">
                                <h5 class="card-title">${meal.strMeal} </h5><button class="button remove">Remove</button>
                                <button class="button ingredients-button">Ingredients</button>
   
                                







                            </div>
                            <div id="ingred">
                        <div class="ingredient-box">
                          <ul class="list-group list-group-flush"id="ingredient">
                            <li class="list-group-item disabled" aria-disabled="true">Ingredients:</li>
                             <li class="list-group-item">A second item</li> 
                          </ul>
                        </div>
                        <div class="ingredient-box">
                          <ul class="list-group"id="requirement">
                            <li class="list-group-item disabled" aria-disabled="true">Measure:</li>
                             <li class="list-group-item">A second item</li> 
                           
                          </ul>
                        </div>
                      </div>

                        </div>`;
                            listItems.appendChild(wishlistItem)
                            listItems.addEventListener('click', (e) => {
                                if (e.target.classList.contains('remove')) {
                                    const wishlistItem = e.target.closest('.fav-card');
                                    if (wishlistItem) {
                                        wishlistItem.remove();
                                    }
                                }
                            });
                            // for ingredient
                            let count = 1;
                            while (true) {
                                const ingredlist = meal["strIngredient" + count];

                                if (!ingredlist) {
                                    // Exit the loop when ingredlist is null or empty
                                    break;
                                }

                                const ingrlist = document.createElement('li');
                                ingrlist.classList.add('list-group-item')


                                ingrlist.innerHTML = ingredlist;
                                wishlistItem.querySelector('#ingredient').appendChild(ingrlist);
                                count++;
                            }
                            //for measure 
                            let num = 1;
                            while (true) {
                                const measurelist = meal["strMeasure" + num];

                                if (!measurelist) {
                                    // Exit the loop when ingredlist is null or empty
                                    break;
                                }

                                const measurementlist = document.createElement('li');
                                measurementlist.classList.add('list-group-item')


                                measurementlist.innerHTML = measurelist;
                                wishlistItem.querySelector('#requirement').appendChild(measurementlist);
                                // console.log(measurementlist)
                                num++;

                            }
                            let flag = true; // Initialize the flag to true

                            listItems.addEventListener('click', (e) => {
                                if (e.target.classList.contains('ingredients-button')) {
                                    const ingredientsSection = e.target.closest('.fav-card').querySelector('#ingred');
                                    if (ingredientsSection) {
                                        if (flag) {
                                            ingredientsSection.style.display = 'block';
                                            flag = false;
                                        } else {
                                            ingredientsSection.style.display = 'none'; // Hide the ingredients section
                                            flag = true;
                                        }
                                    }
                                }
                            });


                        })


                    });

                } else {
                    outPutBox.innerHTML = '<p>No meal found</p>'
                }
            })
            .catch(error => {
                console.error('Error fetching', error)
            })

    }

    // selecting elements from index.html page
    var input = document.getElementById('formGroupExampleInput')
    var searchButton = document.getElementById('style-button')
    var outPutBox = document.getElementById('box1')
    // from the favourite page
    var listItems = document.getElementById('saved')
    // event listener on button
    searchButton.addEventListener('click', function () {
        var query = input.value
        // if query is not a empty value
        if (query.trim() !== '') {
            fetchResult(query)
        } else { outPutBox.innerHTML = `<p class="null">Plz type something</p>` }
    })
})


// functionality to add favourite section
var wishListContent = document.getElementById('wish')
var wishlist = document.getElementById('wishlist-container')
flag = true
wishlist.addEventListener('click', (e) => {
    // e.preventDefault()
    e.stopPropagation()
    if (flag == true) {
        wishListContent.style.display = "block"
        flag = false
    }
    else {
        wishListContent.style.display = "none"
        flag = true
    }
})
// Prevent click events on dropdown options from propagating to the parent
wishListContent.addEventListener('click', (e) => {
    e.stopPropagation();
});
