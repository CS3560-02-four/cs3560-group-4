export interface Item {
    id: number;
    name: string;
    description: string;
    category: "Laptops" | "Calculators" | "Headsets" | "Chargers" | "Mice";
}

export interface CartItem {
    id: number;
    item: Item;
    quantity: number;
}

export interface Rental {
    id: number;
    status: string;
    pickupDatetime: string;
    returnDatetime: string;
    items: Array<ItemUnit> | [];
}

export interface ItemUnit {
    id: number;
    item: Item;
    status: string;
}

export interface Account {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    status: string;
    balance: number;
    cartItems: Array<CartItem> | [];
    rentals: Array<Rental> | [];
}

export interface FormState {
    message?: string;
    error?: string;
    options?: {};
}