import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class ProjectPageTemplate extends React.Component {
  render() {
    const project = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={project.frontmatter.title}
          description={project.frontmatter.description || project.excerpt}
        />
        <h1>
          {project.frontmatter.title}
        </h1>
        <p>
          {project.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: project.html }} />
        <hr />

      </Layout>
    )
  }
}

export default ProjectPageTemplate

export const pageQuery = graphql`
  query ProjectPageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
      }
    }
  }
`
