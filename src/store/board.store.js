import { boardService } from '../services/board-service.js';
import { taskGroupService } from '../services/task-group-service.js'


export const boardStore = {
    state: {
        taskGroups: [],
        currBoard: '',
        // filterBy: { name: '' },
        filterBy: { searchStr: '' }
    },
    getters: {
        currBoard(state) {
            return state.currBoard;
        },
    },
    mutations: {
        setBoard(state, { currBoard }) {
            state.currBoard = currBoard;
            boardService.save(state.currBoard)
        },
        updateBoard(state, { board }) {
            state.currBoard = board;
            boardService.save(state.currBoard)
        },
        setTaskGroups(state, { taskGroups }) {
            state.taskGroups = taskGroups;
        },
        removeTaskGroup(state, { taskGroup }) {
            console.log(taskGroup._id);
            let _id = taskGroup._id
            console.log('iddd', _id);
            const idx = state.currBoard.taskGroups.findIndex(taskGroupItem => taskGroupItem._id === _id)
            console.log(idx);
            state.currBoard.taskGroups.splice(idx, 1);
            boardService.save(state.currBoard);
        },
        removeTask(state, { task }) {
            console.log('mutator', task, task.taskGroup, task._id);
            const idx = state.currBoard.taskGroups.findIndex(taskGroupItem => taskGroupItem._id === task.taskGroup)
            let currTaskGroup = state.currBoard.taskGroups[idx]
            console.log('curr task group', currTaskGroup);
            const taskIdx = currTaskGroup.tasks.findIndex(taskItem => taskItem._id === task._id)
            state.currBoard.taskGroups[idx].tasks.splice(taskIdx, 1)
            console.log('state', state);
            boardService.save(state.currBoard)

        },
        addTask(state, { task, taskGroup }) {
            const idx = state.currBoard.taskGroups.findIndex(taskGroupItem => taskGroupItem._id === taskGroup._id);
            // let currTaskGroup = state.currBoard.taskGroups[idx];
            state.currBoard.taskGroups[idx].tasks.unshift(task);
            boardService.save(state.currBoard);
        },
        updateTask(state, { task }) {
            const idx = state.currBoard.taskGroups.findIndex(taskGroupItem => taskGroupItem._id === task.taskGroup);
            let currTaskGroup = state.currBoard.taskGroups[idx];
            const taskIdx = currTaskGroup.tasks.findIndex(taskItem => taskItem._id === task._id);
            state.currBoard.taskGroups[idx].tasks.splice(taskIdx, 1, task);
            boardService.save(state.currBoard);
        },
        addTaskGroup(state, newTaskGroup) {
            state.currBoard.taskGroups.push(newTaskGroup.newTaskGroup)
            boardService.save(state.currBoard);
        },
        updateTaskGroups(state, { taskGroup }) {
            const idx = state.currBoard.taskGroups.findIndex(t => t._id === taskGroup._id)

        },
        setFilterBy(state, { filterBy }) {
            state.filterBy = {...filterBy };
        },
        addNewChecklist(state, {checklistToSave, task }) {
            const taskGroupidx = state.currBoard.taskGroups.findIndex(taskGroupItem => taskGroupItem._id === task.taskGroup);
            const taskidx = state.currBoard.taskGroups[taskGroupidx].tasks.findIndex(taskItem => taskItem._id === task._id);
            state.currBoard.taskGroups[taskGroupidx].tasks[taskidx].checklists.push(checklistToSave);
            boardService.save(state.currBoard);
        }
    },
    actions: {
        loadBoard({ commit, state }) {
            return boardService.query()
                .then(currBoard => {
                    commit({ type: 'setBoard', currBoard })
                    return currBoard
                })
        },
        removeTaskGroup({ commit }, { id }) {
            return boardService.remove(id)
                .then(() => {
                    commit({ type: 'removeTaskGroup', id })
                })
        },
        addTaskGroup({ commit }, { title }) {
            var newTaskGroup = taskGroupService.makeNewTaskGroup(title)
            console.log('actions', newTaskGroup);
            commit({ type: 'addTaskGroup', newTaskGroup })
        },
        duplicateTaskGroup({ commit }, { taskGroup }) {
            console.log('starting task group', taskGroup);
            var newTaskGroup = taskGroupService.duplicateTaskGroup(taskGroup)
            console.log('post func task group', newTaskGroup);
            console.log('actions', newTaskGroup);
            commit({ type: 'addTaskGroup', newTaskGroup })
        },
        removeTask({ commit }, { task }) {
            // console.log('task inside action', task.task);

            commit({ type: 'removeTask', task })

        },
        removeTaskGroup({ commit }, { taskGroup }) {
            // console.log('task inside action', task.task);
            console.log('father triggr');
            commit({ type: 'removeTaskGroup', taskGroup })

        },
        saveTask({ commit }, { task, taskGroup }) {
            // const type = (task._id) ? 'updateTask' : 'addTask'
            const type = 'addTask'
            console.log(type);
            commit({ type, task, taskGroup })

        },
        updateTask({ commit }, { task, taskGroup }) {

            commit({ type: 'updateTask', task, taskGroup })
        },
        updateBoard({ commit }, { board }) {
            console.log('board', board);
            commit({ type: 'updateBoard', board })
        },
        savetaskGroup({ commit }, { taskGroup }) {
            const type = (taskGroup._id) ? 'updateTaskGroup' : 'addTaskGroup'
            return boardService.save(taskGroup)
                .then((savedTaskGroup) => {
                    console.log('SAVED', savedTaskGroup);
                    commit({ type, taskGroup: savedTaskGroup })
                })
        },
        addNewChecklist({commit}, {checklistToSave, task}) {
            commit({ type: 'addNewChecklist', checklistToSave, task })
        }
    },

}