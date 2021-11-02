import React, { Component } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
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
  constructor(props) {
    super(props);
    this.chartReference1 = React.createRef();
    this.chartReference2 = React.createRef();
    this.state = {
      data: {
        labels: [],
        datasets: [
          {
            label: "# of votes",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 0.5,
          },
        ],
      },
    };
  }

  componentDidMount() {
    this.chart1 = this.chartReference1.current.chartInstance;
    this.chart2 = this.chartReference2.current.chartInstance;
    setTimeout(() => {
      this.calculateData();
    }, 1000);
  }

  calculateData() {
    const { results, idToCandidateUsername } = this.props;
    const { winner, history } = results;

    if (!winner || !history) {
      return (
        <center>
          <h1>There were no votes casted in this election</h1>
        </center>
      );
    }
    let colorOfCandidates = {};
    for (const [id] of Object.entries(history[0])) {
      colorOfCandidates[id] = getRandomColor();
    }
    let timeout = 0;
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
            label: "",
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
      timeout += 1500;
      graphData.datasets[0].borderColor = graphData.datasets[0].backgroundColor;
      console.log(1);
      this.updateChartDelayed(graphData, timeout);
      console.log(graphData);
    }
  }

  updateChartDelayed(graphData, timeout) {
    this.timer = setTimeout(() => {
      this.chart1.data.labels = graphData.labels;
      this.chart1.data.datasets[0].data = graphData.datasets[0].data;
      this.chart1.data.datasets[0].backgroundColor =
        graphData.datasets[0].backgroundColor;
      this.chart1.update();
      this.chart2.data.labels = graphData.labels;
      this.chart2.data.datasets[0].data = graphData.datasets[0].data;
      this.chart2.data.datasets[0].backgroundColor =
        graphData.datasets[0].backgroundColor;
      this.chart2.update();
    }, timeout);
  }

  render() {
    const { results, idToCandidateUsername } = this.props;
    const { winner} = results;
    return (
      <div>
        <div className = "row">
          <div className = "column">
        <div className="Charts float-container-center">
          <div className="my-3 mx-5 BarGraph float-child">
            <h1 className="display-4 my-3">Bar Graph of Votes</h1>
            <hr/>
            <div style={{ maxWidth: "650px" }}>
              <Bar
                ref={this.chartReference1}
                data={this.state.data}
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
        </div>
        <div className = "column">
        <div className="Charts float-container">
          <div className="PieChart float-child">
          <h1 className="display-4 my-3">Doughnut of Votes</h1>
            <hr/>
            <div style={{ maxWidth: "650px" }}>
              <Doughnut
                ref={this.chartReference2}
                data={this.state.data}
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
      </div>
      </div>
      <div className="my-5 text-center text-dark">
              <h1 className='display-4'>The Elected Candidate is: {idToCandidateUsername[winner]}</h1>
        </div>
      </div>
    );
  }
}

export default ResultView;
