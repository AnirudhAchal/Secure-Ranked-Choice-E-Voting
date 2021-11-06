import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import "../styles/CreateElectionView.css";
import electionImage from "../styles/images/election_image.jpg";

function CreateElection() {
  const [election, setElection] = useState({
    electionName: "",
    date_posted: "",
    startDatetime: "",
    endDatetime: "",
    electionDescription: "",
    admins: [],
    voters: [],
    candidates: [],
    ballotsList: [],
    winner: "",
    history: [],
  });

  const {
    electionName,
    date_posted,
    startDatetime,
    endDatetime,
    electionDescription,
    voters,
  } = election;

  const [users, setUsers] = useState([]);
  useEffect(() => {
    // will work as component did mount
    // do axios request here to get all the users of the website
    setUsers(["Ram", "Shyam", "Lekhraj", "Anirudh"]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setElection((prev) => ({ ...prev, [name]: value }));
  };

  const selectedVoters = (e) => {
    const name = e.target.name;
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    console.log(value);
    setElection((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios request here to post election data to server
    // and also redirect to admin dashboard once
    console.log(election);
  };

  return (
    <div>
      <div className="CreateElection">
        <form onSubmit={handleSubmit}>
          <Image src={electionImage} fluid />
          <div className="form-group">
            <label>Election Name</label>
            <input
              type="text"
              name="electionName"
              className="form-control"
              value={electionName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date Posted</label>
            <input
              type="date"
              className="form-control"
              name="date_posted"
              placeholder="dd-mm-yyyy"
              value={date_posted}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Start Datetime</label>
            <input
              type="datetime-local"
              className="form-control"
              name="startDatetime"
              placeholder="dd-mm-yyyy --:--"
              value={startDatetime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>End Datetime</label>
            <input
              type="datetime-local"
              className="form-control"
              name="endDatetime"
              placeholder="dd-mm-yyyy --:--"
              value={endDatetime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Voters</label>
            <select
              multiple
              className="form-control"
              name="voters"
              value={voters}
              onChange={selectedVoters}
            >
              {users && users.map((user) => <option>{user}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Election Description</label>
            <textarea
              className="form-control"
              name="electionDescription"
              placeholder="Description about the election"
              value={electionDescription}
              onChange={handleChange}
              required
            />
          </div>

          <button class="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateElection;
