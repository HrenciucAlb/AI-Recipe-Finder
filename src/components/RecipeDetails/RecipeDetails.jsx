import React, { useState, useEffect } from "react";
import "./RecipeDetails.css";
import { getGroqChatCompletion } from "../../../groqAI";
import { getIngredients } from "../../../constants";
import recipeImage from "../../assets/image.png";

export const RecipeDetails = ({
  recipe,
  onBack,
  duration,
  isFavorite,
  onToggleFavorite,
}) => {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilled, setIsFilled] = useState(isFavorite);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setIsLoading(true);
      setError("");
      try {
        const details = await getGroqChatCompletion(
          getIngredients,
          recipe,
          false
        );
        setRecipeDetails(details);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setError("Failed to load recipe details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipe]);

  const handleHeartClick = () => {
    setIsFilled(!isFilled);
    onToggleFavorite(recipe);
  };

  return (
    <div className="recipe-details-container">
      <button onClick={onBack} className="back-button">
        Back to Recipes
      </button>
      {isLoading ? (
        <p>Loading recipe details...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        recipeDetails && (
          <div className="recipe-content">
            <div className="recipe-left">
              <img src={recipeImage} alt={recipe} className="recipe-image" />
              <h2 className="recipe-name">{recipe}</h2>
              <h4 className="recipe-duration">{duration}</h4>
              <i
                className={`bi bi-heart${isFilled ? "-fill" : ""} heart-icon`}
                onClick={handleHeartClick}
              ></i>
            </div>
            <div className="recipe-right">{recipeDetails}</div>
          </div>
        )
      )}
    </div>
  );
};
