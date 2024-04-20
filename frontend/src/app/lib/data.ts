/** 
 * All function are temp using the mock api.
 * Add error handling later.
*/
'use server';
import { Item, CartItem, Account, DataResponse, Rental } from "./interfaces";
import { redirect } from "next/navigation";

export async function fetchAllItems(): Promise<DataResponse> {
    const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: "SELECT * FROM item"
        })
    });
    const data = await response.json();

    const items = data.map((data: any) => {
        const item: Item = {
            id: data.item_id,
            name: data.name,
            description: data.description,
            category: data.category
        };
        return item;
    });
    return {
        data: items
    }
}

export async function fetchItem(itemId: number): Promise<DataResponse> {
    const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `SELECT * FROM item WHERE item_id = ${itemId}`
        })
    });
    const itemData = await response.json();

    const item: Item = {
        id: itemData[0].item_id,
        name: itemData[0].name,
        description: itemData[0].description,
        category: itemData[0].category
    };
    return {
        data: item
    }
}

export async function fetchCartItems(accountId: number): Promise<DataResponse> {
    const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `SELECT * FROM cart_item WHERE account_id = ${accountId}`
        }),
        cache: 'no-store'
    });
    const data = await response.json();

    const items = await Promise.all(data.map(async (data: any) => {
        const response: DataResponse = await fetchItem(data.item_id);
        return response.data;
    }));

    const cartItems = data.map((data: any) => {
        const cartItem: CartItem = {
            id: data.cart_item_id,
            item: items.filter((item: Item) => item.id === data.item_id)[0],
            quantity: data.quantity,
        };
        return cartItem;
    });

    return {
        data: cartItems
    }
}

export async function authenticateUser(username: string, password: string): Promise<DataResponse> {
    const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    const data = await response.json();
    return {
        data: data
    }
}

export async function fetchAccountData(accountId: number): Promise<DataResponse> {
    try {
        const response = await fetch("http://localhost:8000/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `SELECT * FROM account WHERE account_id = ${accountId}`
            })
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
        const response = await fetch("http://localhost:8000/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `UPDATE cart_item SET quantity = ${quantity} WHERE cart_item_id = ${cartItemId} RETURNING cart_item_id, quantity`
            })
        })
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
        const response = await fetch("http://localhost:8000/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `DELETE FROM cart_item WHERE cart_item_id = ${cartItemId} RETURNING cart_item_id`
            })
        })
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
    try {
        //temp
        //check if item already in cart
        const isInCartResponse = await fetch("http://localhost:8000/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `SELECT item_id, cart_item_id, quantity FROM cart_item WHERE item_id = ${itemId} AND account_id = ${accountId}`
            })
        })
        const responseData = await isInCartResponse.json();
        console.log(responseData);
        if (!responseData[0]) {
            const response = await fetch("http://localhost:8000/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `INSERT INTO cart_item (item_id, quantity, account_id) VALUES (${itemId}, 1, ${accountId})`
                })
            })
            const status = response.status;
            if (status !== 200) {
                throw new Error();
            }
        }
        else {
            await updateCartItemQuantity(responseData[0].cart_item_id, responseData[0].quantity + 1);
        }
    }
    catch (error) {
        //add error handling
        redirect("/student")
    }
}

export async function getRentals(accountId: number): Promise<DataResponse> {
    try {
        const response = await fetch("http://localhost:8000/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `SELECT * FROM rental WHERE account_id = ${accountId}`
            })
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
        });
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