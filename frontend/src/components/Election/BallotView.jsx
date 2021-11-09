import React, { Component } from "react";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

class BallotView extends Component {
  renderTableHeader() {
    const { totalPreferences } = this.props;
    var rows = [];
    rows.push(<th>ID</th>);
    rows.push(<th>Name</th>);
    for (var i = 1; i <= totalPreferences; i++) {
      rows.push(<th key={i}>Preference {i}</th>);
    }
    return <tr>{rows}</tr>;
  }

  renderTableData() {
    const { election, totalPreferences } = this.props;

    return election.candidates.map((candidate, index) => {
      const { user_name } = candidate; //destructuring
      var cols = [];
      for (let i = 1; i <= totalPreferences; i++) {
        cols.push(
          <td>
            <input type="radio" key={i * 100} value={i} name={index + 1} />
          </td>
        );
      }

      return (
        <tr key={index + 1}>
          <td>{index + 1}</td>
          <td>{user_name}</td>
          {cols}
        </tr>
      );
    });
  }

  render() {
    const { onChangeValue, onSubmit, validateBallot } = this.props;

    return (
      <div onChange={onChangeValue} className="mt-4 container">
        <h1 className="text-center display-4">Ranked Choice Ballot</h1>
        <p className="text-center lead">
          (Click on the radio buttons below according to your preference of
          candidates)
        </p>
        <table className="table table-striped table-bordered text-center">
          <thead className="thead-dark">{this.renderTableHeader()}</thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        <div className="text-center">
          <button
            className="btn btn-dark"
            type="submit"
            onClick={() => onSubmit()}
            disabled={!validateBallot()}
          >
            {"SUBMIT"}
          </button>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default BallotView;
