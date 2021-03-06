const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

// async function query() {
//     try {
//         const collection = await dbService.getCollection('board')
//         console.log(' collectionnnnnn', collection);
//         return collection
//     } catch (err) {
//         console.log('ERROR: cannot find boards')
//         throw err;
//     }
// }

async function query(filterBy) {
    console.log(filterBy);

    // const criteria = _buildCriteria(filterBy)
    // console.log('criteria:',criteria);

    const collection = await dbService.getCollection('board')
    try {
        // const boards = await collection.find({ 'members._id': ""id"" `${filterBy.id}` }).toArray();
        const boards = await collection.find({ "members._id": filterBy.id }).toArray();
        // const boards = await collection.find().toArray();


        console.log(boards);
        return boards
    } catch (err) {
        console.log('ERROR: cannot find boards')
        throw err;
    }
}

async function getById(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        console.log(boardId);
        const board = await collection.findOne({ "_id": ObjectId(boardId) })
            // board.givenReviews = await reviewService.query({byboardId: ObjectId(board._id) })
            // board.givenReviews = board.givenReviews.map(review => {
            //     delete review.byboard
            //     return review
            // })
        return board
    } catch (err) {
        console.log(`ERROR: while finding board ${boardId}`)
        throw err;
    }
} // 0-9 a-f a === 10 0f03dr03

async function remove(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        await collection.deleteOne({ "_id": ObjectId(boardId) })
    } catch (err) {
        console.log(`ERROR: cannot remove board ${boardId}`)
        throw err;
    }
}

async function update(board) {
    const collection = await dbService.getCollection('board')
    let id = board._id;
    board._id = ObjectId(board._id);

    try {
        await collection.replaceOne({ "_id": board._id }, { $set: board })
        console.log('update', id);
        board._id = id;
        return board
    } catch (err) {
        console.log(`ERROR: cannot update board ${board._id}`)
        throw err;
    }
}

async function add(board) {
    const collection = await dbService.getCollection('board')
    try {
        await collection.insertOne(board);
        return board;
    } catch (err) {
        console.log(`ERROR: cannot insert board`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};

    if (filterBy.id) {
        criteria.id = {}
    }
    // if (filterBy.inStock) {
    //     criteria.inStock = filterBy.inStock
    // }

    // console.log('server criteria:',criteria)

    // if (filterBy.name) criteria.name = { $regex: new RegExp(filterBy.name, 'i') };
    // if (filterBy.type !== '') criteria.type = filterBy.type;
    // if (filterBy.inStock !== '') criteria.inStock = (filterBy.inStock + '' === 'true') ? true : false;
    // console.log('board.service criteria:', criteria)


    return criteria;
}