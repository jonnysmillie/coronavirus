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
          CountryCode
          NewConfirmed
          NewDeaths
          NewRecovered
          TotalConfirmed
          TotalDeaths
          TotalRecovered
        }
      }
    }
  `)
  console.log(result.data)
  result.data.customApi.Countries.forEach(country => {
    createPage({
      path: `/${country.Slug}/`,
      component: path.resolve(`src/templates/countryPage.js`),
      context: {
        name: country.Country,
        slug: country.Slug,
        code: country.CountryCode,
        newCases: country.NewConfirmed,
        newDeaths: country.NewDeaths,
        newRecovered: country.NewRecovered,
        totalCases: country.TotalConfirmed,
        totalDeaths: country.TotalDeaths,
        totalRecovered: country.TotalRecovered
      },
    })
  })
}
