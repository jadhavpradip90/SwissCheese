import React from 'react';
import PropTypes from 'prop-types';
//import { axios  } from 'axios';

const axios = require('axios');

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.validateLoginDetails = this.validateLoginDetails.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
    }

    handleUserNameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    onEnterKeyPress(event) {
        if (event.key === 'Enter') {
            this.validateLoginDetails();
        }
    }

    validateLoginDetails() {
        const { username, password } = this.state;
        if (username.trim().length > 0 && password.trim().length > 0) {
            const that = this;
            axios.post('http://localhost:8080/perform_login', {
                username: that.state.username,
                password: that.state.password
            })
            .then(function (response) {
                if (response.data.result === 1) {
                    that.props.updateLoggedInUserDetails(response.data.data);
                    that.props.changeViewState(1);
                } else {
                    that.props.changeViewState(-1);
                }

            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    render() {
        const { showErrorMessage } = this.props;
        return(
            <div className="flex-container">
                <div className="login">
                    <h1 className="login-title">Login</h1>
                    { showErrorMessage &&
                    <div className="error-message">Incorrect username or password</div>
                    }
                    <input type="text"
                           className="login-input"
                           value={this.state.username}
                           placeholder="Email Address"
                           autoFocus
                           onKeyPress={this.onEnterKeyPress}
                           onChange={this.handleUserNameChange}/>
                    <input type="password"
                           className="login-input"
                           placeholder="Password"
                           onKeyPress={this.onEnterKeyPress}
                           onChange={this.handlePasswordChange}/>
                    <input type="submit"
                           value="Login"
                           className="login-button"
                           onClick={this.validateLoginDetails}></input>
                </div>
            </div>
        );
    }
}

LoginView.propTypes = {
    changeViewState: PropTypes.func,
    updateLoggedInUserDetails: PropTypes.func,
    showErrorMessage: PropTypes.bool
};


export default LoginView;