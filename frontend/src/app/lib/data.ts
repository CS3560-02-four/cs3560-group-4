/** 
 * All function are temp using the mock api.
 * Add error handling later.
*/

import { Item, CartItem } from "./interfaces";

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