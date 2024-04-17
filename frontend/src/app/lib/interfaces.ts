export interface Item {
    id: number;
    name: string;
    description: string;
    quantity: number;
    category: "Laptops" | "Calculators" | "Headsets" | "Chargers" | "Mice";
}