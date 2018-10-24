import { connect } from 'react-redux'
import { changeViewState, updateLoggedInUserDetails, updateCandidatesData } from '../actions/appActions'
import AppDashBoard from "../components/AppDashBoard.jsx";

const mapStateToProps = (state)  => ({
    userName: state.appReducer.userName,
    viewState: state.appReducer.viewState,
    loggedInUserData: state.appReducer.loggedInUserData,
    candidatesData: state.appReducer.candidatesData,
    selectedCandidate: state.appReducer.selectedCandidate,
})

const mapDispatchToProps = dispatch => ({
    changeViewState: newState => dispatch(changeViewState(newState)),
    updateLoggedInUserDetails : userDetails => dispatch(updateLoggedInUserDetails(userDetails)),
    updateCandidatesData : userDetails => dispatch(updateCandidatesData(userDetails)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppDashBoard)