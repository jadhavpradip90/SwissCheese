
const initialState = {
    userName: 'Pradip Jadhav',
    viewState: 0, /* -1 => LOGIN_FAILED, 0 => LOGIN, 1 => DASHBOARD  */
    loggedInUserData: {},
    candidatesData: [],
    selectedCandidate: {},
};

const appReducer = (state = initialState, action) => {
    console.log('Action :: ', action);
    switch (action.type) {
        case 'CHANGE_VIEW_STATE':
            return Object.assign({}, state, {viewState: action.data});

        case 'CHANGE_LOGGED_IN_USER_DATA':
            return Object.assign({}, state, {loggedInUserData:action.data});

        case 'CHANGE_CANDIDATE_DATA':
            return Object.assign({}, state, {candidatesData:action.data});

        default:
            return state
    }
}

export default appReducer