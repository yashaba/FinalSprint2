const axios = require('axios');
import httpService from './http.service';
export const boardService = {
    query,
    remove,
    save,
    getById,
    getEmptyBoard,
    getUserBoards,
    createBoard
}

// function _getUrl(id = '') {
//     const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/board' : '//localhost:3000/api/board';
//     return `${BASE_URL}/${id}`;
// }

function _getUrl(id) {
    return `board/${id}`;
}

// function _getUrl() {
//     debugger
//     return `board/`;
// }


function getUserBoards(userId) {
    return httpService.get(`board/?id=${userId}`)
}

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

function createBoard(by, bgImg, boardName) {
    let boardToAdd = {
        createdBy: by,
        backgroundImg: bgImg,
        boardName: boardName,
        activites: [],
        members: [by],
        labels: [{
            _id: "aaa",
            name: "Done",
            bgColor: "#61BD4F",
        },
        {
            _id: "bbb",
            name: "New",
            bgColor: "#F2D600",
        },
        {
            _id: "ccc",
            name: "In progress",
            bgColor: "#FF9F1A",
        },
        {
            _id: "ddd",
            name: "Error",
            bgColor: "#EB5A46",
        },
        {
            _id: "eee",
            name: "Design",
            bgColor: "#C377E0",
        },
        {
            _id: "fff",
            name: "Important",
            bgColor: "#0079BF",
        },
        {
            _id: "ggg",
            name: "Low priority",
            bgColor: "#00C2E0"
        }
        ],
        taskGroups: []
    }

    httpService.post("board/add", boardToAdd)

}

async function getById(id) {
    const res = await httpService.get(_getUrl(id))
    return res.data
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