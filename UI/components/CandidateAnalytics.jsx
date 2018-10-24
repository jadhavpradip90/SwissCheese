import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'semantic-ui-react'
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts);


class CandidateAnalytics extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const { analyticsData } = this.props;
        console.log('Required Data : ', analyticsData.result);

        const happyData = [];
        for (let i = 0; i < analyticsData.result.happy.length; i++) {
            const tempObj = analyticsData.result.happy[i];
            happyData.push(tempObj.value);
        }

        const neutralData = [];
        for (let i = 0; i < analyticsData.result.neutral.length; i++) {
            const tempObj = analyticsData.result.neutral[i];
            neutralData.push(tempObj.value);
        }

        const contemptData = [];
        for (let i = 0; i < analyticsData.result.contempt.length; i++) {
            const tempObj = analyticsData.result.contempt[i];
            contemptData.push(tempObj.value);
        }

        Highcharts.chart('highChart', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Emotion at various timestamp'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: [0.25,0.5,0.75,1,1.250,1.500,1.750,2.000,2.250,2.500,2.750,3.000,3.250,3.500,3.750,4.000,4.250,4.500,4.750,5.000]
            },
            yAxis: {
                title: {
                    text: 'Value of emotions'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'HAPPY',
                data: happyData
            },
            ]
        });
        Highcharts.chart('highChart1', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Emotion at various timestamp'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: [0.25,0.5,0.75,1,1.250,1.500,1.750,2.000,2.250,2.500,2.750,3.000,3.250,3.500,3.750,4.000,4.250,4.500,4.750,5.000]
            },
            yAxis: {
                title: {
                    text: 'Value of emotions'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'NEUTRAL',
                data: neutralData
            },
            ]
        });
        Highcharts.chart('highChart2', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Emotion at various timestamp'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: [0.25,0.5,0.75,1,1.250,1.500,1.750,2.000,2.250,2.500,2.750,3.000,3.250,3.500,3.750,4.000,4.250,4.500,4.750,5.000]
            },
            yAxis: {
                title: {
                    text: 'Value of emotions'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'CONTEMPT',
                data: contemptData
            },
            ]
        });
    }


    render() {
        console.log('PR', this.props);
        const { contempt, neutral, happy  } = this.props.analyticsData.result.consolidated;
        const perCon = Math.round(contempt * 100);
        const perNeutral = Math.round(neutral * 100);
        const perhappy = Math.round(happy * 100);
        return(
            <div>
                <div className="row chart-padding" >
                    <div className="candidate-info-label">Happy :</div>
                    <div className="candidate-info-value">
                        <div id="highChart"/>
                    </div>
                </div>

                <div className="row chart-padding" >
                    <div className="candidate-info-label">Neutral :</div>
                    <div className="candidate-info-value">
                        <div id='highChart1'/>
                    </div>
                </div>

                <div className="row chart-padding" >
                    <div className="candidate-info-label">Contempt :</div>
                    <div className="candidate-info-value">
                        <div id='highChart2'/>
                    </div>
                </div>

                <div className="row">
                    <div className="candidate-info-label">Happy % :</div>
                    <div className="candidate-info-progress">
                        <Progress percent={perhappy} color='green' />
                    </div>
                </div>

                <div className="row">
                    <div className="candidate-info-label">Neutral % :</div>
                    <div className="candidate-info-progress">
                        <Progress percent={perNeutral} color='green' />
                    </div>
                </div>

                <div className="row">
                    <div className="candidate-info-label">Contempt % :</div>
                    <div className="candidate-info-progress">
                        <Progress percent={perCon} color='green' />
                    </div>
                </div>

            </div>
        );
    }
}

CandidateAnalytics.propTypes = {
    analyticsData: PropTypes.object,
};

export default CandidateAnalytics;