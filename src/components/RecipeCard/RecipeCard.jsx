import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./RecipeCard.css";
import recipeImage from "./image.png";
export const RecipeCard = () => {
  const [isFilled, setIsFilled] = useState(false);

  const handleHeartClick = () => {
    setIsFilled(!isFilled);
  };
  return (
    <div className="card">
      <img src={recipeImage} className="image" />
      <div className="recipe-info">
        <h2 className="recipe-title">Title</h2>
        <h4 className="recipe-duration">Duration</h4>
      </div>
      <i
        className={`bi bi-heart${isFilled ? "-fill" : ""} heart-icon`}
        onClick={handleHeartClick}
      ></i>
    </div>
  );
};
