const axios = require('axios');
import httpService from './http.service';
export const boardService = {
    query,
    remove,
    save,
    getById,
    getEmptyBoard
}

// function _getUrl(id = '') {
//     const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/board' : '//localhost:3000/api/board';
//     return `${BASE_URL}/${id}`;
// }

function _getUrl(id = '0123456789ab0123456789ab') {
    return `board/${id}`;
}

// function _getUrl() {
//     debugger
//     return `board/`;
// }



// function query(filterBy) {
//     const { name, inStock, type, sort } = filterBy;
//     return axios.get(`${_getUrl()}?name=${name}&inStock=${inStock}&type=${type}&sort=${sort}`)
//         .then(res => res.data)
// }

function query() {
    return httpService.get(_getUrl())
}

// function query(filterBy) {
//     const { name, inStock, type, sort } = filterBy;
//     return httpService.get(_getUrl() + `?name=${name}&inStock=${inStock}&type=${type}&sort=${sort}`)
// }

function getEmptyBoard() {
    return {
       
    }
}

function getById(id) {
    return httpService.get(_getUrl(id))
        .then(res => res.data)
}

function remove(id) {
    return httpService.delete(_getUrl(id))
}

function save(board) {
    return (board._id) ? _update(board) : _add(board)
}

function _update(board) {
    return httpService.put(_getUrl(board._id), board)
        .then(res => res.data)
}

function _add(board) {
    return httpService.post(_getUrl(), board)
        .then(res => res.data)
}