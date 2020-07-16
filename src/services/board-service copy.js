let gBoard = {
    id: "s1001",
    createdBy: {},
    activites: ["{ activity }", "{ activity }"],
    members: [],
    taskGroups: [{
            id: "s1001",
            title: "Important",
            style: {
                bgColor: "green"
            },
            addedBy: '',
            tasks: [{
                    id: "a101",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                    bgColor: 'green',
                    title: 'Add Crudle'
                },
                {
                    id: "a102",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                    bgColor: 'red',
                    title: 'Add Background img'
                },
                {
                    id: "a103",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                    bgColor: 'purple',
                    title: 'Animation'
                }
            ],
        },
        {
            title: "Frontend",
            id: "s1002",
            color: "green",
            addedBy: '{}',
            tasks: [{
                    id: "a104",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                    bgColor: 'yellow',
                    title: 'Interpolation'
                },
                {
                    id: "a105",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                    bgColor: 'red',
                    title: 'Design'
                },
                {
                    id: "a106",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                    bgColor: 'pink',
                    title: 'Redesign'
                }
            ]
        },
        {
            title: "Black",
            id: "s1003",
            color: "green",
            addedBy: '{}',
            tasks: [{
                    id: "a104",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                    bgColor: 'yellow',
                    title: 'Interpolation'
                },
                {
                    id: "a105",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                    bgColor: 'red',
                    title: 'Design'
                },
                {
                    id: "a106",
                    by: "minimaluser",
                    type: "DELETE_TASK",
                    task: 'minimalTask',
                    taskGroup: 'minimalGroup',
                    at: 112223,
                    bgColor: 'pink',
                    title: 'Redesign'
                }
            ]
        }
    ]
}

module.exports = {
    query,
    getById,
    remove,
    save
}

function query() {
    return gBoard;
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

function save(taskGroup) {
    if (taskGroup._id) {
        const idx = gBoard.taskGroups.findIndex(currTaskGroup => currTaskGroup._id === taskGroup._id)
        gBoard.taskGroups.splice(idx, 1, taskGroup)
    } else {
        taskGroup._id = _makeId()
        gBoard.taskGroups.unshift(taskGroup)
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