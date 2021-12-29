const GlobalModel = {
    namespace: 'global',
    state: {
        globalLoading: false,
        currentUser: {}
    },
    effects: {},
    reducers: {
        setGlobalLoading(state, action) {
            return {
                ...state,
                globalLoading: action.payload
            }
        },
        setCurrentUser(state, action) {
            return {
                ...state,
                currentUser: action.payload.currentUser,
            }
        }
    },
    subscriptions: {},
};
export default GlobalModel;
