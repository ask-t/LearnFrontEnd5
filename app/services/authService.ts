
const API_URL = 'http://localhost:8080/api';

function signUP(user: any){
    return fetch(`${API_URL}/auth/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => data);
}

function login(user: any){
    return fetch(`${API_URL}/auth/sign-in`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => data);
}

function logout(){
    return fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data);
}

const authService = {
    signUP,
    login,
    logout
};

export default authService;