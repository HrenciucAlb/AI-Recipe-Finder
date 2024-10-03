import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./RecipeCard.css";
import recipeImage from "../../assets/image.png";
export const RecipeCard = ({ title, onCardClick }) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setIsFilled(!isFilled);
    // You could also add logic here for adding/removing from favorites
  };

  return (
    <div className="card" onClick={onCardClick}>
      <img src={recipeImage} className="image" />
      <div className="recipe-info">
        <h2 className="recipe-title">{title}</h2>
        {/* <h4 className="recipe-duration">Duration</h4> */}
      </div>
      <i
        className={`bi bi-heart${isFilled ? "-fill" : ""} heart-icon`}
        onClick={handleHeartClick}
      ></i>
    </div>
  );
};
