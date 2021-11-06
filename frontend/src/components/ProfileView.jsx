import React, { Component } from "react";

class ProfileView extends Component {
    render() {
        const { userHasLoaded } = this.props;
        
        if (!userHasLoaded) {
            return null;
        }

        const { user } = this.props;
        // contians all user details
        console.log(user[0]);
        return (
            <div>
                <center>
                    <h1>Profile Page</h1>
                    <h2>User.email</h2>
                </center>
            </div>
        );
    }
}

export default ProfileView;