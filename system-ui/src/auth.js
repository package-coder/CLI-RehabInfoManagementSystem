const baseUrl = 'http://localhost:8000'
const tokenKey = 'Authorization'


export function isAuthenticated(){
    return tokenPeek()
}

export async function login(username, password){

    const form = new FormData();
    form.append('username', username);
    form.append('password',password);

    const data = await fetchTemplate('POST', '/api/v1/auth/login/', form, false);
    tokenWrite(data.token)
    return data;
}

export async function logout(){

    return await fetchTemplate('GET', '/api/auth/logout/');

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

        const res = await fetch(`${baseUrl}${url}`, parameters)

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
    localStorage.setItem(tokenKey, value);
}

function tokenPeek(){
    return localStorage.getItem(tokenKey);
}