export const stripeCheckout = async(userId, currentOrder, orderItems, methodType) => {
    //console.log(order, orderItems)
    const response = await fetch('http://localhost:4000/payments', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            currentOrder, 
            orderItems,
            methodType
        }),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(response)
    if(response.ok) {
        const data = await response.json();
        window.location.href= data.url;
    }
}

export const cors = async() => {
    const response = await fetch('http://localhost:4000/payments', {
        method: 'GET',
        credentials: 'include'
    })
    console.log(response)
} 