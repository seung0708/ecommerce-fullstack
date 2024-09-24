export const registerUser = async(firstName, lastName, email, password, role) => {
    console.log(firstName, lastName, email, password)
    try {
        const response = await fetch('http://localhost:4000/auth/register', {
            method: 'POST', 
            body: JSON.stringify({
                firstName, 
                lastName, 
                email, 
                password,
                role
            }), 
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const result = await response.json();
        return result
    } catch(error) {
        console.error(error);
    }
}

export const loginUser = async(email, password) => {
    try {
        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        //console.log(response)
        if(response.ok) return result; 
    } catch(error) {
        console.error('Error fetching user', error)
    }
}

export const logoutUser = async() => {
    await fetch('http://localhost:4000/auth/logout', {
        method: 'POST',
        credentials: 'include'
    })
}