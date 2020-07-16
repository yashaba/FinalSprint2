import { boardService } from '../services/board-service.js';


export const boardStore = {
    state: {
        taskGroups: [],
        // filterBy: { name: '' },
        filterBy: {searchStr: ''}
    },
    getters: {
        taskGroups(state) {
            return state.taskGroups;
        },
    },
    mutations: {
        setTaskGroups(state, { taskGroups }) {
            state.taskGroups  = taskGroups ;
        },
        removeTaskGroup(state, { id }) {
            const idx = state.taskGroups .findIndex(taskGroup => taskGroup._id === id)
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
            state.filterBy = {...filterBy};
        }
    },
    actions: {
        loadtaskGroups({ commit, state }) {
            return boardService.query(state.filterBy)
                .then(taskGroups => {
                    commit({ type: 'setTaskGroups ', taskGroups })
                    return taskGroups
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
                    commit({ type, taskGroup: savedTaskGroup})
                })
        }
    },

}