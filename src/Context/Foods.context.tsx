import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { Food, FoodContextType } from "../Interfaces/app.interfaces";

const FoodContext = createContext<FoodContextType | undefined>(undefined);

const apiUrl = "https://food-data-json.vercel.app/api";

const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [foodItems, setFoodItems] = useState<Food[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>("");
  const [searchTerm, setSearchTerm] = useState("");


  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      setCategories([...response.data]); // Forçar uma nova referência do array
    } catch (error) {
      console.error("Erro ao buscar categorias: ", error);
    }
  };
  
  const fetchFoodItems = async (category: string) => {
    try {
      const response = await axios.get(`${apiUrl}/categories/${category}`);
      setFoodItems(response.data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  const fetchFoodItemsByCategory = async (category: string) => {
    try {
      const response = await axios.get(`${apiUrl}/categories/${category}`);
      setFoodItems(response.data);
    } catch (error) {
      console.error("Erro ao buscar alimentos: ", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchFoodItems(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    console.log(searchTerm)
    if (searchTerm) {
      const filteredFoods = foodItems.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFoodItems(filteredFoods);
    } else if (selectedCategory) {
      fetchFoodItemsByCategory(selectedCategory);
    } else {
      setFoodItems([]);
    }
  }, [searchTerm]);

  return (
    <FoodContext.Provider
      value={{
        categories,
        foodItems,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        fetchCategories,
        fetchFoodItems
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

const useFoodContext = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFoodContext must be used within a FoodProvider");
  }
  return context;
};

export { FoodProvider, useFoodContext };
