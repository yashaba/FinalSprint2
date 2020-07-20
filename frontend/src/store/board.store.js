import { boardService } from '../services/board-service.js';
import { taskGroupService } from '../services/task-group-service.js'


export const boardStore = {
    state: {
        taskGroups: [],
        currBoard: '',
        // filterBy: { name: '' },
        filterBy: { searchStr: '' },
        showFullLabel: false
    },
    getters: {
        currBoard(state) {
            return state.currBoard;
        },
        getLabels(state) {
            return state.currBoard.labels;
        },
        showFullLabel(state) {
            return state.showFullLabel;
        }
    },
    mutations: {
        toggleShowFullLabel(state) {
            state.showFullLabel = !state.showFullLabel;
        },
        setBoard(state, { currBoard }) {
            state.currBoard = currBoard;
            boardService.save(state.currBoard)
        },
        updateBoard(state, { board }) {
            state.currBoard = board;
            boardService.save(state.currBoard)
        },
        // addAttachment(state, { savedAttachment }) {
        //     state.attachments.unshift(savedAttachment)
        // },
        setTaskGroups(state, { taskGroups }) {
            state.taskGroups = taskGroups;
        },
        removeTaskGroup(state, { taskGroup }) {

            let _id = taskGroup._id

            const idx = state.currBoard.taskGroups.findIndex(taskGroupItem => taskGroupItem._id === _id)

            state.currBoard.taskGroups.splice(idx, 1);
            boardService.save(state.currBoard);
        },
        removeTask(state, { task }) {

            const idx = state.currBoard.taskGroups.findIndex(taskGroupItem => taskGroupItem._id === task.taskGroup)
            let currTaskGroup = state.currBoard.taskGroups[idx]

            const taskIdx = currTaskGroup.tasks.findIndex(taskItem => taskItem._id === task._id)
            state.currBoard.taskGroups[idx].tasks.splice(taskIdx, 1)

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
            state.filterBy = { ...filterBy };
        },
        addNewChecklist(state, { checklistToSave, task }) {
            const taskGroupidx = state.currBoard.taskGroups.findIndex(taskGroupItem => taskGroupItem._id === task.taskGroup);
            const taskidx = state.currBoard.taskGroups[taskGroupidx].tasks.findIndex(taskItem => taskItem._id === task._id);
            if (!state.currBoard.taskGroups[taskGroupidx].tasks[taskidx].checkLists) state.currBoard.taskGroups[taskGroupidx].tasks[taskidx].checkLists = []

            state.currBoard.taskGroups[taskGroupidx].tasks[taskidx].checkLists.push(checklistToSave);


            boardService.save(state.currBoard);
        },

        updateLabel(state, { id, name }) {
            let label = state.currBoard.labels.find(labelElement => labelElement._id === id);
            label.name = name;

            boardService.save(state.currBoard);
        },

        toggleLabelInTask(state, { labelId, task }) {
            let taskGroup = state.currBoard.taskGroups.find(taskGroupElement => taskGroupElement._id === task.taskGroup);
            let taskInTaskGroup = taskGroup.tasks.find(taskElement => taskElement._id === task._id);
            if (!taskInTaskGroup.labels) taskInTaskGroup.labels = [];
            let labelsInTask = taskInTaskGroup.labels;

            if (labelsInTask.includes(labelId)) {
                // Remove labelId from labels
                const labelIndex = taskInTaskGroup.labels.findIndex(element => element === labelId);
                taskInTaskGroup.labels.splice(labelIndex, 1);
            } else {
                // Add labelId to labels
                taskInTaskGroup.labels.push(labelId);
            }

            boardService.save(state.currBoard);
        }
    },
    actions: {
        toggleShowFullLabel({ commit }) {
            commit('toggleShowFullLabel');
        },
        loadBoard({ commit, state }) {
            return boardService.query()
                .then(currBoard => {
                    console.log(currBoard);

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

            commit({ type: 'addTaskGroup', newTaskGroup })
        },
        duplicateTaskGroup({ commit }, { taskGroup }) {

            var newTaskGroup = taskGroupService.duplicateTaskGroup(taskGroup)

            commit({ type: 'addTaskGroup', newTaskGroup })
        },
        removeTask({ commit }, { task }) {
            commit({ type: 'removeTask', task })
        },
        removeTaskGroup({ commit }, { taskGroup }) {

            commit({ type: 'removeTaskGroup', taskGroup })

        },
        saveTask({ commit }, { task, taskGroup }) {
            // const type = (task._id) ? 'updateTask' : 'addTask'
            const type = 'addTask'

            commit({ type, task, taskGroup })

        },
        updateTask({ commit }, { task }) {
            console.log(task);

            commit({ type: 'updateTask', task })
        },
        updateBoard({ commit }, { board }) {

            commit({ type: 'updateBoard', board })
        },
        savetaskGroup({ commit }, { taskGroup }) {
            const type = (taskGroup._id) ? 'updateTaskGroup' : 'addTaskGroup'
            return boardService.save(taskGroup)
                .then((savedTaskGroup) => {

                    commit({ type, taskGroup: savedTaskGroup })
                })
        },
        addNewChecklist({ commit }, { checklistToSave, task }) {
            commit({ type: 'addNewChecklist', checklistToSave, task })
        },

        updateLabel({ commit }, { label }) {
            console.log(label);

            commit('updateLabel', label);
        },

        toggleLabelInTask({ commit }, { labelId, task }) {
            commit('toggleLabelInTask', { labelId, task });
        }
    },

}