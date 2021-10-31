import React, { Component } from "react";
import { Redirect } from "react-router";
import "./styles/Result.css";
import isAuthenticated from "./utils/authentication";
import { Bar, Pie } from "react-chartjs-2";

// export default Result;
function getRandomColor() {
  // return "#" + Math.random().toString(16).substr(2, 6); not so good
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class Result extends Component {
  constructor() {
    super();
    this.state = {
      candidates: [
        { id: 1, name: "Rogan", votes: 10 },
        { id: 2, name: "Shapiro", votes: 20 },
        { id: 3, name: "Kalpit", votes: 75 },
        { id: 4, name: "Maher", votes: 30 },
        { id: 5, name: "Baghdadi", votes: 15 },
      ],
      redirectToLogin: false,
    };
    this.graphData = {
      labels: [],
      datasets: [
        {
          label: "total count",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 0.5,
        },
      ],
    };

    this.state.candidates.forEach((candidate, index) => {
      this.graphData.labels.push(candidate.name);
      this.graphData.datasets[0].data.push(candidate.votes);
      this.graphData.datasets[0].backgroundColor.push(getRandomColor());
    });
    this.graphData.datasets[0].borderColor =
      this.graphData.datasets[0].backgroundColor;
  }

  async componentDidMount() {
    if (!isAuthenticated()) {
      this.setState({
        redirectToLogin: true,
      });
    }
  }

  renderBarGraph() {
    return (
      <div className="Charts float-container">
        <div className="BarGraph float-child">
          <h1>Bar Graph of Votes</h1>
          <div style={{ maxWidth: "650px" }}>
            <Bar
              data={this.graphData}
              // Height of graph
              height={400}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        // The y-axis value will start from zero
                        beginAtZero: true,
                      },
                    },
                  ],
                },
                legend: {
                  labels: {
                    fontSize: 15,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  renderPieChart() {
    return (
      <div className="Charts float-container">
        <div className="PieChart float-child">
          <h1>Pie Chart of Votes</h1>
          <div style={{ maxWidth: "650px" }}>
            <Pie
              data={this.graphData}
              // Height of graph
              height={400}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        // The y-axis value will start from zero
                        beginAtZero: true,
                      },
                    },
                  ],
                },
                legend: {
                  labels: {
                    fontSize: 15,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <h1 id="title">Result</h1>
        {this.renderBarGraph()}
        {this.renderPieChart()}
      </div>
    );
  }
}

export default Result;
