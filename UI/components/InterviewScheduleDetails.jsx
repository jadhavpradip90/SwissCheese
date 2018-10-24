import React from 'react';
import PropTypes from 'prop-types';
import CandidateInfoItem from "../components/CandidateInfoItem.jsx";
import { List, Segment } from 'semantic-ui-react'

const axios = require('axios');

class InterviewScheduleDetails extends React.Component {
    constructor(props) {
        super(props);
        this.onLoginBtnClick = this.onLoginBtnClick.bind(this);
        this.state = {
            candidateDetails: []
        }
    }

    componentDidMount() {
        const that = this;
        axios.post('http://localhost:8080/get_interview_schedule', {
            id: this.props.loggedInUserData.interviewer_id,
        })
        .then(function (response) {
            if (response.data.result === 1) {
                that.props.updateCandidatesData(response.data.data);
            } else {
                that.props.changeViewState(-1);
            }

        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onLoginBtnClick() {
        this.props.changeViewState('DASH_BOARD');
    }

    render() {
        console.log('A :: ', this.props);
        return(
            <div className="list-container">
                <div className="list-header-label">Interview Schedule</div>
                <div className="list-body">
                    <List divided inverted relaxed>
                        {this.props.candidatesData.map((item, index) =>
                            <List.Item key={index}>
                                <List.Content>
                                    <CandidateInfoItem loggedInUserData={this.props.loggedInUserData}
                                                       itemDetails={item}/>
                                </List.Content>
                            </List.Item>
                        )}
                    </List>
                </div>
            </div>
        );
    }
}

InterviewScheduleDetails.propTypes = {
    loggedInUserData: PropTypes.object,
    candidatesData: PropTypes.array,
    changeViewState: PropTypes.func,
    updateCandidatesData: PropTypes.func,
};


export default InterviewScheduleDetails;