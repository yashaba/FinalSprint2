
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        console.log('connection');
        
        socket.on('taskUpdate', task=>{
            console.log(task, 'taskUpdate')
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket.boardId).emit('taskUpdate', task)
        })

        socket.on('boardUpdate', board=>{
            console.log(board, 'boardUpdate')
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket.boardId).emit('boardUpdate', board)
        })


        socket.on('boardJoined', boardId=>{
            console.log('joined', boardId);
            
            if (socket.boardId) {
                socket.leave(socket.boardId)
            }
            socket.join(boardId)
            socket.boardId = boardId;
        })
    })
}