import React from "react";
import { Link } from "react-router-dom";

function Elections({ election }) {
  return (
    <div className="col-lg-4">
      <div className="mx-3 card">
        <div className="card-body">
          <h5 className="card-title">{election.name}</h5>
          <p className="card-text">{election.electionDescription}</p>
          <Link
                to={`/admin/election/${election.id}`}
          >See Election Details</Link>
        </div>
      </div>
    </div>
  );
}

export default Elections;
