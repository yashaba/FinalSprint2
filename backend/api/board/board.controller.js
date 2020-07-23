const boardService = require('./board.service')
const logger = require('../../services/logger.service')

// async function getBoard(req, res) {
//     const board = await boardService.getById(req.params.id)
//     res.json(board)
// }

async function getBoard(req, res) {
    try {
        const board = await boardService.getById(req.params.id)
        res.json(board)
    } catch (err) {
        logger.error(`error while getting board ${req.params.id}`);
        res.status(500).send({ error: err });
    }
}

// async function getBoards(req, res) {
//     const boards = await boardService.query(req.query)
//     logger.debug(boards);
//     res.json(boards)
// }

async function getBoards(req, res) {
    try {
        console.log('req.query::::',req.query);
        const boards = await boardService.query(req.query)
        res.send(boards)
    } catch (err) {
        logger.error(`error while getting boards ${req.query}`);
        res.status(500).send({ error: err });
    }
    // logger.debug(boards);
}

async function deleteBoard(req, res) {
    try{
    await boardService.remove(req.params.id)
    res.end()
    } catch (err) {
        logger.error(`error while getting board ${req.params.id}`);
        res.status(500).send({ error: err });
    }
}

async function updateBoard(req, res) {
    try{
    const board = req.body;
    await boardService.update(board)
    console.log(board)
    res.json(board)
    } catch {
        logger.error(`error while getting board ${req.body}`);
        res.status(500).send({ error: err });
    }
}

async function addBoard(req, res) {
    try {
    const board = req.body;
    await boardService.add(board)
    res.json(board)
    } catch {
        logger.error(`error while getting board ${req.body}`);
        res.status(500).send({ error: err });
    }
}

module.exports = {
    getBoard,
    getBoards,
    deleteBoard,
    updateBoard,
    addBoard
}