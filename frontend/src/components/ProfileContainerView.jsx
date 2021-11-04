import React, { Component } from "react";
import { Redirect } from "react-router";
import axiosInstance from "../axios";
import isAuthenticated from "./utils/authentication";
import ProfileView from "./ProfileView"

class ProfileContainerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {username: "Average_Guy", firstname: "John", lastname: "Doe", email: "johndoe@gmail.com"},
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
  
        /*axiosInstance
            .get("authentication/user/")
            .then((res) => {
            this.setState({ user: res.data, userHasLoaded: true });
        })
        .catch((err) => {
          console.log(err);
        });*/
    }
  
    render() {
        const { redirectToLogin } = this.state; 
        const { user } = this.state;
        const { userHasLoaded } = this.state;

        if (redirectToLogin) {
            return <Redirect to="/login" />;
        }

        return (
            <ProfileView userHasLoaded={userHasLoaded} user={user} />
        );
    }
}
  
export default ProfileContainerView;