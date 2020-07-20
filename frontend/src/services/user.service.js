import HttpService from './http.service'

export const userService = {
    login,
    logout,
    signup,
    query,
    getById,
    remove,
    update
}

function getById(userId) {
    return HttpService.get(`user/${userId}`)
}

function remove(userId) {
    return HttpService.delete(`user/${userId}`)
}

function update(user) {
    return HttpService.put(`user/${user._id}`, user)
}

async function login(userCred) {
    const user = await HttpService.post('auth/login', userCred)
    return _handleLogin(user)
}
async function signup(userCred) {
    const user = await HttpService.post('auth/signup', userCred)
    return _handleLogin(user)
}
async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}

function query() {
    return HttpService.get('user')
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}








// const axios = require('axios');
// export const userService = {
//     query,
//     remove,
//     save,
//     getById,
// }

// function _getUrl(id = '') {
//     const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/user' : '//localhost:3000/api/user';
//     return `${BASE_URL}/${id}`;
// }

// function query() {
//     return axios.get(_getUrl())
//         .then(res => res.data)
// }

// function getById(id) {
//     return axios.get(_getUrl(id))
//         .then(res => res.data)
// }

// function remove(id) {
//     return axios.delete(_getUrl(id))
// }

// function save(user) {
//     return (user._id) ? _update(user) : _add(user)
// }

// function _update(user) {
//     return axios.put(_getUrl(), user)
//         .then(res => res.data)
// }

// function _add(user) {
//     return axios.post(_getUrl(id), user)
//         .then(res => res.data)
// }