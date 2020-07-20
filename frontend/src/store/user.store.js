export const userStore = {
    state: {
        currUser: {
            _id: "u101",
            fullName: "Orly Amdadi",
            imgUrl: "http://some-img"
        },

    },
    getters: {
        currUser(state) {
            return state.currUser;
        }

    },
    mutations: {

    },
    actions: {

    },

}