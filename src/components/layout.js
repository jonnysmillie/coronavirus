import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';

const HomeTitle = styled.h1`
  text-align: center;
  width: 100%;
`
const Description = styled.p`
  text-align: center;
  width: 100%;
`
let Main = styled.main`
  padding: 0rem 5%;
  text-align: center;
  @media(max-width: 678px){
    padding: 1rem 1rem;
  }
`
const Footer = styled.footer`
  text-align: center;
  width: 100%;
  padding: 2rem 20%;
`

class Layout extends React.Component {
  render() {
    const { title, children } = this.props

    return (
      <div>
        <header>
          <HomeTitle>
            <Link
              to={`/`}
            >
            Coronavirus / Covid-19 🦠
            </Link>
          </HomeTitle>
          <Description>Track the spread of the pandemic by country.</Description>
        </header>
        <Main>{children}</Main>
        <Footer>
          <p>All data from: <a href="https://covid19api.com/">https://covid19api.com/</a></p>
          © {new Date().getFullYear()}, Website by
          {` `}
          <a href="https://wolfonmoon.com">
            Wolf on Moon
          </a>
        </Footer>
      </div>
    )
  }
}

export default Layout
