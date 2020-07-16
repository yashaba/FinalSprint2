
module.exports = {
    query,
    getById,
    remove,
    save
}

function query() {
    return Promise.resolve(gBoards);
}

function getById(id) {
    const board = gBoards.find(gBoard => gBoard._id === id)
    if(board) return Promise.resolve(gBoard);
    return Promise.reject('Board could not find');
}

function remove(id) {
    const idx = gBoards.findIndex(gBoard => gBoard._id === id)
    if (idx >= 0) gBoards.splice(idx, 1)
    return Promise.resolve();
}

function save(board) {
    if (board._id) {
        const idx = gBoards.findIndex(currBoard => currBoard._id === board._id)
        gBoards.splice(idx, 1, board)
    } else {
        board._id = _makeId()
        gBoards.unshift(board)
    }
    return Promise.resolve();
}


// function _saveBoardsToFile() {
//     fs.writeFileSync('data/gBoard.json', JSON.stringify(gBoards, null, 2));
// }

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}