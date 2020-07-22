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

function _getUrl(id) {
    console.log('get url',);
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

function query(id) {
    return httpService.get(`board/${id}`)
}

// function query(filterBy) {
//     const { name, inStock, type, sort } = filterBy;
//     return httpService.get(_getUrl() + `?name=${name}&inStock=${inStock}&type=${type}&sort=${sort}`)
// }

function getEmptyBoard() {
    return {

    }
}

async function getById(id) {
    return httpService.get(_getUrl(id));
     
}

function remove(id) {
    return httpService.delete(_getUrl(id))
}

function save(board) {
    return (board._id) ? _update(board) : _add(board)
}

function _update(board) {
    return httpService.put(_getUrl(board._id), board);
}

function _add(board) {
    return httpService.post(_getUrl(), board)
}