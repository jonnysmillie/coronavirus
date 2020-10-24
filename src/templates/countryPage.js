import React from "react"

const CountryPage = (props) => (
  <main>
    <h1>{props.pageContext.slug}</h1>
    <p>{props.pageContext.name}</p>
  </main>
)
export default CountryPage