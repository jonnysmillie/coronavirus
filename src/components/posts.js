import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Posts = () => {
  const data = useStaticQuery(graphql`
    query PostsQuery {
      allMarkdownRemark(sort: { fields: [frontmatter___title], order: DESC }, filter: {frontmatter: {type: {eq: "post"}}}) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              type
            }
          }
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.edges

  return (
    <div>
      <div>
        <h3>
          Posts
        </h3>
      </div>
      <div>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3>
                <Link to={node.frontmatter.type + 's/' + node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Posts
