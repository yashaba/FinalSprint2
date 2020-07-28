import { userService } from '../services/user.service.js'

var localLoggedinUser = null;
localLoggedinUser = (sessionStorage.user) ? localLoggedinUser = JSON.parse(sessionStorage.user) : {
    _id: "5f19b12f643d505854ff0d15",
    userName: "guest@tt.com",
    fullName: "Guesty",
    imgUrl: "http://some-img"
}
export const userStore = {
    state: {
        loggedinUser: localLoggedinUser,
        users: []
    },
    getters: {
        users(state) {
            // debugger
            return state.users;
        },
        loggedinUser(state) {
            return state.loggedinUser
        },
        getUserById: (state) => (id) => {
            return state.users.find(user => user._id === id);
        },
        getUserFullnameById: (state, getters) => (id) => {
            return getters.getUserById(id).fullName;
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedinUser = user;
        },
        setUsers(state, { users }) {
            // debugger
            state.users = users;
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
    },
    actions: {
        async login(context, { userCred }) {
            const user = await userService.login(userCred);
            if (user) {

                context.commit({ type: 'setUser', user })
            }
            console.log(user);
            return user;
        },
        async signup(context, { userCred }) {
            const user = await userService.signup(userCred)
            context.commit({ type: 'setUser', user })
            return user;

        },
        async logout(context) {
            await userService.logout()
            context.commit({ type: 'setUsers', users: [] })
            context.commit({ type: 'setUser', user: null })
        },
        async loadUsers(context) {
            const users = await userService.query();
            context.commit({ type: 'setUsers', users })
        },
        async removeUser(context, { userId }) {
            await userService.remove(userId);
            context.commit({ type: 'removeUser', userId })
        },
        async updateUser(context, { user }) {
            user = await userService.update(user);
            context.commit({ type: 'setUser', user })
        }
    }
}