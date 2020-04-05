import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';

const HomeTitle = styled.h1`
  text-align: center;
  width: 100%;
`
const PageTitle = styled.h3`
  text-align: center;
  width: 100%;
`
let Main = styled.main`
  padding: 1rem 20%;
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
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <HomeTitle>
          <Link
            to={`/`}
          >
            {title}
          </Link>
        </HomeTitle>
      )
    } else {
      header = (
        <PageTitle>
          <Link
            to={`/`}
          >
            {title}
          </Link>
        </PageTitle>
      )
    }
    return (
      <div>
        <header>{header}</header>
        <Main>{children}</Main>
        <Footer>
          <p>All data from: <a href="https://documenter.getpostman.com/view/10808728/SzS8rjbc">https://documenter.getpostman.com/view/10808728/SzS8rjbc</a></p>
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
