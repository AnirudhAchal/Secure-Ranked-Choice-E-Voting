import React, { useState, useEffect } from "react";
import Elections from "./Elections";
import axiosInstance from "../../axios";

function AdminDashboardView() {
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [currentElections, setCurrentElections] = useState([]);
  const [pastElections, setPastElections] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/election/upcoming/")
      .then((res) => {
        setUpcomingElections(res.data);
      })

      axiosInstance
      .get("/election/current/")
      .then((res) => {
        setCurrentElections(res.data);
      })

      axiosInstance
      .get("/election/completed/")
      .then((res) => {
        setPastElections(res.data);
      })
    
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
