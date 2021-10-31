import React, { useState, useEffect } from "react";
import Elections from "./Elections";

function AdminDashboardView() {
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [currentElections, setCurrentElections] = useState([]);
  const [pastElections, setPastElections] = useState([]);

  useEffect(() => {
    // to axios requests here to get the data about the elections
    setUpcomingElections([
      {
        electionName: "Student Elections",
        electionDesc: "CSE CR Elections",
      },
      {
        electionName: "Hostel Committee",
        electionDesc: "General Secretary Elections",
      },
    ]);

    setCurrentElections([
      {
        electionName: "Hostel 1 Mess Counsellor",
        electionDesc: "CSE CR Elections",
        votesYet: 120,
        votesTotal: 240,
      },
      {
        electionName: "Sports Co-ordinator",
        electionDesc: "General Secretary Elections",
        votesYet: 500,
        votesTotal: 740,
      },
    ]);

    setPastElections([
      {
        electionName: "Communist House",
        electionDesc: "House Committee President Elections",
        votesCast: 400,
        votesTotal: 840,
      },
    ]);
  }, []);

  return (
    <div>
      <div className="container">
        <h3 className="my-2 d-flex justify-content-center">
          Ongoing Elections
        </h3>
        <hr />
        <div className="row">
          {currentElections.map((election) => (
            <Elections election={election} />
          ))}
        </div>
      </div>
      <hr />
      <div className="container">
        <h3 className="my-2 d-flex justify-content-center">
          Upcoming Elections
        </h3>
        <hr />
        <div className="row">
          {upcomingElections.map((election) => (
            <Elections election={election} />
          ))}
        </div>
      </div>
      <hr />
      <div className="container">
        <h3 className="my-2 d-flex justify-content-center">
          Completed Elections
        </h3>
        <hr />
        <div className="row">
          {pastElections.map((election) => (
            <Elections election={election} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardView;
