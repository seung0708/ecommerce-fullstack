export const createOrder = async (userId, cartId) => {
    console.log(userId, cartId)
    const response = await fetch('http://localhost:4000/orders', {
        method: 'POST',
        body: JSON.stringify({
            userId, 
            cartId
        }), 
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    const result = await response.json();
    console.log(result)
    return result;
}