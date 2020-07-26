import { boardService } from '../services/board-service.js';
import { taskGroupService } from '../services/task-group-service.js'
import SocketService from "../services/SocketService";
import { userStore } from './UserStore.js'
import { activityLogService } from '../services/activity-log-service.js'
import { eventBus } from '../services/event-bus.service.js'


export const boardStore = {
    state: {
        // taskGroups: [],
        currBoard: '',
        // filterBy: { name: '' },
        boards: [],
        showFullLabel: false
    },
    getters: {
        currBoard(state) {
            return state.currBoard;
        },
        getCurrBoardTaskGroups(state) {
            return state.currBoard.taskGroups;
        },
        getCurrBoardMembers(state) {
            return state.currBoard.members;
        },
        getLabels(state) {
            return state.currBoard.labels;
        },
        showFullLabel(state) {
            return state.showFullLabel;
        }
    },
    mutations: {
        removeMemberFromAllTasks(state, { userId }) {
            state.currBoard.taskGroups.forEach(taskGroup => {
                taskGroup.tasks.forEach(task => {
                    if (Array.isArray(task.assignedUsers)) {
                        task.assignedUsers.forEach(assignedUser => {
                            if (typeof assignedUser === 'object') {
                                if (assignedUser._id === userId) {
                                    let userIndex = task.assignedUsers.findIndex(user => user._id === userId);
                                    task.assignedUsers.splice(userIndex, 1);
                                }
                            } else {
                                if (assignedUser === userId) {
                                    let userIndex = task.assignedUsers.findIndex(user => user === userId);
                                    task.assignedUsers.splice(userIndex, 1);
                                }
                            }
                        })
                    }
                })
            })

            boardService.save(state.currBoard);
        },
        removeMemberFromTask(state, { userId, task }) {
            const taskGroupIndex = state.currBoard.taskGroups.findIndex(taskGroup => taskGroup._id === task.taskGroup);
            const taskIndex = state.currBoard.taskGroups[taskGroupIndex].tasks.findIndex(taskElement => taskElement._id === task._id);
            const memberIndex = state.currBoard.taskGroups[taskGroupIndex].tasks[taskIndex].assignedUsers.findIndex(member => {
                // Legacy Support for member as object
                if (typeof member === 'object') {
                    return member._id === userId;
                }
                return member === userId;
            });

            state.currBoard.taskGroups[taskGroupIndex].tasks[taskIndex].assignedUsers.splice(memberIndex, 1);
        },
        addMemberToTask(state, { userId, task }) {
            const taskGroupIndex = state.currBoard.taskGroups.findIndex(taskGroup => taskGroup._id === task.taskGroup);
            const taskIndex = state.currBoard.taskGroups[taskGroupIndex].tasks.findIndex(taskElement => taskElement._id === task._id);

            if (!Array.isArray(state.currBoard.taskGroups[taskGroupIndex].tasks[taskIndex].assignedUsers)) {
                state.currBoard.taskGroups[taskGroupIndex].tasks[taskIndex].assignedUsers = [];
            }

            let newUserIndex = state.currBoard.taskGroups[taskGroupIndex].tasks[taskIndex].assignedUsers.length;
            state.currBoard.taskGroups[taskGroupIndex].tasks[taskIndex].assignedUsers.splice(
                newUserIndex,
                1,
                userId
            );

            // boardService.save(state.currBoard);
        },
        removeMemberFromBoard(state, { userId }) {
            const index = state.currBoard.members.findIndex(user => user === userId);
            const taskGroups = state.currBoard.taskGroups;

            state.currBoard.members.splice(index, 1);
            // boardService.save(state.currBoard);
        },
        addMemberToBoard(state, { user }) {
            state.currBoard.members.push(user);
            // boardService.save(state.currBoard);
        },
        toggleShowFullLabel(state) {
            state.showFullLabel = !state.showFullLabel;
        },
        setBoard(state, { currBoard }) {
            state.currBoard = currBoard;
            boardService.save(state.currBoard)
        },
        saveBoards(state, { boards }) {
            state.boards = boards;
        },
        saveBoard(state, { board }) {
            // debugger
            state.currBoard = board;
            // boardService.save(state.currBoard)
            console.log('save board store', board);
        },
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
            SocketService.emit("taskUpdate", task);
        },
        addTaskGroup(state, newTaskGroup) {
            state.currBoard.taskGroups.push(newTaskGroup.newTaskGroup)
            boardService.save(state.currBoard);
        },
        // updateTaskGroups(state, { taskGroup }) {
        //     const idx = state.currBoard.taskGroups.findIndex(t => t._id === taskGroup._id)

        // },
        // setFilterBy(state, { filterBy }) {
        //     state.filterBy = {...filterBy };
        // },
        addNewChecklist(state, { checklistToSave, task }) {
            const taskGroupidx = state.currBoard.taskGroups.findIndex(taskGroupItem => taskGroupItem._id === task.taskGroup);
            const taskidx = state.currBoard.taskGroups[taskGroupidx].tasks.findIndex(taskItem => taskItem._id === task._id);
            if (!state.currBoard.taskGroups[taskGroupidx].tasks[taskidx].checkLists) state.currBoard.taskGroups[taskGroupidx].tasks[taskidx].checkLists = []

            state.currBoard.taskGroups[taskGroupidx].tasks[taskidx].checkLists.push(checklistToSave);

            eventBus.$emit("force-update", state.currBoard.taskGroups[taskGroupidx].tasks[taskidx])
            boardService.save(state.currBoard);
        },

        updateLabel(state, { id, name }) {
            let label = state.currBoard.labels.find(labelElement => labelElement._id === id);
            label.name = name;

            boardService.save(state.currBoard);
        },
        updateActivityLog(state, { activityToAdd }) {
            console.log("MUTATOR", activityToAdd);
            state.currBoard.activites.unshift(activityToAdd)

            boardService.save(state.currBoard);
            eventBus.$emit("force-update")

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
        removeMemberFromTask(context, { userId, task }) {
            context.commit('removeMemberFromTask', { userId, task });
            boardService.save(context.getters.currBoard);
        },
        addMemberToTask(context, { userId, task }) {
            context.commit('addMemberToTask', { userId, task });
            boardService.save(context.getters.currBoard);
        },
        removeMemberFromBoard(context, { userId }) {
            context.commit('removeMemberFromBoard', { userId });
            context.commit('removeMemberFromAllTasks', { userId });
            boardService.save(context.getters.currBoard);
        },
        addMemberToBoard(context, { user }) {
            context.commit('addMemberToBoard', { user });
            boardService.save(context.getters.currBoard);
        },
        toggleShowFullLabel({ commit }) {
            commit('toggleShowFullLabel');
        },
        loadBoard({ commit }, { id }) {
            return boardService.query(id)
                .then(currBoard => {
                    console.log(currBoard);

                    // currBoard.members = ['u101', 'u102', 'u103']; // Do no uncomment!! - TODO - Remove

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
            // debugger
            return boardService.save(board)
                .then((savedBoard) => {
                    console.log('Board', savedBoard);
                    // debugger
                    commit({ type: 'saveBoard', board: savedBoard })
                    SocketService.emit("boardUpdate", board);
                    return savedBoard;
                })
                // commit({ type: 'updateBoard', board })
        },
        updateActivityLog({ commit }, { activity }) {
            // debugger
            // return boardService.save(board)
            //     .then((savedBoard) => {
            // console.log('activitylog', savedBoard);
            // console.log('test', activity.txt, activity.user);
            // debugger
            console.log('action one', activity);

            let activityToAdd = activityLogService.createActivity(activity.user, activity.type, activity.task, 'placeholder', activity.txt)
            console.log("ACTION", activityToAdd);
            commit({ type: 'updateActivityLog', activityToAdd })
                // SocketService.emit("boardUpdate", board);
                // return savedBoard;
                // }
                // )
                // commit({ type: 'updateBoard', board })

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
        },
        getUserBoards({ commit }, { userId }) {
            return boardService.getUserBoards(userId)
                .then(boards => {
                    console.log(boards);
                    commit({ type: 'saveBoards', boards })
                    return boards
                })
        }
    },


}