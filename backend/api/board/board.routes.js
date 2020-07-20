const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getBoard, getBoards, deleteBoard, updateBoard, addBoard } = require('./board.controller')
const router = express.Router()

router.get('/', getBoards);
router.get('/:id', getBoard);
router.put('/:id', updateBoard);
router.post('/', addBoard);
router.delete('/:id', deleteBoard);
router.put('/:id', requireAuth, updateBoard)
router.delete('/:id', requireAuth, requireAdmin, deleteBoard)

module.exports = router