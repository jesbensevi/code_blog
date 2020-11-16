import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => {
  return (
    <Layout>
      <SEO title="About" keywords={[`gatsby`, `application`, `reac`]} />
      <h1>About us...</h1>
    </Layout>
  )
}

export default AboutPage
