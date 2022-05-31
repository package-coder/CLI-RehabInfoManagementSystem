//const baseUrl = 'http://localhost:8000'
const BASE_URL = 'https://e290-124-105-183-70.ngrok.io'
const AUTH_KEY = 'Authorization'


export function isAuthenticated(){
    return tokenPeek()
}


export async function getAuth(){
    
}

export async function login(username, password){

    const form = new FormData();
    form.append('username', username);
    form.append('password', password);


    const data = await fetchTemplate('POST', '/api/v1/auth/login/', form, false);
    localStorage.setItem('Authentication ID', data?.employee?.id)
    tokenWrite(data.token)
    return data;
}

export async function logout(){

    const res = await fetchTemplate('GET', '/api/v1/auth/logout/', null, true);
    if(res.ok)
        tokenDelete()
}

export async function fetchTemplate(method, url, form, withAuthorization){
    try{

        let parameters = {
            method: method,
            credentials: "include",
            body: form,
        }

        if(withAuthorization){
            parameters = {
                headers: new Headers({'Authorization': `Token ${tokenPeek()}`}),
                method: method,
                credentials: "include",
                body: form,
            }
        }

        const res = await fetch(`${BASE_URL}${url}`, parameters)

        if(!res.ok)
            throw res.statusText

        console.log(res)
        const data = await res.json();

        return Promise.resolve(data)
    } catch(e){
        return Promise.reject(new Error(e))
    }
}


function tokenWrite(value){
    localStorage.setItem(AUTH_KEY, value);
}

function tokenPeek(){
    return localStorage.getItem(AUTH_KEY);
}

function tokenDelete(){
    localStorage.removeItem(AUTH_KEY);
    localStorage.clear()
}