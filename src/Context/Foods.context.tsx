import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Food, FoodContextType } from '../Interfaces/app.interfaces';

const FoodContext = createContext<FoodContextType | undefined>(undefined);

const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [allFoodItems, setAllFoodItems] = useState<Food[]>([]);
    const [foodItems, setFoodItems] = useState<Food[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchFoodItems = async () => {
        try {
            const response = await axios.get('https://food-data-json-bm8g.vercel.app/api/foods');
            const foods = response.data;
            setAllFoodItems(foods);
            setFoodItems(foods);
            console.log(`Número de alimentos: ${foods.length}`);
        } catch (error) {
            console.error('Erro ao buscar alimentos: ', error);
        }
    };

    useEffect(() => {
        fetchFoodItems();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filteredFoods = allFoodItems.filter(food =>
                food.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFoodItems(filteredFoods);
        } else {
            setFoodItems(allFoodItems);
        }
    }, [searchTerm, allFoodItems]);

    return (
        <FoodContext.Provider value={{ foodItems, searchTerm, setSearchTerm, fetchFoodItems }}>
            {children}
        </FoodContext.Provider>
    );
};

const useFoodContext = () => {
    const context = useContext(FoodContext);
    if (!context) {
        throw new Error('useFoodContext must be used within a FoodProvider');
    }
    return context;
};

export { FoodProvider, useFoodContext };
