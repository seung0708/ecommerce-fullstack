export const addToCart = async(userId, productId, quantity) => {
    console.log(userId, productId, quantity)
    const response = await fetch('http://localhost:4000/carts', {
        method: 'POST', 
        body: JSON.stringify({
            userId,
            productId, 
            quantity
        }),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    console.log(response)
    if(response.ok) {
        return result;
    }

}

export const fetchCart = async(userId) => {
    
    const response = await fetch(`http://localhost:4000/carts/${userId}`, {credentials: 'include'});
    const result = await response.json();
    //console.log(result)
    return result;
}

export const updateCartItems = async(cartItemId, updatedItems) => {
    const updatedItem = updatedItems.find(item => item.id === cartItemId)
    const response = await fetch(`http://localhost:4000/cartItems/${cartItemId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedItem),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    return result;
}

export const deleteCartItem = async(cartItemId) => {
    console.log(cartItemId)
    const response = await fetch(`http://localhost:4000/cartItems/${cartItemId}`, {
        method: 'DELETE',
        credentials: 'include'
    })
    if(response.ok) {
        console.log('Item delted succesfully');
    }
}
