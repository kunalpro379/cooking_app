import { Heart, HeartPulse, Soup } from "lucide-react";
import { useEffect, useState } from "react";

const getTwoValuesFromArray = (arr) => {
  return [arr[0], arr[1]];
};

const RecipeCard = ({ recipe, bg = "bg-white", badge = "bg-orange-100" }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeFavorite = favorites.some((fav) => fav.label === recipe.label);
    setIsFavorite(isRecipeFavorite);
  }, [recipe.label]);

  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeAlreadyInFavorites = favorites.some(
      (fav) => fav.label === recipe.label
    );

    if (isRecipeAlreadyInFavorites) {
      favorites = favorites.filter((fav) => fav.label !== recipe.label);
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const healthLabels = getTwoValuesFromArray(recipe.healthLabels);

  return (
    <div className={`${bg} rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105`}>
      <div className="relative">
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
          <Soup className="w-16 h-16 text-white" />
        </div>
        <img
          src={recipe.image || "/api/placeholder/400/300"}
          alt={recipe.label}
          className="w-full h-48 object-cover"
          onLoad={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.previousElementSibling.style.display = "none";
          }}
        />
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Soup className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-gray-600">{recipe.yield} Servings</span>
          </div>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={(e) => {
              e.preventDefault();
              addRecipeToFavorites();
            }}
          >
            {!isFavorite && <Heart className="w-5 h-5 text-gray-600" />}
            {isFavorite && <HeartPulse className="w-5 h-5 text-red-500" />}
          </button>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
          {recipe.label}
        </h3>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
            {recipe.cuisineType[0].charAt(0).toUpperCase() +
              recipe.cuisineType[0].slice(1)}{" "}
            Kitchen
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {healthLabels.map((label, idx) => (
            <span
              key={idx}
              className={`${badge} px-3 py-1 rounded-full text-sm text-orange-800`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;