import { utilsService } from '../services/utils-service.js'

export const activityLogService = {
    createActivity
}

function createActivity(by, type, task, taskGroup, content) {
    return {
        id: utilsService.makeId(),
        by: by,
        type: type,
        task: task,
        taskGroup: taskGroup,
        content: content,
        at: Date.now()
    }
}