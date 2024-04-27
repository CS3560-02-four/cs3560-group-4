export interface Item {
    id: number;
    name: string;
    description: string;
    category: "Laptops" | "Calculators" | "Headsets" | "Chargers" | "Mice";
    availableQuantity: number;
    image?: any;
    inventoryQuantity?: number;
}

export interface CartItem {
    id: number;
    item: Item;
    quantity: number;
}

export interface Rental {
    id: number;
    status: "reserved" | "active" | "complete" | "canceled";
    pickupDatetime: string;
    returnDatetime: string;
    itemUnits?: Array<ItemUnit>;
}

export interface ItemUnit {
    id: number;
    name?: string;
    description?: string;
    category?: string;
    rentalId?: number;
    status: "normal" | "damaged";
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
}

export interface FormState {
    message?: string;
    error?: string;
    options?: any;
}

export interface DataResponse {
    data?: any;
    error?: string;
}