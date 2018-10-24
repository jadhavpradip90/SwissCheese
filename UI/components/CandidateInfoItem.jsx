import React from 'react';
import PropTypes from 'prop-types';
import CandidateDetails from "../components/CandidateDetails.jsx";

class CandidateInfoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetailsForEvaluate: false,
        };
        this.onProcessCandidate = this.onProcessCandidate.bind(this);
    }

    onProcessCandidate(itemDetails) {
        const toggleValue = !this.state.showDetailsForEvaluate;
        this.setState({showDetailsForEvaluate: toggleValue, itemDetails: itemDetails});
    }

    render() {
        const { itemDetails, loggedInUserData } = this.props;
        const { showDetailsForEvaluate } = this.state;
        return(
            <div className="column">
                <div className="row candidate-info-container">
                    <div className="column column-left column-vertical-center layout-33-percentage">
                        <div className="row">
                            <div className="candidate-info-label">
                                Candidate Name :
                            </div>
                            <div className="candidate-info-value">
                                {itemDetails.name}
                            </div>
                        </div>
                        <div className="row">
                            <div className="candidate-info-label">
                                Skills :
                            </div>
                            <div className="candidate-info-value">
                                {itemDetails.skills}
                            </div>
                        </div>
                    </div>
                    <div className="row row-horizontal-center layout-33-percentage">
                        <span className="interview-time-label">{itemDetails.timestamp} hrs</span>
                    </div>
                    <div className="row row-right layout-33-percentage">
                        <button className="action-btn" onClick={this.onProcessCandidate.bind(this, itemDetails)}>Evaluate</button>
                    </div>
                </div>
                {showDetailsForEvaluate &&
                    <div className="column candidate-detail-container">
                        <CandidateDetails loggedInUserData={this.props.loggedInUserData} itemDetails={this.state.itemDetails}/>
                    </div>
                }
            </div>
        );
    }
}

CandidateInfoItem.propTypes = {
    itemDetails: PropTypes.object,
    loggedInUserData: PropTypes.object,
};


export default CandidateInfoItem;