import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Link from "gatsby-link"
import Data from "../components/data"

class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Coronavirus / Covid-19" />
        <p>Track the spread of the pandemic by country.</p>
        <p>
          {new Date().getDate()}/
          {new Date().getMonth()}/
          {new Date().getFullYear()}
        </p>
        <Data />
      </Layout>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
