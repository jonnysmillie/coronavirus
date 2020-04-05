import React from "react"
import axios from "axios"
import styled from 'styled-components'
import { getCode, overwrite} from 'country-list'
// const { getCode, getName } = require('country-list');

overwrite([{
  code: 'UK',
  name: 'United Kingdom'
}])

const Table = styled.table`
  th {
    text-align: left;
    background: rgba(255, 87, 2, 0.2);
  }
  tr:nth-child(odd) {
    background-color: #fcfcfc;
  }
  td {
    padding: 15px;
  }
`


export default class Data extends React.Component {
  state = {
    data: [],
  }

  componentDidMount() {
    axios.get(`https://api.covid19api.com/summary`)
      .then(res => {
        const data = res.data.Countries;
        let countryName = res.data.Countries.Country
        // console.log(data);
        this.setState({ data: data });
      })
  }

  render(data) {
    const myData = [].concat(this.state.data)
    return (
          <Table>
            <thead>
              <tr>
                  <th></th>
                  <th><b>Country Code</b></th>
                  <th><b>Country</b></th>
                  <th><b>Total Cases</b></th>
                  <th><b>Total Deaths</b></th>
                  <th><b>New Cases</b></th>
                  <th><b>New Deaths</b></th>
                </tr>
            </thead>
            <tbody>
              {/*console.log(myData)*/}
              {myData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).map((i, index) => <tr key={index}><td>{index + 1}</td><td>{getCode(i.Country)}</td><td>{i.Country}</td><td>{i.TotalConfirmed}</td><td>{i.TotalDeaths}</td><td>{i.NewConfirmed}</td><td>{i.NewDeaths}</td></tr>)}
            </tbody>
          </Table>
    )
  }
}