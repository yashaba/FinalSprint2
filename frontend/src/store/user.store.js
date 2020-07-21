export const userStore = {
    state: {
        currUser: {
            _id: "u101",
            fullName: "Orly Amdadi",
            imgUrl: "http://some-img"
        },
        // TODO - Upload to the DB
        users: [
            {
                _id: 'u101',
                fullName: 'Jhon Doe',
                imgUrl: 'http://some-img'
            },
            {
                _id: 'u102',
                fullName: 'Johny Walker',
                imgUrl: 'http://some-img'
            },
            {
                _id: 'u103',
                fullName: 'Jack Daniels',
                imgUrl: 'http://some-img'
            },
            {
                _id: 'u104',
                fullName: 'Eric Martini',
                imgUrl: 'http://some-img'
            },
            {
                _id: 'u105',
                fullName: 'Shivas Regal',
                imgUrl: 'http://some-img'
            }
        ]
    },
    getters: {
        currUser(state) {
            return state.currUser;
        },

        getUsers(state) {
            return state.users;
        },

        getUserById: (state) => (id) => {
            return state.users.find(user => user._id === id);
        }
    },
    mutations: {

    },
    actions: {

    },

}