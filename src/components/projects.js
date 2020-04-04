/**
 * Projects component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Projects = () => {
  const data = useStaticQuery(graphql`
    query ProjectsQuery {

      allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }, filter: {frontmatter: {type: {eq: "project"}}}) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              title
              link
              description
              type
            }
          }
        }
      }


    }
  `)

  const projects = data.allMarkdownRemark.edges
  return (
    <div>
      <div>
        <h3>
          Projects
        </h3>
      </div>
      <div>
        {projects.map(({ node }) => {
          return (
            <div key={node.fields.slug}>
              <h3>
                <Link to={node.frontmatter.type + 's/' + node.fields.slug}>
                  {node.frontmatter.title}
                </Link>
              </h3>
              <p>
                {node.frontmatter.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Projects
