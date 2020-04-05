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
                  <th><b>Country</b></th>
                  <th><b>Total Cases</b></th>
                  <th><b>Total Deaths</b></th>
                  <th><b>New Cases</b></th>
                  <th><b>New Deaths</b></th>
                </tr>
            </thead>
            <tbody>
              {console.log(myData[0])}
              {myData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
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