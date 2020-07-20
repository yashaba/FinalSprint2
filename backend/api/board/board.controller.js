const boardService = require('./board.service')
const logger = require('../../services/logger.service')

// async function getBoard(req, res) {
//     const board = await boardService.getById(req.params.id)
//     res.json(board)
// }

async function getBoard(req, res) {

    const board = await boardService.getById(req.params.id)
    res.json(board)
}

// async function getBoards(req, res) {
//     const boards = await boardService.query(req.query)
//     logger.debug(boards);
//     res.json(boards)
// }

async function getBoards(req, res) {
    try {
        const boards = await boardService.query(req.query)
            // console.log(req.query);
            // logger.debug(boards);
        console.log('boaaaards', boards);
        res.send(boards)

    } catch (err) {
        throw err;
    }
    // logger.debug(boards);
}

async function deleteBoard(req, res) {
    await boardService.remove(req.params.id)
    res.end()
}

async function updateBoard(req, res) {
    const board = req.body;
    await boardService.update(board)
    res.json(board)
}

async function addBoard(req, res) {
    const board = req.body;
    await boardService.add(board)
    res.json(board)
}

module.exports = {
    getBoard,
    getBoards,
    deleteBoard,
    updateBoard,
    addBoard
}