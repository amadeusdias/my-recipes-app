const ZERO = 0;
const TWELVE = 12;

export async function fetchMealsCards() {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const result = await response.json();
  return result.meals.slice(ZERO, TWELVE);
}

export async function fetchDrinksCards() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const result = await response.json();
  return result.drinks.slice(ZERO, TWELVE);
}

// export async function fetchCategoryMeals(category) {
//   let url;
//   switch (category) {
//   case 'Beef': {
//     url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef';
//     break;
//   }
//   case 'Breakfast': {
//     url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast';
//     break;
//   }
//   case 'Chicken': {
//     url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken';
//     break;
//   }
//   case 'Dessert': {
//     url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';
//     break;
//   }
//   case 'Goat': {
//     url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat';
//   }
//   default:
//     return null;
//   }
// }
export async function fetchCategoryMeals(category) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.meals;
}

export async function fetchCategoryDrinks(category) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.drinks;
}
