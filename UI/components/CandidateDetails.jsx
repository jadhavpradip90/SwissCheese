import React from 'react';
import PropTypes from 'prop-types';
import { Rating, Form, TextArea, Label } from 'semantic-ui-react';
import CandidateAnalytics from "../components/CandidateAnalytics.jsx";

const axios = require('axios');

class CandidateDetails extends React.Component {

    constructor(props) {
        super(props);
        this.processAnalyticsData = this.processAnalyticsData.bind(this);
        this.state = {
          showAnalytics: false,
          analyticsData: {}
        };
    }

    processAnalyticsData() {
        const that = this;
        axios.post('http://localhost:8080/submit_eval', {
            id: this.props.loggedInUserData.interviewer_id,
            scores: {}
        })
        .then(function (response) {
            const analyticsData = JSON.parse(response.data.data);
            that.setState({showAnalytics: true, analyticsData: analyticsData});
            if (response.data.data.result === 1) {
                console.log(response.data.data);
                that.setState({showAnalytics: true});
            } else {
                //that.props.changeViewState(-1);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        console.log(this.state);
        const { showAnalytics, analyticsData } = this.state;
        const skills = this.props.itemDetails ? this.props.itemDetails.skills.split(",") : [];
        return(
            <div>
                <div>
                    {skills.map((m, index) => {
                        return (
                            <div key={index}>
                                <div className="row">
                                    <div className="row">
                                        <div className="candidate-info-label">
                                            {m} :
                                        </div>
                                        <div className="candidate-info-value">
                                            <Rating icon='star' defaultRating={0} maxRating={5} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="row">
                        <div className="candidate-info-label">Over all Rating :</div>
                        <div className="candidate-info-value">
                            <Rating icon='star' defaultRating={0} maxRating={5} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="candidate-info-label">Feedback:</div>
                        <div className="candidate-info-feedback">
                            <TextArea rows={4}  placeholder='Tell us more' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="candidate-info-label"/>
                        <div className="candidate-info-feedback">
                            <button className="analytics-btn" onClick={this.processAnalyticsData}>Get Analytics</button>
                        </div>
                    </div>
                    {showAnalytics &&
                    <div>
                        <CandidateAnalytics analyticsData={analyticsData}/>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

CandidateDetails.propTypes = {
    itemDetails: PropTypes.object,
    loggedInUserData: PropTypes.object,
};

export default CandidateDetails;