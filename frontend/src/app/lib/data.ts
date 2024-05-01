'use server';
import { Item, CartItem, Account, DataResponse, Rental, ItemUnit, AdminRental } from "./interfaces";
import { redirect } from "next/navigation";
import { formatDatetime } from "./utils";

export async function fetchAllItems(): Promise<DataResponse> {
    const response = await fetch('http://127.0.0.1:8000/inventory_rental/get-available-items', {
        "cache": "no-store"
    });
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
    const response = await fetch(`http://127.0.0.1:8000/inventory_rental/get-cart-items?account_id=${accountId}`, {
        "cache": "no-store"
    });
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
    const status = response.status;
    if (status !== 200) {
        return {
            data: "Error occured"
        };
    }
    else {
        const data = await response.json();
        return {
            data: data
        };
    }

}

export async function fetchAccountData(accountId: number): Promise<DataResponse> {
    try {
        const response = await fetch(`http://127.0.0.1:8000/inventory_rental/accountInfo?account_id=${accountId}`, {
            "cache": "no-cache"
        });
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
        const response = await fetch(`http://127.0.0.1:8000/inventory_rental/rentalDetails?account_id=${accountId}`, {
            "cache": "no-store"
        });
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

export async function getRental(rentalId: number): Promise<DataResponse> {
    try {
        const response = await fetch(`http://127.0.0.1:8000/inventory_rental/get-rental?rental_id=${rentalId}`, {
            "cache": "no-store"
        });
        const data = await response.json();
        const rental: Rental = {
            id: data.rental_id,
            status: data.status,
            pickupDatetime: data.pickup_datetime,
            returnDatetime: data.return_datetime,
            itemUnits: data.items.map((item: any) => {
                const itemUnit: ItemUnit = {
                    id: item.item_unit_id,
                    status: item.status,
                    name: item.name,
                    description: item.description,
                    category: item.category
                };
                return itemUnit;
            })
        };
        console.log(rental);
        return {
            data: rental
        }
    }
    catch (error) {
        redirect("/student/account");
    }
}

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
            "cache": "no-store"
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

export async function fetchItemUnits(itemId: string): Promise<DataResponse> {
    try {
        const response = await fetch(`http://127.0.0.1:8000/inventory_rental/get-item-units/?item_id=${itemId}`, {
            "cache": "no-store"
        });
        const data = await response.json();
        const item: Item = {
            id: data.item_id,
            name: data.name,
            description: data.description,
            category: data.category,
        };
        const itemUnits: Array<ItemUnit> = data.items_units.map((unit: any) => {
            const itemUnit: ItemUnit = {
                id: unit.item_unit_id,
                rentalId: unit.rental_id,
                status: unit.status
            };
            return itemUnit;
        });
        return {
            data: [item, itemUnits]
        };
    }
    catch (error) {
        return {
            error: "An error occured while fetching item units."
        };
    }
}

export async function fetchAllRentals(): Promise<DataResponse> {
    try {
        const response = await fetch("http://127.0.0.1:8000/inventory_rental/get-all-rentals", {
            "cache": "no-store"
        });
        const data = await response.json();
        const rentals: Array<AdminRental> = data.map((data: any) => {
            const rental: AdminRental = {
                id: data.rental_id,
                status: data.status,
                pickupDatetime: formatDatetime(data.pickup_datetime),
                returnDatetime: formatDatetime(data.return_datetime),
                accountId: data.account_id,
                accountName: data.first_name + " " + data.last_name,
                itemUnits: data.items.map((item: any) => {
                    const itemUnit: ItemUnit = {
                        id: item.item_unit_id,
                        status: item.status,
                        name: item.item_name
                    };
                    return itemUnit;
                })
            };
            return rental;
        });
        return {
            data: rentals
        };
    }
    catch (error) {
        return {
            error: "An error occured while fetching rental data."
        };
    }
}

export async function confirmRentalPickup(rentalId: number) {
    try {
        await fetch(`http://127.0.0.1:8000/inventory_rental/confirm-pickup/?rental_id=${rentalId}`);
    }   
    catch (error) {
        return {
            error: "An error occured while confirming rental pickup"
        };
    }
}

export async function confirmRentalReturn(rentalId: number) {
    try {
        await fetch(`http://127.0.0.1:8000/inventory_rental/confirm-return/?rental_id=${rentalId}`);
    }   
    catch (error) {
        return {
            error: "An error occured while confirming rental return"
        };
    }
}

export async function markItemDamaged(itemUnitId: number) {
    try {
        await fetch(`http://127.0.0.1:8000/inventory_rental/change-item-status/?item_unit_id=${itemUnitId}`);
    }
    catch (error) {
        return {
            error: "An error occured while marking item as damaged"
        };
    }
}

export async function markItemNotDamaged(itemUnitId: number) {
    try {
        await fetch(`http://127.0.0.1:8000/inventory_rental/change-item-status/?item_unit_id=${itemUnitId}`);
    }
    catch (error) {
        return {
            error: "An error occured while marking item as not damaged"
        };
    }
}

export async function changeAccountStatus(accountId: number, status: string) {
    try {
        await fetch(`http://127.0.0.1:8000/inventory_rental/change-account-status/?account_id=${accountId}&status=${status}`);
    }
    catch (error) {
        return {
            error: "An error ocured while putting account on hold"
        };
    }
}

export async function updateBalance(accountId: string, newBalance: string) {
    try {
        await fetch(`http://127.0.0.1:8000/inventory_rental/update-balance/?account_id=${accountId}&new_balance=${newBalance}`); 
    }
    catch (error) {
        return {
            error: "An error occured while updating account balance"
        }
    }
}

export async function fetchAllAccounts(): Promise<DataResponse> {
    try {
        const response = await fetch("http://127.0.0.1:8000/inventory_rental/get-all-student-accounts/", {
            "cache": "no-store"
        });
        const data = await response.json();
        const accounts: Array<Account> = data.map((data: any) => {
            const account: Account = {
                username: "", // no username needed here
                id: data.account_id,
                email: data.email,
                firstName: data.first_name,
                lastName: data.last_name,
                address: data.address,
                status: data.status,
                balance: data.balance
            };
            return account;
        });
        return {
            data: accounts
        };
    }
    catch (error) {
        return {
            error: "An error occured while fetching account data."
        };
    }
}