
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

const login = async ({ email, password }: { email: string, password: string }) => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.success && typeof window !== 'undefined') {
            const user = JSON.stringify(data.token);
            const userid = JSON.stringify(data.userid);
            localStorage.setItem('user', JSON.parse(user));
            localStorage.setItem('userid', JSON.parse(userid));
            console.log('User logged in:', data);
            return data;
        }
    } catch (error) {
        console.error('Authentication failed:', error);
    }
    return null;
};

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
    logout,
};

export default authService;