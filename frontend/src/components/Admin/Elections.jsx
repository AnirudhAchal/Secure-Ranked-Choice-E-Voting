import React from 'react';

function Elections({election}) {
    return (
        <div className="col-lg-4">
        <div className="mx-3 card">
            <div className="card-body">
            <h5 className="card-title">{election.electionName}</h5>
            <p className="card-text">{election.electionDesc}</p>
            <button type="button" className="btn btn-primary">
                Stand as a Candidate
            </button>
            </div>
        </div>
        </div>
    )
}

export default Elections
