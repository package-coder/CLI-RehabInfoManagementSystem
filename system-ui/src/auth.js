const BASE_URL = 'http://localhost:8000'
const AUTH_KEY = 'Authorization'


export function isAuthenticated(){
    return tokenPeek()
}


export async function getAuth(){
    const authId = localStorage.getItem('AUTH_ID')

    if(!authId) return ;
    return await fetchTemplate('GET', `/api/v1/manage/users/${authId}`, null, true);
}

export function getAuthId(){
    return localStorage.getItem('AUTH_ID')
}

export async function login(username, password){

    const form = new FormData();
    form.append('username', username);
    form.append('password', password);

    const data = await fetchTemplate('POST', '/api/v1/auth/login/', form, false);
    localStorage.setItem('AUTH_ID', data.user.id)

    tokenWrite(data.token)
    return data;
}

export async function logout(){

    const res = await fetchTemplate('POST', '/api/v1/auth/logout/', null, true, true);
   tokenDelete()
}

export async function fetchTemplate(method, url, form, withAuthorization, withoutData){
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


        if(withoutData)
            return Promise.resolve()


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