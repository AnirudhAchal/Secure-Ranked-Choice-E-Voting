import React, { Component } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "./styles/ResultView.css";

function getRandomColor() {
  // return "#" + Math.random().toString(16).substr(2, 6); not so good
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class ResultView extends Component {
  renderBarGraph({ graphData, roundNumber }) {
    return (
      <div className="Charts float-container">
        <div className="BarGraph float-child">
          <h1>Bar Graph of Votes</h1>
          <div style={{ maxWidth: "650px" }}>
            <Bar
              data={graphData}
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

  renderPieChart({ graphData, roundNumber }) {
    return (
      <div className="Charts float-container">
        <div className="PieChart float-child">
          <h1>Pie Chart of Votes</h1>
          <div style={{ maxWidth: "650px" }}>
            <Pie
              data={graphData}
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
    const { results, idToCandidateUsername } = this.props;
    const { winner, history } = results;
    
    if (!winner || !history) {
      return (
        <center><h1>There were no votes casted in this election</h1></center>
      );
    }
    let colorOfCandidates = {};
    for (const [id] of Object.entries(history[0])) {
      colorOfCandidates[id] = getRandomColor();
    }
    // Delete after completing this component
    // console.log(winner);
    // console.log(history);
    // console.log(idToCandidateUsername);

    // Add results in this component
    let graphDataOfAllRounds = [];

    for (let i = 0; i < Object.keys(history).length; i++) {
      let intermediate_result = history[i];

      let candidates = [];
      for (const [id, votes] of Object.entries(intermediate_result)) {
        candidates.push({
          id: id,
          name: idToCandidateUsername[id],
          votes: votes,
        });
      }

      let graphData = {
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

      candidates.forEach((candidate, index) => {
        graphData.labels.push(candidate.name);
        graphData.datasets[0].data.push(candidate.votes);
        graphData.datasets[0].backgroundColor.push(
          colorOfCandidates[candidate.id]
        );
      });
      graphData.datasets[0].borderColor = graphData.datasets[0].backgroundColor;

      graphDataOfAllRounds.push(graphData);
    }
    // console.log(graphDataOfAllRounds);

    return (
      <div>
        {graphDataOfAllRounds.map((object, i) => (
          <div>
            <h1>Round {i + 1} results: </h1>
            <this.renderBarGraph graphData={object} roundNumber={i} />
            <this.renderPieChart graphData={object} roundNumber={i} />
          </div>
        ))}
        <h1 className="winner">
          The winner is {idToCandidateUsername[winner]}
        </h1>
      </div>
    );
  }
}

export default ResultView;
