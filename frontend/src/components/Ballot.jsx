import React, { Component } from "react";
import { Redirect } from "react-router";
import "./styles/Ballot.css";
import axiosInstance from "../axios";
import isAuthenticated from "./utils/authentication";
import { curElection } from "../const.js";

class Ballot extends Component {
  constructor() {
    super();
    this.state = {
      candidates: [],
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

    axiosInstance
      .get(`/election/${curElection.id}/`)
      .then((res) => {
        //console.log(res);
        this.setState({ candidates: res.data.candidates });
        //console.log(this.state.candidates);
      })
      .catch((err) => {
        console.log(err);
      });
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
    return (
      <>
      <th key={1}>ID</th>
      <th key={2}>Name</th>
      </>
    )
  }

  renderTableData() {
    var id = 0;
    console.log(this.state.candidates);
    return this.state.candidates.map((candidate) => {
      //const { id, name } = candidate //destructuring
      var cols = [];
      for (let i = 1; i <= this.state.totalPreferences; i++) {
        cols.push(<td><input type="radio" value={i} name={id} />{i}</td>)
      }
      
      cols.push(<td><input type="radio" value={this.state.totalPreferences + 1} name={id} /> clear</td>)
      id++;
      console.log(id);
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{candidate}</td>
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
        <h1 id='title'>Ranked Choice Ballot - {curElection.id} </h1>
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
