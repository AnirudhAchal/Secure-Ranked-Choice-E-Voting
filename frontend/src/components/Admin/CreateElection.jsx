import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import "../styles/Register.css";
import electionImage from "../styles/images/election_image.jpg";
import { NotificationManager } from "react-notifications";
import axiosInstance from "../../axios";

function CreateElection() {
  const [election, setElection] = useState({
    name: "",
    date_posted: "",
    start_date: "",
    end_date: "",
    admins: [],
    voters: [],
    candidates: [],
    voted_voters: [],
    winner: "",
    election_details: {electionDescription: ""},
  });




  const {
    name,
    date_posted,
    start_date,
    end_date,
    admins,
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

  const selectedPeople = (e) => {
    const name = e.target.name;
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    console.log(value);
    setElection((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("election/createElection/", {
        name: name,
        date_posted: date_posted,
        start_date: start_date,
        end_date: end_date,
        voters: voters,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(
          err.response.data.detail,
          "Election Createion Failed",
          5000
        );
      });
    console.log(election);
  };

  return (
    <div>
      <div className="Register">
        <form onSubmit={handleSubmit}>
          <Image src={electionImage} fluid />
          <div className="form-group">
            <label>Election Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date Posted</label>
            <input
              type="datetime-local"
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
              name="start_date"
              placeholder="dd-mm-yyyy --:--"
              value={start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>End Datetime</label>
            <input
              type="datetime-local"
              className="form-control"
              name="end_date"
              placeholder="dd-mm-yyyy --:--"
              value={end_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Admins</label>
            <select
              multiple
              className="form-control"
              name="admins"
              value={admins}
              onChange={selectedPeople}
            >
              {users && users.map((user) => <option>{user}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Select Voters</label>
            <select
              multiple
              className="form-control"
              name="voters"
              value={voters}
              onChange={selectedPeople}
            >
              {users && users.map((user) => <option>{user}</option>)}
            </select>
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
