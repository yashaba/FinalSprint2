import axios from 'axios';

export const boardService = {
    query,
    remove,
    save,
    getById,
    // getEmptyBoard
}

// import axios from 'axios'


function query() {
    return axios.get(`http://localhost:3000/board`)
        .then(res =>

            {
                // console.log('DATA', res.data);
                return res.data
            })
}

// function getEmptyBoard() {
//     return {
//     }
// }

function getById(id) {
    return axios.get(`http://localhost:3000/board/${id}`)
        .then(res => res.data)
}

// function remove(taskGroupId) {
// return axios.delete(`http://localhost:3000/board/${taskGroupId}`)
// }

function remove(id) {
    return axios.delete(`http://localhost:3000/board/${id}/djaosi/djsanhdj`)
}

function save(board) {
    return (board._id) ? _update(board) : _add(board)
}

function _update(board) {
    return axios.put(`http://localhost:3000/board`, board)
        .then(res => res.data)
}

function _add(board) {
    return axios.post(`http://localhost:3000/board/`, board)
        .then(res => res.data)
}