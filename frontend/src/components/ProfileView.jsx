import React, { Component } from "react";

class ProfileView extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <center>
                    <h1>Profile Page</h1>
                    <h2>{user.username}</h2>
                    <h2>{user.firstname}</h2>
                    <h2>{user.lastname}</h2>
                    <h2>{user.email}</h2>
                </center>
            </div>
        );
    }
}

export default ProfileView;