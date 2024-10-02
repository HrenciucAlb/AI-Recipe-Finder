import "./App.css";
import { RecipeCard } from "./components/RecipeCard/RecipeCard";
import { RecipeFinder } from "./components/RecipeFinder/RecipeFinder";

function App() {
  return (
    <div className="App">
      <RecipeFinder />
      <RecipeCard />
    </div>
  );
}

export default App;
