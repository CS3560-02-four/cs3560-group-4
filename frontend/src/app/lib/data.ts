/** 
 * All function are temp using the mock api.
 * Add error handling later.
*/
'use server';
import { Item, CartItem, Account, DataResponse, Rental } from "./interfaces";
import { redirect } from "next/navigation";

export async function fetchAllItems(): Promise<DataResponse> {
    const response = await fetch('http://127.0.0.1:8000/inventory_rental/get-available-items');
    const data = await response.json();
    const items = data.map((data: any) => {
        const item: Item = {
            id: data.item_id,
            name: data.name,
            description: data.description,
            category: data.category,
            availableQuantity: data.available_quantity
        };
        return item;
    });
    return {
        data: items
    }
}

export async function fetchCartItems(accountId: number): Promise<DataResponse> {
    const response = await fetch(`http://127.0.0.1:8000/inventory_rental/get-cart-items?account_id=${accountId}`);
    const data = await response.json();
    const cartItems: Array<CartItem> = data.map((data: any) => {
        const item: CartItem = {
            id: data.cart_item_id,
            item: {
                id: data.item_id,
                name: data.name,
                description: data.description,
                category: data.category,
                availableQuantity: data.available_quantity,
            },
            quantity: data.quantity
        }
        return item;
    });
    return {
        data: cartItems
    }
}

export async function authenticateUser(username: string, password: string): Promise<DataResponse> {
    const formBody = [encodeURIComponent("username") + "=" + encodeURIComponent(username), encodeURIComponent("password") + "=" + encodeURIComponent(password)].join("&");
    const response = await fetch("http://127.0.0.1:8000/inventory_rental/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    });
    const data = await response.json();
    return {
        data: data
    }
}

export async function fetchAccountData(accountId: number): Promise<DataResponse> {
    try {
        const response = await fetch(`http://127.0.0.1:8000/inventory_rental/accountInfo?account_id=${accountId}`);
        const data = await response.json();
        const account: Account = {
            id: data[0].account_id,
            username: data[0].username,
            email: data[0].email,
            firstName: data[0].first_name,
            lastName: data[0].last_name,
            address: data[0].address,
            status: data[0].status,
            balance: data[0].balance
        }
        return {
            data: account
        }
    }
    catch (error) {
        return {
            error: "An error occured while fetching account data."
        }
    }
}

//temp
export async function updateCartItemQuantity(cartItemId: number, quantity: number) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/inventory_rental/update-cart-item-quantity?cart_item_id=${cartItemId}&new_quantity=${quantity}`);
        const status = response.status;
        if (status !== 200) {
            throw new Error();
        }
    }
    catch (error) {
        //add error handling
        redirect("/student/cart");
    }
}

//temp
export async function removeCartItem(cartItemId: number) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/inventory_rental/delete-from-cart?cart_item_id=${cartItemId}`);
        const status = response.status;
        if (status !== 200) {
            throw new Error();
        }
    }
    catch (error) {
        //add error handling
        redirect("/student/cart");
    }
}

//temp
export async function addToCart(accountId: number, itemId: number) {
        //temp
        //check if item already in cart
        const response = await fetch(`http://127.0.0.1:8000/inventory_rental/add-to-cart?account_id=${accountId}&item_id=${itemId}`);
        const status = response.status;
        if (status !== 200) {
            return {
                error: "Available item quantity exceeded."
            }
        }
}

export async function getRentals(accountId: number): Promise<DataResponse> {
    try {
        const response = await fetch(`http://127.0.0.1:8000/inventory_rental/rentalDetails?account_id=${accountId}`);
        const data = await response.json();
        const rentals: Array<Rental> = data.map((data: any) => {
            const rental: Rental = {
                id: data.rental_id,
                status: data.status,
                pickupDatetime: data.pickup_datetime,
                returnDatetime: data.return_datetime
            }
            return rental;
        }).filter((rental: Rental) => rental.status !== "canceled"); //No need to display canceled rentals
        return {
            data: rentals
        }
    }
    catch (error) {
        return {
            error: "An error occured while getting user's rentals."
        }
    }
}

export async function confirmRental(accountId: number, pickupDatetime: string, returnDatetime: string) {
    try {
        const formBody = [encodeURIComponent("pickup") + "=" + encodeURIComponent(pickupDatetime), encodeURIComponent("return") + "=" + encodeURIComponent(returnDatetime)].join("&");
        const response = await fetch(`http://127.0.0.1:8000/inventory_rental/createAppointment/?account_id=${accountId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        });
        const status = response.status;
        if (status !== 200) {
            throw new Error();
        }
    }
    catch (error) {
        redirect("/student/cart");
    }
}

export async function cancelRental(rentalId: number) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/inventory_rental/rentalCancel?rental_id=${rentalId}`);
        const status = response.status;
        if (status !== 200) {
            throw new Error();
        }
    }
    catch (error) {
        redirect("/student");
    }
}

//add getting individual rental
export async function getRental(rentalId: number): Promise<DataResponse> {
    try {
        const response = await fetch(`http://127.0.0.1:8000/inventory_rental/get-rental?rental_id=${rentalId}`);
        const data = await response.json();
        const rental: Rental = {
            id: data.rental_id,
            status: data.status,
            pickupDatetime: data.pickup_datetime,
            returnDatetime: data.return_datetime,
            itemUnits: data.items
        };
        return {
            data: rental
        }
    }
    catch (error) {
        redirect("/student/account");
    }
}

//finish this later
export async function authenticateAdmin(username: string, password: string): Promise<DataResponse> {
    const formBody = [encodeURIComponent("username") + "=" + encodeURIComponent(username), encodeURIComponent("password") + "=" + encodeURIComponent(password)].join("&");
    const response = await fetch("http://127.0.0.1:8000/inventory_rental/admin-login/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    });
    const status = response.status;
    if (status === 200) {
        const data = await response.json();
        return {
            data: data
        }
    }
    else {
        return {
            error: "Failed to authenticate administrator."
        }
    }
}

export async function fetchAllItemsAdmin(): Promise<DataResponse> {
    try {
        const response = await fetch("http://127.0.0.1:8000/inventory_rental/get-all-items-admin", {
            "cache": "no-cache"
        });
        const data = await response.json();
        const items: Array<Item> = data.map((data: any) => {
            const item: Item = {
                id: data.item_id,
                name: data.name,
                description: data.description,
                inventoryQuantity: data.total_quantity
            };
            return item;
        });
        return {
            data: items
        };
    }
    catch (error) {
        return {
            error: "An error has occured while fetching inventory items."
        }
    }
}

export async function changeInventoryQuantity(itemId: number, newQuantity: number) {
    const response = await fetch(`http://127.0.0.1:8000/inventory_rental/change-inventory-quantity/?item_id=${itemId}&new_quantity=${newQuantity}`);
    return response.status;
}

export async function createInventoryItem(name: string, description: string, category: string, quantity: string) {
    const response = await fetch(`http://127.0.0.1:8000/inventory_rental/create-new-item/?item_name=${name}&item_description=${description}&item_category=${category}&item_quantity=${quantity}`);
    return response.status;
}