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
        this.setState({ data: data });
      })
  }

  render(data) {
    const myData = [].concat(this.state.data)
    return (
          <table>
            <thead>
              <tr>
                  <th></th>
                  <th><b>Country</b></th>
                  <th><b>Number of Cases</b></th>
                  <td><b>Number of Deaths</b></td>
                  <td><b>New Cases</b></td>
                  <td><b>New Deaths</b></td>
                </tr>
              </thead>
            <tbody data={this.state.data}>
              {console.log(myData)}
              {myData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).map((i, index) => <tr key={index}><td>{index + 1}</td><td>{i.Country}</td><td>{i.TotalConfirmed}</td><td>{i.TotalDeaths}</td><td>{i.NewConfirmed}</td><td>{i.NewDeaths}</td></tr>)}
            </tbody>
          </table>
    )
  }
}