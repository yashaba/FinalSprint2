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
        addTaskGroup(state, { taskGroup }) {
            state.taskGroups.push(taskGroup)
        },
        updateTaskGroups(state, { taskGroup }) {
            const idx = state.taskGroups.findIndex(t => t._id === taskGroup._id)
            state.taskGroups.splice(idx, 1, taskGroup)
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
        removetaskGroup({ commit }, { id }) {
            return boardService.remove(id)
                .then(() => {
                    commit({ type: 'removeTaskGroup', id })
                })
        },
        savetaskGroup({ commit }, { taskGroup }) {
            const type = (taskGroup._id) ? 'updateTaskGroup' : 'addTaskGroup'
            return boardService.save(taskGroup)
                .then((savedTaskGroup) => {
                    console.log('SAVED', savedTaskGroup);
                    commit({ type, taskGroup: savedTaskGroup })
                })
        }
    },

}