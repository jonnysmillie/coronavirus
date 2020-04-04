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
          © {new Date().getFullYear()}, A
          {` `}
          <a href="https://wolfonmoon.com">
            Wolf on Moon
          </a>
          {` `}
          site starter.
        </Footer>
      </div>
    )
  }
}

export default Layout
