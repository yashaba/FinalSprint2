let gBoard = {
    id: "s1001",
    createdBy: {
    },
    activites: [{ activity }, { activity }],
    members: [],
    taskGroups: [
        {
            id: "s1001",
            title: "Important",
            style: {
                bgColor: green
            },
            addedBy,
            tasks: [
                {
                    id: "a101",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                },
                {
                    id: "a102",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                },
                {
                    id: "a103",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                }],
        },
        {
            title: "Frontend",
            id: "s1002",
            color: "green",
            addedBy: {},
            tasks: [
                {
                    id: "a104",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                },
                {
                    id: "a105",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                },
                {
                    id: "a106",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                }]
        }]
}

module.exports = {
    query,
    getById,
    remove,
    save
}

function query() {
    return Promise.resolve(gBoard);
}

function getById(id) {
    const taskGroups = gBoard.taskGroups
    const group = taskGroups.find(group => group._id === id)
    if (group) return Promise.resolve(group);
    return Promise.reject('Board could not find');
}

function remove(id) {
    const taskGroups = gBoard.taskGroups
    const idx = taskGroups.findIndex(group => group._id === id)
    if (idx >= 0) taskGroups.splice(idx, 1)
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