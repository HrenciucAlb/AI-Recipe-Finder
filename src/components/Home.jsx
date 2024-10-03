import React from "react";
import { RecipeFinder } from "./RecipeFinder/RecipeFinder";
import { FavouritesList } from "./FavoritesList/FavoritesList";

export const Home = () => {
  return (
    <div>
      <RecipeFinder />
      <FavouritesList />
    </div>
  );
};
