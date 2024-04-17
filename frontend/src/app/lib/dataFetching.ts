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
    const responseFormatted = await response.json();
    return responseFormatted;
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
    const responseFormatted = await response.json();
    return responseFormatted;
}