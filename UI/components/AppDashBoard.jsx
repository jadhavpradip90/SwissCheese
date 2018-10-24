import React from 'react';
import PropTypes from 'prop-types';
import LoginView from "../components/LoginView.jsx";
import InterviewScheduleDetails from "../components/InterviewScheduleDetails.jsx";

class AppDashBoard extends React.Component {

    constructor(props) {
        super(props);
        console.log('Constructor :: ', this.props);
    }
    render() {
        const { viewState, loggedInUserData, candidatesData } = this.props;
        let renderContent;
        if (viewState > 0) {
            renderContent = <InterviewScheduleDetails loggedInUserData={loggedInUserData}
                                                      candidatesData={candidatesData}
                                                      updateCandidatesData={this.props.updateCandidatesData}/>;
        } else {
            renderContent = <LoginView changeViewState={this.props.changeViewState}
                                       updateLoggedInUserDetails={this.props.updateLoggedInUserDetails}
                                       showErrorMessage={viewState === -1 }/>
        }
        return(
            <div className="column">
                <div className="row header-container">
                    <div className="row row-left layout-50-percentage" >
                        <span className="header-label">Smart Hire - Future of hiring</span>
                    </div>
                    { viewState > 0 &&
                    <div className="row row-right layout-50-percentage" >
                        <span className="user-name-label">Welcome, {loggedInUserData.name}</span>
                    </div>
                    }
                </div>
                <div className="column">
                    {renderContent}
                </div>
            </div>
        );
    }
}

AppDashBoard.propTypes = {
    userName: PropTypes.string,
    viewState: PropTypes.number,
    loggedInUserData: PropTypes.object,
    candidatesData: PropTypes.array,
    selectedCandidate: PropTypes.object,
    changeViewState: PropTypes.func,
    updateLoggedInUserDetails: PropTypes.func,
    updateCandidatesData: PropTypes.func,
};

export default AppDashBoard;