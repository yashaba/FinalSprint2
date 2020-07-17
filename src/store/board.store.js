import { boardService } from '../services/board-service.js';


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
        },
        setTaskGroups(state, { taskGroups }) {
            state.taskGroups = taskGroups;
        },
        removeTaskGroup(state, { id }) {
            const idx = state.taskGroups.findIndex(taskGroup => taskGroup._id === id)
            state.taskGroups.splice(idx, 1);
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
        addTaskGroup(state, { taskGroup }) {
            state.taskGroups.push(taskGroup)
        },
        updateTaskGroups(state, { taskGroup }) {
            const idx = state.currBoard.taskGroups.findIndex(t => t._id === taskGroup._id)

        },
        setFilterBy(state, { filterBy }) {
            state.filterBy = {...filterBy };
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
        removeTask({ commit }, { task }) {
            // console.log('task inside action', task.task);

            commit({ type: 'removeTask', task })

        },
        savetaskGroup({ commit }, { taskGroup }) {
            const type = (taskGroup._id) ? 'updateTaskGroup' : 'addTaskGroup'
            return boardService.save(taskGroup)
                .then((savedTaskGroup) => {
                    console.log('SAVED', savedTaskGroup);
                    commit({ type, taskGroup: savedTaskGroup })
                })
        },
    },

}