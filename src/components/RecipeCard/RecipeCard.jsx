import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./RecipeCard.css";
import recipeImage from "../../assets/image.png";
export const RecipeCard = ({
  title,
  onCardClick,
  isFavorite,
  onToggleFavorite,
}) => {
  const handleHeartClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(title);
  };

  return (
    <div className="card" onClick={onCardClick}>
      <img src={recipeImage} className="image" />
      <div className="recipe-info">
        <h2 className="recipe-title">{title}</h2>
        {/* <h4 className="recipe-duration">Duration</h4> */}
      </div>
      <i
        className={`bi bi-heart${isFavorite ? "-fill" : ""} heart-icon`}
        onClick={handleHeartClick}
      ></i>
    </div>
  );
};
