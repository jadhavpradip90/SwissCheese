export const appActions = {
    CHANGE_VIEW_STATE : 'CHANGE_VIEW_STATE',
    CHANGE_LOGGED_IN_USER_DATA : 'CHANGE_LOGGED_IN_USER_DATA',
    CHANGE_CANDIDATE_DATA : 'CHANGE_CANDIDATE_DATA',
    CHANGE_SELECTED_CANDIDATE: 'CHANGE_SELECTED_CANDIDATE'
}

export const changeViewState = newViewState => ({
    type : 'CHANGE_VIEW_STATE',
    data : newViewState
})

export const updateLoggedInUserDetails = loogedInUser => ({
    type : 'CHANGE_LOGGED_IN_USER_DATA',
    data : loogedInUser
})

export const updateCandidatesData = data => ({
    type : 'CHANGE_CANDIDATE_DATA',
    data : data
})