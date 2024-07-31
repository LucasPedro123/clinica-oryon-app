import { ReactNode } from "react";


export interface AuthState {
    id: string;
    email: string;
    pass: string;
}
export interface Food {
    id: number;
    name: string;
    portion: string;
    calories: number;
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

    User: any;
    setUser: (user: any) => void;

    newFood: any[];
    setNewFood: (foods: any[]) => void;
    removeFood: (foodId: string) => void;

    errorForm: string;
    setErrorForm: (error: string) => void;

    userPhoto: string | undefined;
    setUserPhoto: (photoURL: string) => void;
}

export interface IChildren {
    children: ReactNode;
}
