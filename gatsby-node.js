const { slugify } = require("./src/utils/utilityFunctions")
const path = require("path")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  // Page templates
  const singlePostTemplate = path.resolve("src/templates/single-post.js")

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)
    // Extracting all posts from res
    const posts = res.data.allMarkdownRemark.edges
    // Create single post pages
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: singlePostTemplate,
        context: {
          // Passing slug for template to use to fetch the post
          slug: node.fields.slug,
        },
      })
    })
  })
}
