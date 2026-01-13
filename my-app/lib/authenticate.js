//equire('dotenv').config();
import { jwtDecode } from 'jwt-decode';


export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ userName: user, password: password }),
    headers: {
      'content-type': 'application/json',
    },
  });

  const data = await res.json();

  console.log(`${process.env.NEXT_PUBLIC_API_URL}/login`);

  if (res.status === 200) {
    setToken(data.token);
    return true;
  } else {
    console.log(data.message);
    throw new Error(data.message);
  }
}

export function setToken(token) {
  localStorage.setItem('access_token', token);
}

export function getToken(){
    try{
        return localStorage.getItem('access_token');
    }
    catch(error){
        return null;
    }
}


export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem('access_token');
}

export function isAuthenticated(){
  const token = readToken();  
  return (token) ? true : false;
}