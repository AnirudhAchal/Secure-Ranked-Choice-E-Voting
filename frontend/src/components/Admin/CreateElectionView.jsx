import React, { Component } from "react";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import "../styles/CreateElectionView.css";
import AdminNavbarContainerView from "./AdminNavbarContainerView";

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
        <AdminNavbarContainerView />
        <div className="CreateElection">
          <form>
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
                data-mdb-filter="true"
                className="form-control"
                name="admins"
                onChange={(e) => onChangeAdmins(e.target.options)}
              >
                {users &&
                  users.map((user, index) => <option key={index}>{user.user_name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Voters</label>
              <select
                multiple
                data-mdb-filter="true"
                className="form-control"
                name="voters"
                onChange={(e) => onChangeVoters(e.target.options)}
              >
                {users &&
                  users.map((user,index) => <option key={index}>{user.user_name}</option>)}
              </select>
            </div>
            <center>
              <button
                className="btn btn-dark"
                type="submit"
                onClick={(e) => onSubmit(e)}
              >
                Submit
              </button>
            </center>
          </form>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default CreateElectionView;
