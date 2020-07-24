// import { make } from "core-js/fn/object";

function makeNewTaskGroup(title) {
    return {
        _id: makeId(),
        title: title,
        style: {
            bgColor: "green"
        },
        addedBy: "",
        tasks: []
    }

}

// function getTaskGroupTitle(id) {
//     console.log('task GROP', this.$store.getters.currBoard);
//     // let taskGroup = this.$store.getters.currBoard.taskGroups.find(taskGroupItem => taskGroupItem._id === id)
//     // return taskGroup.title
//     return id

// }

function makeId(length = 10) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function duplicateTaskGroup(taskGroup) {
    var newTaskGroup = JSON.parse(JSON.stringify(taskGroup))
    newTaskGroup._id = makeId()
    newTaskGroup.tasks.forEach((task) => {
        task._id = makeId()
        task.taskGroup = newTaskGroup._id
    })
    return newTaskGroup
}

export const taskGroupService = {
    makeNewTaskGroup,
    duplicateTaskGroup,
    makeId,
    // getTaskGroupTitle
}