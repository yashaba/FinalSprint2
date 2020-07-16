import { boardStore } from './board.store.js';
// import { userStore } from './user.store.js';

export const store = new Vuex.Store({
    modules: {
        boardStore,
        // userStore
    },
    strict: true,
})