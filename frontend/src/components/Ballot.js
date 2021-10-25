import React, { Component } from "react";
import "./styles/Ballot.css";

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
      tracker: new Array(5).fill(null)
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(e) {
    console.log(e.target.value);
    console.log(e.target.name);
    const idx = Number(e.target.name) - 1
    const pref = Number(e.target.value)
    const val = this.state.tracker.slice()

    if (pref === 6)
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
      var pos = 1;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td><input type="radio" value={pos} name={id} /> 1st</td>
          <td><input type="radio" value={pos+1} name={id} /> 2nd</td>
          <td><input type="radio" value={pos+2} name={id} /> 3rd</td>
          <td><input type="radio" value={pos+3} name={id} /> 4th</td>
          <td><input type="radio" value={pos+4} name={id} /> 5th</td>
          <td><input type="radio" value={pos+5} name={id} /> clear</td>
        </tr>
      )
    })
  }

  handleSubmit() {
    var val = new Array(5).fill(null);
    for (let i = 0; i < 5; i++) {
      if (this.state.tracker[i] === null) {
        console.log('Submission Failed');
        return;
      }
      else
        val[this.state.tracker[i]-1] = 1
    }

    for (let i = 0; i < 5; i++) {
      if (val[i] === null) {
        console.log('Submission Failed'); 
        return;
      }
    }

    console.log('Submission Accepted');
  }

  render() {
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