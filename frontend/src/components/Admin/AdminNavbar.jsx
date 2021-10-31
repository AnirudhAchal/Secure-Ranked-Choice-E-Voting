import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminDashboardView from "./AdminDashboardView";
import CandidatesRequest from "./CandidatesRequest";
import CreateElection from "./CreateElection";

function AdminNavbar({ onLogout }) {
  const [viewDashboard, setViewDashboard] = useState(true);
  const [viewCreateElection, setViewCreateElection] = useState(false);
  const [viewCandidatesRequest, setViewCandidatesRequest] = useState(false);

  const handleDashboard = () => {
    setViewDashboard(true);
    setViewCreateElection(false);
    setViewCandidatesRequest(false);
  };

  const handleElection = () => {
    setViewDashboard(false);
    setViewCreateElection(true);
    setViewCandidatesRequest(false);
  };

  const handleRequests = () => {
    setViewDashboard(false);
    setViewCreateElection(false);
    setViewCandidatesRequest(true);
  };

  if (viewDashboard) {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/admin" onClick={handleDashboard}>
            Dashboard
          </Link>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <button
                  className="btn btn-light my-2 my-sm-0"
                  onClick={handleElection}
                >
                  Create Election
                </button>
              </li>
              <li class="nav-item">
                <button
                  className="btn btn-light my-2 my-sm-0"
                  onClick={handleRequests}
                >
                  Candidates Requests
                </button>
              </li>
            </ul>
          </div>
          <button className="btn btn-light my-2 my-sm-0" onClick={onLogout}>
            Logout
          </button>
        </nav>
        <AdminDashboardView />
      </div>
    );
  }

  if (viewCreateElection) {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/admin" onClick={handleDashboard}>
            Dashboard
          </Link>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <button
                  className="btn btn-light my-2 my-sm-0"
                  onClick={handleElection}
                >
                  Create Election
                </button>
              </li>
              <li class="nav-item">
                <button
                  className="btn btn-light my-2 my-sm-0"
                  onClick={handleRequests}
                >
                  Candidates Requests
                </button>
              </li>
            </ul>
          </div>
          <button className="btn btn-light my-2 my-sm-0" onClick={onLogout}>
            Logout
          </button>
        </nav>
        <CreateElection />
      </div>
    );
  }

  if (viewCandidatesRequest) {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/admin" onClick={handleDashboard}>
            Dashboard
          </Link>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <button
                  className="btn btn-light my-2 my-sm-0"
                  onClick={handleElection}
                >
                  Create Election
                </button>
              </li>
              <li class="nav-item">
                <button
                  className="btn btn-light my-2 my-sm-0"
                  onClick={handleRequests}
                >
                  Candidates Requests
                </button>
              </li>
            </ul>
          </div>
          <button className="btn btn-light my-2 my-sm-0" onClick={onLogout}>
            Logout
          </button>
        </nav>
        <CandidatesRequest />
      </div>
    );
  }
}

export default AdminNavbar;
