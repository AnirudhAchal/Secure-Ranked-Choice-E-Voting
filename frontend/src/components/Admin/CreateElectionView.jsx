import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import NavbarContainerView from "../Dashboard/NavbarContainerView";
import "../styles/CreateElectionView.css";
import electionImage from "../styles/images/election_image.jpg";

class CreateElectionView extends Component {
  render() {
    const {
      users,
      electionName,
      startDate,
      endDate,
      onSubmit,
      onChangeElectionName,
      onChangeStartDate,
      onChangeEndDate,
      onChangeAdmins,
      onChangeVoters,
    } = this.props;

    return (
      <div>
        <NavbarContainerView />
        <div className="CreateElection">
          <form>
            <center>
              <Image src={electionImage} fluid />
            </center>
            <h3
              className="text-center"
              style={{ paddingTop: "60px", paddingBottom: "30px" }}
            >
              Create a new election
            </h3>
            <div className="form-group">
              <label>Election Name</label>
              <input
                type="text"
                name="electionName"
                className="form-control"
                value={electionName}
                onChange={(e) => onChangeElectionName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="startDate"
                value={startDate}
                onChange={(e) => onChangeStartDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="endDate"
                value={endDate}
                onChange={(e) => onChangeEndDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Admins</label>
              <select
                multiple
                className="form-control"
                name="admins"
                onChange={(e) => onChangeAdmins(e.target.options)}
              >
                {users &&
                  users.map((user) => <option>{user.user_name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Voters</label>
              <select
                multiple
                className="form-control"
                name="voters"
                onChange={(e) => onChangeVoters(e.target.options)}
              >
                {users &&
                  users.map((user) => <option>{user.user_name}</option>)}
              </select>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={(e) => onSubmit(e)}
            >
              Submit
            </button>
          </form>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default CreateElectionView;
