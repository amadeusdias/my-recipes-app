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