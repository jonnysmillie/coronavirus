import React from "react"
import Layout from "../components/layout"
import FlagIcon from '../components/FlagIcon.js'
import styled from 'styled-components'

const Grid = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 50px;
  justify-content: center;
`
const Col = styled.div`
  margin: 25px;
`

const CountryPage = (props) => (
  <Layout>
    <main>
      <h1><FlagIcon code={props.pageContext.code.toLowerCase()} /> {props.pageContext.name}</h1>
      <p>{props.pageContext.slug}</p>
      <Grid>
        <Col>
          New cases: 
          {props.pageContext.newCases}
        </Col>
          <Col>
            New deaths: 
            {props.pageContext.newDeaths}
          </Col>
          <Col>
            New recovered: 
            {props.pageContext.newRecovered}
          </Col>
      </Grid>
      <Grid>
        <Col>
          Total cases: 
          {props.pageContext.totalCases}
        </Col>
          <Col>
            Total deaths: 
            {props.pageContext.totalDeaths}
          </Col>
          <Col>
            Total recovered: 
            {props.pageContext.totalRecovered}
          </Col>
      </Grid>
    </main>
  </Layout>
)
export default CountryPage