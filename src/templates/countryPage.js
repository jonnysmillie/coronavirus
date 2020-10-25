import React from "react"
import Layout from "../components/layout"
import FlagIcon from '../components/FlagIcon.js'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'

const Grid = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 50px;
  justify-content: center;
  margin: 0rem 3rem 5rem 3rem;
`
const Col = styled.div`
  margin: 2rem;
`

const ColHeader = styled.div`
  background-color: rgba(255, 87, 0, 0.7);
  padding: 0.5rem;
`
const ColBody = styled.div`
  font-weight: bold;
  font-size: 2rem;
`

const CountryPage = (props) => (
  <Layout>
    <main>
      <h1>
        <FlagIcon code={props.pageContext.code.toLowerCase()} />
        {' '}
        {props.pageContext.name}
        </h1>
      <Grid>
        <Col>
          <ColHeader>
            Total cases
          </ColHeader>
          <ColBody>
            <NumberFormat value={props.pageContext.totalCases} displayType={'text'} thousandSeparator={true} />
          </ColBody>
        </Col>
          <Col>
            <ColHeader>
              Total deaths
            </ColHeader>
            <ColBody>
            <NumberFormat value={props.pageContext.totalDeaths} displayType={'text'} thousandSeparator={true} />
            </ColBody>
          </Col>
          <Col>
            <ColHeader>
            Total recovered
            </ColHeader>
            <ColBody>
            <NumberFormat value={props.pageContext.totalRecovered} displayType={'text'} thousandSeparator={true} />
            </ColBody>
          </Col>
      </Grid>
      <Grid>
        <Col>
          <ColHeader>
            New cases
          </ColHeader>
          <ColBody>
          <NumberFormat value={props.pageContext.newCases} displayType={'text'} thousandSeparator={true} />
          </ColBody>
        </Col>
          <Col>
          <ColHeader>
            New deaths
          </ColHeader>
          <ColBody>
          <NumberFormat value={props.pageContext.newDeaths} displayType={'text'} thousandSeparator={true} />
          </ColBody>
          </Col>
          <Col>
            <ColHeader>
              New recovered
            </ColHeader>
            <ColBody>
            <NumberFormat value={props.pageContext.newRecovered} displayType={'text'} thousandSeparator={true} />
            </ColBody>
          </Col>
      </Grid>
    </main>
  </Layout>
)
export default CountryPage