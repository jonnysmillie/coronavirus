const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const projectPage = path.resolve(`./src/templates/project-page.js`)
  const result = await graphql(
    `
    {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "**/content/blog/**/*.md" } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              type
            }
          }
        }
      }
      projects: allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "**/content/projects/**/*.md" } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              type
            }
          }
        }
      }
    }
  `
  )

  if (result.errors) {
    throw result.errors
  }

    // Get blos posts from GraphQL.
    const posts = result.data.posts.edges
    // Get projects from GraphQL.
    const projects = result.data.projects.edges
  
    let componentTemplate = ''
  
    // Create posts pages
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      componentTemplate = blogPost
  
      createPage({
        path: post.node.frontmatter.type + 's' + post.node.fields.slug,
        component: componentTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  
    // Create projects pages
    projects.forEach((project, index) => {
      const previous = index === projects.length - 1 ? null : projects[index + 1].node
      const next = index === 0 ? null : projects[index - 1].node
      componentTemplate = projectPage
  
      createPage({
        path: project.node.frontmatter.type + 's' + project.node.fields.slug,
        component: componentTemplate,
        context: {
          slug: project.node.fields.slug,
          previous,
          next,
        },
      })
    })
  }

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
