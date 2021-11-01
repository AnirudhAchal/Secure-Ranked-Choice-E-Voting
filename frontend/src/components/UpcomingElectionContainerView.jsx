import React, { Component } from "react";
import axiosInstance from "../axios";
import isAuthenticated from "./utils/authentication";
import UpcomingElectionView from "./UpcomingElectionView";

export class UpcomingElectionContainerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          upcomingElections: [],
        };
      }
    
      async componentDidMount() {
        if (!isAuthenticated()) {
          this.setState({
            redirectToLogin: true,
          });
        }
    
        axiosInstance
          .get("/election/upcoming/")
          .then((res) => {
            this.setState({ upcomingElections: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
      }


    render() {
        const { upcomingElections } = this.state;
        return <UpcomingElectionView upcomingElections={upcomingElections} />;
    }
}

export default UpcomingElectionContainerView
