import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Food } from '../Interfaces/app.interfaces';

interface FoodsState {
    list: Food[];
}

const initialState: FoodsState = {
    list: [],
};

const foodsSlice = createSlice({
    name: 'foods',
    initialState,
    reducers: {
        setFoods: (state, action: PayloadAction<Food[]>) => {
            state.list = action.payload;
            console.log("State:  ", state.list)
        },
        addFood: (state, action: PayloadAction<Food>) => {
            state.list.push(action.payload);
        },
        removeFood: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((food : Food) => food.firestoreId !== action.payload);
        },
    },
});

export const { setFoods, addFood, removeFood } = foodsSlice.actions;
export default foodsSlice.reducer;
