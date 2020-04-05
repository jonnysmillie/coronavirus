import React from "react"
import axios from "axios"
import styled from 'styled-components'
import { getCode, overwrite} from 'country-list'
import FlagIcon from './FlagIcon.js'
import NumberFormat from 'react-number-format';
// const { getCode, getName } = require('country-list');

overwrite([{
  code: 'gb',
  name: 'United Kingdom'
}])

const Table = styled.table`
  width: 100%; 
  border-collapse: collapse; 
  th {
    text-align: left;
    background: rgba(255, 87, 2, 0.2);
  }
  tr:nth-child(odd) {
    background-color: #fcfcfc;
  }
  td {
    padding: 15px;
    @media(max-width: 678px){
      padding:0;
    }
  }
`


export default class Data extends React.Component {
  state = {
    data: [],
    active: false,
  }

  componentDidMount() {
    axios.get(`https://api.covid19api.com/summary`)
      .then(res => {
        const data = res.data.Countries;
        let countryName = res.data.Countries.Country
        // console.log(data);
        const sortedData = [].concat(res.data.Countries)
        const newData = sortedData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
        this.setState({ data: newData });
      })

  }

  handleTotalDeathSort = () => {
    let totalDeathSort = [...this.state.data].sort((a, b) => b.TotalDeaths - a.TotalDeaths)
    this.setState({
      data: totalDeathSort,
    })
  }
  handleTotalCasesSort = () => {
    let totalConfirmedSort = [...this.state.data].sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
    this.setState({
      data: totalConfirmedSort
    })
  }
  handleNewDeathSort = () => {
    let newDeathSort = [...this.state.data].sort((a, b) => b.NewDeaths - a.NewDeaths)
    this.setState({
      data: newDeathSort
    })
  }
  handleNewCasesSort = () => {
    let newConfirmedSort = [...this.state.data].sort((a, b) => b.NewConfirmed - a.NewConfirmed)
    this.setState({
      data: newConfirmedSort
    })
  }


  render() {
    //const myData = [].concat(this.state.data)
    return (
          <Table>
            <thead>
              <tr>
                  <th></th>
                  <th><b>Country</b></th>
                  <th onClick={this.handleTotalCasesSort}><b>Total Cases</b></th>
                  <th onClick={this.handleTotalDeathSort}><b>Total Deaths</b></th>
                  <th onClick={this.handleNewCasesSort}><b>New Cases</b></th>
                  <th onClick={this.handleNewDeathSort}><b>New Deaths</b></th>
                </tr>
            </thead>
            <tbody>
              {console.log()}
              {this.state.data
              .map((i, index) => 
              <tr key={index}>
                <td>{index + 1}</td>
                <td><FlagIcon code={i.CountryCode.toLowerCase()} />
                {' '}
                {i.Country}
                </td>
                <td><NumberFormat value={i.TotalConfirmed}
                displayType={'text'}
                thousandSeparator={true}/></td>
                <td><NumberFormat value={i.TotalDeaths} displayType={'text'} thousandSeparator={true}/></td>
                <td><NumberFormat value={i.NewConfirmed} displayType={'text'} thousandSeparator={true}/></td>
                <td><NumberFormat value={i.NewDeaths} displayType={'text'} thousandSeparator={true}/></td>
              </tr>)}
            </tbody>
          </Table>
    )
  }
}