var gColumns = [

    {
        id: "s1001",
        columnTitle: 'test1',
        cards: [{ color: 'blue', id: 1, taskTitle: 'Test', taskContent: 'This is a test' },
            { color: 'yellow', id: 2, taskTitle: 'Test2', taskContent: 'This is a test2' },
            { color: 'red', id: 3, taskTitle: 'Test3', taskContent: 'This is a test3' },
            { color: 'purple', id: 4, taskTitle: 'Test4', taskContent: 'This is a test4' },
            { color: 'green', id: 5, taskTitle: 'Test5', taskContent: 'This is a test5' }
        ]
    },

    {
        id: "s1002",
        columnTitle: 'test2',
        cards: [{ color: 'blue', id: 6, taskTitle: 'Test', taskContent: 'This is a test' },
            { color: 'yellow', id: 7, taskTitle: 'Test7', taskContent: 'This is a test2' },
            { color: 'red', id: 8, taskTitle: 'Test8', taskContent: 'This is a test3' },
            { color: 'purple', id: 9, taskTitle: 'Test9', taskContent: 'This is a test4' },
            { color: 'green', id: 10, taskTitle: 'Test10', taskContent: 'This is a test5' }
        ]
    },

    {
        id: "s1003",
        columnTitle: 'test3',
        cards: [{ color: 'blue', id: 11, taskTitle: 'Test11', taskContent: 'This is a test11' },
            { color: 'yellow', id: 12, taskTitle: 'Test12', taskContent: 'This is a test12' },
            { color: 'red', id: 13, taskTitle: 'Test13', taskContent: 'This is a test13' },
            { color: 'purple', id: 14, taskTitle: 'Test14', taskContent: 'This is a test14' },
            { color: 'green', id: 15, taskTitle: 'Test15', taskContent: 'This is a test15' }
        ]
    }
]




function getColumns() {
    return gColumns
}

export const boardService = {
    getColumns
}