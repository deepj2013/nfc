  import React, { useEffect, useState } from "react";
  import ModalWrapper from "../../layout/ModalWrapper";
  import { useDispatch } from "react-redux";
  import { addRecipeToMenuService } from "../../redux/thunk/micellaneousServices";
  import { successToast, logger } from "../../utils/Helper";
  import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

  const RecipeModal = ({ isOpen, onClose, menu, recipeData, readOnly }) => {
    const dispatch = useDispatch();

  
    useEffect(() => {
      if (menu && menu.recipe) {
        console.log(menu);
        setRecipeData({
          ingredients: menu.recipe.ingredients || [{ name: "", quantity: "" }],
          steps: menu.recipe.steps || [""],
          createdBy: menu.createdBy || 1,
          updatedBy: menu.updatedBy || 1,
        });
      } else if (!readOnly) {
        // If adding a new recipe, reset to default values
        setRecipeData({
          ingredients: [{ name: "", quantity: "" }],
          steps: [""],
          createdBy: 1,
          updatedBy: 1,
        });
      }
    }, [menu, readOnly]);

    const handleIngredientChange = (index, field, value) => {
      if (readOnly) return; // Prevent editing in read-only mode
      setRecipeData((prev) => {
        const updatedIngredients = [...prev.ingredients];
        updatedIngredients[index][field] = value;
        return { ...prev, ingredients: updatedIngredients };
      });
    };

    const addIngredient = () => {
      if (readOnly) return;
      setRecipeData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, { name: "", quantity: "" }],
      }));
    };

    const removeIngredient = (index) => {
      if (readOnly) return;
      setRecipeData((prev) => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index),
      }));
    };

    const handleStepChange = (index, value) => {
      if (readOnly) return;
      setRecipeData((prev) => {
        const updatedSteps = [...prev.steps];
        updatedSteps[index] = value;
        return { ...prev, steps: updatedSteps };
      });
    };

    const addStep = () => {
      if (readOnly) return;
      setRecipeData((prev) => ({
        ...prev,
        steps: [...prev.steps, ""],
      }));
    };

    const removeStep = (index) => {
      if (readOnly) return;
      setRecipeData((prev) => ({
        ...prev,
        steps: prev.steps.filter((_, i) => i !== index),
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (readOnly) return; // Prevent saving in read-only mode
    
      try {
        const payload = {
          ...recipeData,
          menuId: menu?._id, // ✅ Ensure menu ID is included for updates
        };
    
        console.log("Submitting Recipe Data:", payload);
        await dispatch(addRecipeToMenuService(payload)).unwrap();
        successToast("Recipe saved successfully!");
        onClose();
      } catch (error) {
        logger(error);
      }
    };
    return (
      <ModalWrapper isOpen={isOpen} onClose={onClose}>
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg mx-auto my-10 flex flex-col h-[90vh]">
          <h2 className="text-xl font-bold mb-4">Recipe for {menu?.name}</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 overflow-y-auto h-[80vh]"
          >
{/* Ingredients Section */}
<div>
  <h3 className="text-lg font-semibold">Ingredients</h3>
  {readOnly ? (
    <ul className="list-disc pl-5">
      {recipeData.ingredients.map((ingredient, index) => (
        <li key={index}>
          <strong>{ingredient.name}</strong> - {ingredient.quantity}
        </li>
      ))}
    </ul>
  ) : (
    recipeData.ingredients.map((ingredient, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder="Ingredient Name"
          value={ingredient.name}
          onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <input
          type="text"
          placeholder="Quantity"
          value={ingredient.quantity}
          onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <button
          type="button"
          onClick={() => removeIngredient(index)}
          className="text-red-500 hover:text-red-700"
        >
          <FaMinusCircle size={20} />
        </button>
        <button
          type="button"
          onClick={addIngredient}
          className="text-green-500 hover:text-green-700"
        >
          <FaPlusCircle size={20} />
        </button>
      </div>
    ))
  )}
</div>

{/* Steps Section */}
<div className="mt-4">
  <h3 className="text-lg font-semibold">Steps</h3>
  {readOnly ? (
    <ol className="list-decimal pl-5">
      {recipeData.steps.map((step, index) => (
        <li key={index} className="mt-1">{step}</li>
      ))}
    </ol>
  ) : (
    recipeData.steps.map((step, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <textarea
          placeholder={`Step ${index + 1}`}
          value={step}
          onChange={(e) => handleStepChange(index, e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          type="button"
          onClick={() => removeStep(index)}
          className="text-red-500 hover:text-red-700"
        >
          <FaMinusCircle size={20} />
        </button>
        <button
          type="button"
          onClick={addStep}
          className="text-green-500 hover:text-green-700"
        >
          <FaPlusCircle size={20} />
        </button>
      </div>
    ))
  )}
</div>

{/* Submit Button - Hidden in Read-Only Mode */}
{!readOnly && (
  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
  >
    Save Recipe
  </button>
)}
          </form>
        </div>
      </ModalWrapper>
    );
  };

  export default RecipeModal;