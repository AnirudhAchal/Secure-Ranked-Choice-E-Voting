import React, { Component } from "react";
import { Redirect } from "react-router";
import "./styles/Ballot.css";
import isAuthenticated from "./utils/authentication";

class Ballot extends Component {
  constructor() {
    super();
    this.state = {
      candidates: [
        { id: 1, name: 'Rogan'},
        { id: 2, name: 'Shapiro'},
        { id: 3, name: 'Kalpit'},
        { id: 4, name: 'Maher'},
        { id: 5, name: 'Baghdadi'}
      ],
      totalPreferences: 3,
      tracker: new Array(100).fill(null),
      redirectToLogin: false
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  async componentDidMount() {
    if (!isAuthenticated()) {
      this.setState({
        redirectToLogin: true,
      });
    }
  }

  onChangeValue(e) {
    console.log(e.target.value);
    console.log(e.target.name);
    const idx = Number(e.target.name) - 1
    const pref = Number(e.target.value)
    const val = this.state.tracker.slice()

    if (pref === this.state.totalPreferences + 1)
      val[idx] = null
    else
      val[idx] = pref
    console.log(val)
    this.setState({
      tracker: val,
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.candidates[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  renderTableData() {
    return this.state.candidates.map((candidate, index) => {
      const { id, name } = candidate //destructuring
      var cols = [];
      for (let i = 1; i <= this.state.totalPreferences; i++) {
        cols.push(<td><input type="radio" value={i} name={id} />{i}</td>)
      }
      cols.push(<td><input type="radio" value={this.state.totalPreferences + 1} name={id} /> clear</td>)

      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          {cols}
        </tr>
      )
    })
  }

  handleSubmit() {
    var val = new Array(100).fill(null);
    for (let i = 0; i < 100; i++) {
      if (this.state.tracker[i] !== null)
        val[this.state.tracker[i]-1] += 1
    }

    for (let i = 0; i < this.state.totalPreferences; i++) {
      if (val[i] !== 1 ) {
        console.log('Submission Failed'); 
        return;
      }
    }

    console.log('Submission Accepted');
  }

  render() {
    if(this.state.redirectToLogin) {
      return <Redirect to="/login" />;
    }

    return (
      <div onChange={this.onChangeValue}>
        <h1 id='title'>Ranked Choice Ballot</h1>
        <table id='candidates'>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
          </tbody>
        </table>
        <div className="submission">
          <button className="submit" onClick = {() => this.handleSubmit()}>
            {'SUBMIT'}
          </button>
        </div>
      </div>
    )
  }

}

export default Ballot;
