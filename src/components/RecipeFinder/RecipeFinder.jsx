import React, { useState, useEffect } from "react";
import "./RecipeFinder.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getGroqChatCompletion } from "../../../groqAI";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import { getRecipes } from "../../../constants";
import { RecipeDetails } from "../RecipeDetails/RecipeDetails";

export const RecipeFinder = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCall = getRecipes;

  const handleSearch = async (newSearch = false) => {
    if (!query && !newSearch) return;
    setIsLoading(true);
    setError("");
    setShowSuggestions(true);
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

  const handleToggleFavorite = (recipe) => {
    const updatedFavorites = favorites.includes(recipe)
      ? favorites.filter((fav) => fav !== recipe)
      : [...favorites, recipe];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (recipe) => favorites.includes(recipe);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToResults = () => {
    setSelectedRecipe(null);
  };

  const handleClearSearch = () => {
    setQuery("");
    setRecipes([]);
    setShowSuggestions(false);
  };

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Failed to parse favorites from localStorage:", e);
        setFavorites([]);
      }
    }
  }, []);

  const handleNewRecipes = () => {
    handleSearch(true);
  };

  return (
    <div className="search-container">
      {selectedRecipe ? (
        <RecipeDetails
          recipe={selectedRecipe}
          onBack={handleBackToResults}
          isFavorite={isFavorite(selectedRecipe)}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <>
          {/* Input and Search/Clear Button */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="What do you feel like eating?"
              value={query}
              className="search"
              onChange={(e) => setQuery(e.target.value)}
            />
            {showSuggestions ? (
              <i
                className="bi bi-x-circle search-icon"
                onClick={handleClearSearch}
              />
            ) : (
              <i
                className="bi bi-search search-icon"
                onClick={() => handleSearch()}
              />
            )}
          </div>

          {isLoading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}

          {/* Show Favorites when search hasn't been triggered yet (showSuggestions is false) */}
          {!showSuggestions && favorites.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h1 style={{ color: "black" }}>Favorites</h1>
              {favorites.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  title={recipe}
                  isFavorite={true}
                  onToggleFavorite={handleToggleFavorite}
                  onCardClick={() => handleCardClick(recipe)}
                />
              ))}
            </div>
          )}

          {/* Show suggested recipes only when search is clicked */}
          {showSuggestions && !isLoading && recipes.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h1 style={{ color: "black" }}>Suggested recipes</h1>
              {recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  title={recipe}
                  isFavorite={isFavorite(recipe)}
                  onToggleFavorite={handleToggleFavorite}
                  onCardClick={() => handleCardClick(recipe)}
                />
              ))}
              <div className="new-recipes-button-box">
                <button
                  className="new-recipes-button"
                  onClick={handleNewRecipes}
                >
                  I don't like these
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
