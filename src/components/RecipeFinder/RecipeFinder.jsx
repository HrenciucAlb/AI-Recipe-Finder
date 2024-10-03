import React, { useState } from "react";
import "./RecipeFinder.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getGroqChatCompletion } from "../../../groqAI";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import { getIngredients, getRecipes } from "../../../constants";
import { RecipeDetails } from "../RecipeDetails/RecipeDetails"; // Import the RecipeDetails component

export const RecipeFinder = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to track the selected recipe

  const searchCall = getRecipes;
  const clickCall = getIngredients;

  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    setError("");
    try {
      const parsedRecipes = await getGroqChatCompletion(searchCall, query);
      setRecipes(parsedRecipes);
    } catch (error) {
      console.error("Error fetching response:", error);
      setError("Failed to get a response.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = async (recipe) => {
    setSelectedRecipe(recipe); // Set the clicked recipe to show details
  };

  const handleBackToResults = () => {
    setSelectedRecipe(null); // Reset the selected recipe to go back to the recipe list
  };

  return (
    <div className="search-container">
      {selectedRecipe ? (
        // Conditionally render RecipeDetails if a recipe is selected
        <RecipeDetails recipe={selectedRecipe} onBack={handleBackToResults} />
      ) : (
        <>
          <input
            type="text"
            placeholder="What do you feel like eating?"
            value={query}
            className="search"
            onChange={(e) => setQuery(e.target.value)}
          />
          <i className="bi bi-search search-icon" onClick={handleSearch} />
          {isLoading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}

          {!isLoading && recipes.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h2 style={{ color: "black" }}>Suggested recipes:</h2>
              {recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  title={recipe}
                  onCardClick={() => handleCardClick(recipe)} // Passing click handler
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
