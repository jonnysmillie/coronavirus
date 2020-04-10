import React from "react"
import axios from "axios"
import styled from 'styled-components'
import _ from 'lodash'
import { getCode, overwrite} from 'country-list'
import FlagIcon from './FlagIcon.js'
import NumberFormat from 'react-number-format'
import { Table } from 'semantic-ui-react'
// const { getCode, getName } = require('country-list');

overwrite([{
  code: 'gb',
  name: 'United Kingdom'
}])

// const Table = styled.table`
//   width: 100%; 
//   border-collapse: collapse; 
//   th {
//     text-align: left;
//     background: rgba(255, 87, 2, 0.2);
//   }
//   tr:nth-child(odd) {
//     background-color: #fcfcfc;
//   }
//   td {
//     padding: 15px;
//     @media(max-width: 678px){
//       padding:0;
//     }
//   }
// `


export default class Data extends React.Component {
  state = {
    data: [],
    world: [],
    active: 'TotalConfirmed',
    column: 'TotalConfirmed',
    direction: 'ascending',
  }

  componentDidMount() {
    axios.get(`https://api.covid19api.com/summary`)
      .then(res => {
        //const data = res.data.Countries;
        // let countryName = res.data.Countries.Country
        // console.log(data);
        const world = res.data.Global
        const sortedData = [].concat(res.data.Countries)
        const data = sortedData.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
        this.setState({ data: data, world: world });
        console.log(world)
      })

  }
  
  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'descending',
        active: clickedColumn
      })

      {console.log( data)}

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'descending' ? 'ascending' : 'descending',
    })
  }

  // handleTotalCasesSort = () => {
  //   let totalConfirmedSort = [...this.state.data].sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
  //   this.setState({
  //     data: totalConfirmedSort,
  //     active: {totalCases: true, totalDeaths: false, newCases: false, newDeaths: false, country: false},
  //   })
  // }
  // handleTotalDeathSort = () => {
  //   let totalDeathSort = [...this.state.data].sort((a, b) => b.TotalDeaths - a.TotalDeaths)
  //   this.setState({
  //     data: totalDeathSort,
  //     active: {totalCases: false, totalDeaths: true, newCases: false, newDeaths: false, country: false},
  //   })
  // }
  // handleNewCasesSort = () => {
  //   let newConfirmedSort = [...this.state.data].sort((a, b) => b.NewConfirmed - a.NewConfirmed)
  //   this.setState({
  //     data: newConfirmedSort,
  //     active: {totalCases: false, totalDeaths: false, newCases: true, newDeaths: false, country: false},
  //   })
  // }
  // handleNewDeathSort = () => {
  //   let newDeathSort = [...this.state.data].sort((a, b) => b.NewDeaths - a.NewDeaths)
  //   this.setState({
  //     data: newDeathSort,
  //     active: {totalCases: false, totalDeaths: false, newCases: false, newDeaths: true, country: false},
  //   })
  // }
  // handleCountrySort = () => {
  //   let countrySort = [...this.state.data].sort((a, b) => b.Country - a.Country)
  //   this.setState({
  //     data: countrySort,
  //     active: {totalCases: false, totalDeaths: false, newCases: false, newDeaths: false, country: true},
  //   })
  // }


  render() {
    //const myData = [].concat(this.state.data)
    const { column, data, direction, active, world } = this.state
    // <thead>
    //   <tr>
    //       <th></th>
    //       <th className={this.state.active.country ? 'active' : null} onClick={this.handleCountrySort}><b>Country</b></th>
    //       <th className={this.state.active.totalCases ? 'active' : null} onClick={this.handleTotalCasesSort}><b>Total Cases</b></th>
    //       <th className={this.state.active.totalDeaths ? 'active' : null} onClick={this.handleTotalDeathSort}><b>Total Deaths</b></th>
    //       <th className={this.state.active.newCases ? 'active' : null} onClick={this.handleNewCasesSort}><b>New Cases</b></th>
    //       <th className={this.state.active.newDeaths ? 'active' : null} onClick={this.handleNewDeathSort}><b>New Deaths</b></th>
    //     </tr>
    // </thead>

    return (
          <Table sortable celled fixed>
            <thead>
              <tr>
                  <th>{console.log(active)}</th>
                  <Table.HeaderCell
                    sorted={column === 'Country' ? direction : null}
                    onClick={this.handleSort('Country')}
                    className={
                      active === 'Country' ? 'active' : null
                      + ' ' +
                      direction === 'descending' ? 'descending' : 'ascending'
                    }
                  >
                    Country
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'TotalConfirmed' ? direction : null}
                    onClick={this.handleSort('TotalConfirmed')}
                    className={
                      active === 'TotalConfirmed' ? 'active' : null
                      + ' ' +
                      direction === 'descending' ? 'descending' : 'ascending'
                    }
                  >
                    Total cases
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'TotalDeaths' ? direction : null}
                    onClick={this.handleSort('TotalDeaths')}
                    className={
                      active === 'TotalDeaths' ? 'active' : null
                      + ' ' +
                      direction === 'descending' ? 'descending' : 'ascending'
                    }
                  >
                    Total deaths
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'NewConfirmed' ? direction : null}
                    onClick={this.handleSort('NewConfirmed')}
                    className={
                      active === 'NewConfirmed' ? 'active' : null
                      + ' ' +
                      direction === 'descending' ? 'descending' : 'ascending'
                    }
                  >
                    New cases
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === 'NewDeaths' ? direction : null}
                    onClick={this.handleSort('NewDeaths')}
                    className={
                      active === 'NewDeaths' ? 'active' : null
                      + ' ' +
                      direction === 'descending' ? 'descending' : 'ascending'
                    }
                  >
                    New deaths
                  </Table.HeaderCell>
                </tr>
            </thead>
            <tbody>
              {console.log()}
              <tr>
                    <td>0</td>
                    <td>🌍 World</td>
                    <td><NumberFormat value={world.TotalConfirmed} displayType={'text'} thousandSeparator={true} /></td>
                    <td><NumberFormat value={world.TotalDeaths} displayType={'text'} thousandSeparator={true} /></td>
                    <td><NumberFormat value={world.NewConfirmed} displayType={'text'} thousandSeparator={true} /></td>
                    <td><NumberFormat value={world.NewDeaths} displayType={'text'} thousandSeparator={true} /></td>
              </tr>
              {data
              .map((i, index) => 
              <tr key={index}>
                <td>{index + 1}</td>
                <td><FlagIcon code={i.CountryCode.toLowerCase()} />
                {' '}
                {i.Country}
                </td>
                <td><NumberFormat value={i.TotalConfirmed} displayType={'text'} thousandSeparator={true}/></td>
                <td><NumberFormat value={i.TotalDeaths} displayType={'text'} thousandSeparator={true}/></td>
                <td><NumberFormat value={i.NewConfirmed} displayType={'text'} thousandSeparator={true}/></td>
                <td><NumberFormat value={i.NewDeaths} displayType={'text'} thousandSeparator={true}/></td>
              </tr>)}
            </tbody>
          </Table>
    )
  }
}