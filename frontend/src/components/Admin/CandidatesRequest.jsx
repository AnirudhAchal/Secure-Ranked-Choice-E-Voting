import React, { useState, useEffect } from "react";

function CandidatesRequest() {
  const [requests, setRequests] = useState([]);
  const { status } = requests;

  useEffect(() => {
    // axios requests to get all the requests
    setRequests([
      {
        electionName: "ajdfja",
        userName: "fdnfkja",
        userEmail: "najkdfa",
        status: "",
      },
    ]);
  }, []);

  const handleStatus = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    // send an axios request to delete this request from requests list
    // an axios request to put this user in the candidates list of that election if the value is accept
  };
  return (
    <div>
      <h2 className="mt-5">Candidates Request</h2>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Election Name</th>
            <th scope="col">UserName</th>
            <th scope="col">UserEmail</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests &&
            requests.map((request, index) => (
              <tr key={request._id}>
                <td>{request.electionName}</td>
                <td>{request.userName}</td>
                <td>{request.userEmail}</td>
                <select
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={handleStatus}
                >
                  <option>{}</option>
                  <option>Accept</option>
                  <option>Reject</option>
                </select>
              </tr>
            ))}
          ;
          {!requests && (
            <div className="text-center">
              <h2 className="mt-5 text-center">
                No Requests are there till now
              </h2>
            </div>
          )}
          ;
        </tbody>
      </table>
    </div>
  );
}

export default CandidatesRequest;
