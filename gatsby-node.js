const path = require("path")

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      customApi {
        Countries {
          Country
          Slug
        }
      }
    }
  `)
  console.log(result.data)
  result.data.customApi.Countries.forEach(country => {
    createPage({
      path: `/${country.Slug}`,
      component: path.resolve(`src/templates/countryPage.js`),
      context: {
        name: country.Country,
        slug: country.Slug,
      },
    })
  })
}
