import getConfig from 'next/config';

import { userService } from '../services/index';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url: any) {
    const requestOptions: any = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url: any, body: any) {
    const requestOptions: any = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url: any, body: any) {
    const requestOptions: any = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: any) {
    const requestOptions: any = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url: any) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = userService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}