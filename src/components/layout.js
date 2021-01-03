import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"

import Header from "./header"
import Sidebar from "./Sidebar"
import Footer from "../components/Footer"
import "../styles/index.scss"

const Layout = ({ children, pageTitle }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <script
        src="https://kit.fontawesome.com/f13b5d5d8f.js"
        crossOrigin="anonymous"
      ></script>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div className="container" id="content">
        <h1>{pageTitle}</h1>
        <Row>
          <Col md="8">{children}</Col>
          <Col md="4">
            {" "}
            <Sidebar />{" "}
          </Col>
        </Row>
        <Footer></Footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
