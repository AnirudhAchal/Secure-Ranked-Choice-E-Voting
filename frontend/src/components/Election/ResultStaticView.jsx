import React, { Component } from "react";
import { Bar, Doughnut } from "react-chartjs-2";

function getRandomColor() {
  // return "#" + Math.random().toString(16).substr(2, 6); not so good
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

class ResultStaticView extends Component {
  renderBarGraph({ graphData, roundNumber }) {
    return (
      <div className="Charts float-container">
        <div className="BarGraph float-child">
          <div style={{ maxWidth: "650px" }}>
            <Bar
              id={roundNumber + "1"}
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
                title: {
                  display: true,
                  text: "BarChart Representation",
                  position: "bottom",
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
        <div className="DoughNut float-child">
          <div style={{ maxWidth: "650px" }}>
            <Doughnut
              id={roundNumber + "2"}
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
                title: {
                  display: true,
                  text: "Doughnut Representation",
                  position: "bottom",
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

    let colorOfCandidates = {};
    for (const [id] of Object.entries(history[0])) {
      colorOfCandidates[id] = getRandomColor();
    }

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

    return (
      <div>
        <div className="my-5 text-center text-dark">
          <h1 className="display-4">
            The Elected Candidate is: {idToCandidateUsername[winner]}
          </h1>
        </div>
        {graphDataOfAllRounds.map((object, i) => (
          <div>
            <h3 className="mx-3 my-4 text-muted">Round {i + 1} results: </h3>
            <div className="row mx-auto">
              <div className=" mx-5 col sm-3">
                <this.renderBarGraph graphData={object} roundNumber={i} />
              </div>
              <div className="col sm-3">
                <this.renderPieChart graphData={object} roundNumber={i} />
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

export default ResultStaticView;
