import React from "react"
import axios from "axios"



export default class Data extends React.Component {
  state = {
    data: [],
  }

  componentDidMount() {
    axios.get(`https://api.covid19api.com/summary`)
      .then(res => {
        const data = res.data.Countries;
        console.log(data);
        this.setState({ data });
      })
  }

  render() {
    return (
          <table>
            <thead>
              <tr>
                  <td>Country</td>
                  <td>Number of Cases</td>
                  <td>Number of Deaths</td>
                  <td>New Cases</td>
                  <td>New Deaths</td>
                </tr>
              </thead>
            <tbody>
              {console.log(this.state.data)}
              {this.state.data.map((i, index) => <tr key={index}><td>{i.Country}</td><td>{i.TotalConfirmed}</td><td>{i.TotalDeaths}</td><td>{i.NewConfirmed}</td><td>{i.NewDeaths}</td></tr>)}
            </tbody>
          </table>
    )
  }
}