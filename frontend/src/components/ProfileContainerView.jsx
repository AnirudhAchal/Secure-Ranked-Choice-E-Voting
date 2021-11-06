import React, { Component } from "react";
import { Redirect } from "react-router";
import axiosInstance from "../axios";
import isAuthenticated from "./utils/authentication";
import ProfileView from "./ProfileView"

class ProfileContainerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            userHasLoaded: true,
            redirectToLogin: false,
        };
    }
  
    async componentDidMount() {
        if (!isAuthenticated()) {
            this.setState({
            redirectToLogin: true,
            });
        }

        axiosInstance
            .get('authentication/user/')
            .then((res) => {
            //console.log(res.data)
            this.setState({ user: res.data, userHasLoaded: true });
            //console.log(this.state.user)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    render() {
        const { redirectToLogin, user, userHasLoaded } = this.state; 

        if (redirectToLogin) {
            return <Redirect to="/login" />;
        }

        return (
            <ProfileView userHasLoaded={userHasLoaded} user={user} />
        );
    }
}
  
export default ProfileContainerView;