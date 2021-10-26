import React, { Component } from "react";
import { Link } from "react-router-dom";

class DashboardView extends Component {

  renderMatches() {
    return this.state.matches.map((Election) => {
      return (
        <div className="col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <button type="button" className="btn btn-primary">View Stats</button>
            </div>
          </div>
        </div>
      );
    });
  }
  
  render() {
    const { onLogout } = this.props;
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Dashboard
          </Link>
          <button className="btn btn-light my-2 my-sm-0" onClick={onLogout}>
            Logout
          </button>
        </nav>
        <div className="container">
          <h3 className="my-2 d-flex justify-content-center">Ongoing Elections</h3>
          <hr />
          <div className="row">
            <div className="col-lg-4">
              <div className="mx-3 card">
                <div className="card-body">
                  <h5 className="card-title">Hostel 1 Mess Counsellor</h5>
                  <p className="card-text">Votes Recieved yet: 120/240</p>
                  <Link to="/ballot" className="btn btn-primary">Vote</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Sports Co-ordinator</h5>
                  <p className="card-text">Votes Recieved yet: 500/740</p>
                  <Link to="/ballot" className="btn btn-primary">Vote</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          <h3 className="my-2 d-flex justify-content-center">Upcoming Elections</h3>
          <hr />
          <div className="row">
            <div className="col-lg-4">
              <div className="mx-3 card">
                <div className="card-body">
                  <h5 className="card-title">Student Elections</h5>
                  <p className="card-text">CSE CR Elections</p>
                  <button type="button" className="btn btn-primary">Stand as a Candidate</button>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Hostel Committee</h5>
                  <p className="card-text">General Secretary Elections </p>
                  <button type="button" className="btn btn-primary">Stand as a Candidate</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          <h3 className="my-2 d-flex justify-content-center">Completed Elections</h3>
          <hr />
          <div className="row">
            <div className="col-lg-4">
              <div className="mx-3 card">
                <div className="card-body">
                  <h5 className="card-title">Communist House</h5>
                  <p className="card-text">House Committee President Elections</p>
                  <p className="card-text">Total Votes Recieved: 110/130</p>
                  <button type="button" className="btn btn-primary">Result</button>
                </div>
              </div>
            </div>
 
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardView;
