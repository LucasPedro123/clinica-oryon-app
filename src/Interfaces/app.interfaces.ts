import { Dispatch, ReactNode, SetStateAction } from "react";


export interface AuthState {
    id: string;
    email: string;
    pass: string;
}

export interface FoodChart {
    day: string;
    y: number;
}
export interface Food {
    id: string;
    _id?: string;
    firestoreId?: string;
    name: string;
    portion: string;
    calories: number;
    date: any;
}

export interface FoodContextType {
    foodItems: Food[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    fetchFoodItems: () => void;
}


export interface IUserPros {
    UserName: string | undefined;
    setUserName: (user: string) => void;

    UserEmail: string | undefined;
    setEmail: (user: string) => void;

    userId: string | null;
    setUserId: (id: string) => void;

    UserPhone: number | undefined;
    setUserPhone: (user: number) => void;

    UserPass: string | undefined;
    setUserPass: (user: string) => void;

    User: User;
    setUser: (user: any) => void;

    
    removeFood: (foodRemove: Food) => void;

    errorForm: string;
    setErrorForm: (error: string) => void;

    userPhoto: string | undefined;
    setUserPhoto: (photoURL: string) => void;

    foods: any;
    setFoods: Dispatch<SetStateAction<any[]>>;

    fetchUserFoods: () => Promise<void>;

    totalCaloriesDay: number;
    setTotalCaloriesDay: (caloriesDayValue: number) => void;

    setNewFood: (food: any) => void;
}

export interface IChildren {
    children: ReactNode;
}

export interface Notification {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
}

export interface NotificationContextType {
    notifications: Notification[];
    loading: boolean;
}

export interface MyDocumentProps {
    data: DataPoint[];
    totalCalories: string;
}

export interface DataPoint extends Record<string, unknown> {
    day: string;
    y: number;
}
export interface CaloriesByDay {
    foods: Food[];
    totalCalories: number;
}

export interface User {
    id: string;
    userId: string,
    firestoreId: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string,
    photoURL: string,
    birthDate: any,
}