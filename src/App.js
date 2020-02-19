import React ,{useEffect, useState }from 'react';
import Recipe from "./Recipe";
import './App.css';

const App = () => {
  const APP_ID = "8ba70183";
  const App_KEY = "50c6e29716949341f88756a37dc2dfaf	";
  
  const[recipes,setRecipes] = useState ([]);
  const [search,setSearch]  = useState (" ");
  const [query,setQuery] = useState ('chicken');


  useEffect(()=> {
    getRecipes();
  }, [query]);

const getRecipes = async () => {
  const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${App_KEY}`);
  const data = await response.json ();
  // console.log (data.hits);

  setRecipes(data.hits);
  console.log(data.hits);
};

const updateSearch = e => {
  setSearch (e.target.value);
  // console.log (search);

};

const getSearch = e => {
  e.preventDefault ();
  setQuery(search);

};



  return (
    <div className ="App">   
      <form onSubmit = {getSearch} className ="search-form">
        <input 
            className="search-bar" 
            type ="text" 
            value = {search}   
            onChange = {updateSearch} 
        />
        <button 
              className="search-button" 
              type ="submit">
          Search
          </button>
      </form>
      <div className= "recipes">
      {recipes.map(recipeee => (
         <Recipe 
              key = {recipeee.recipe.label}
              title = { recipeee.recipe.label} 
              calories = {recipeee.recipe.calories} 
              image = {recipeee.recipe.image}
              ingredients = {recipeee.recipe.ingredients}
         />


      ))
      }
      </div>
    </div>
  );
};

export default App;
