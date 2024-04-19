/** 
 * All function are temp using the mock api.
 * Add error handling later.
*/

import { Item, CartItem, Account, DataResponse } from "./interfaces";

export async function fetchAllItems() {
    const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: "SELECT * FROM item"
        })
    });
    const itemData = await response.json();

    const items = itemData.map((data: any) => {
        const item: Item = {
            id: data.item_id,
            name: data.name,
            description: data.description,
            category: data.category
        };
        return item;
    });
    return items;
}

export async function fetchItem(itemId: number) {
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
    return item;
}

export async function fetchCartItems(accountId: number) {
    const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `SELECT * FROM cart_item WHERE account_id = ${accountId}`
        })
    });
    const cartItemData = await response.json();

    const items = await Promise.all(cartItemData.map(async (data: any) => {
        const item: Item = await fetchItem(data.item_id);
        return item;
    }));

    const cartItems = cartItemData.map((data: any) => {
        const cartItem: CartItem = {
            id: data.cart_item_id,
            item: items.filter((item: Item) => item.id === data.item_id)[0],
            quantity: data.quantity,
        };
        return cartItem;
    });

    return cartItems;
}

export async function authenticateUser(username: string, password: string) {
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
    const responseData = await response.json();
    return responseData;
}

export async function fetchAccountData(accountId: number) {
    try {
        const accountResponse = await fetch("http://localhost:8000/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `SELECT * FROM account WHERE account_id = ${accountId}`
            })
        });
        const accountResponseData = await accountResponse.json();
        const account: Account = {
            id: accountResponseData[0].account_id,
            username: accountResponseData[0].username,
            email: accountResponseData[0].email,
            firstName: accountResponseData[0].first_name,
            lastName: accountResponseData[0].last_name,
            address: accountResponseData[0].address,
            status: accountResponseData[0].status,
            balance: accountResponseData[0].balance
        }
        const responseToSend: DataResponse = {
            data: account
        }
        return responseToSend;
    }
    catch (error) {
        const responseToSend: DataResponse = {
            error: "An error occured while fetching account data[0]."
        }
        return responseToSend;
    }
}

//temp
export async function updateCartItemQuantity() {
    
}