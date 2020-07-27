import { utilsService } from '../services/utils-service.js'

export const activityLogService = {
    createActivity
}

function createActivity(by, type, task, content) {
    return {
        id: utilsService.makeId(),
        by: by,
        type: type,
        task: task,
        content: content,
        at: Date.now()
    }
}