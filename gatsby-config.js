module.exports = {
  pathPrefix: `/PassWord`,
  siteMetadata: {
    title: `Password Wallet`,
    description: `A little password manager, accessible from everywhere.`,
    author: `Mathieu Dutour`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Password Wallet`,
        short_name: `Password`,
        start_url: `/`,
        background_color: `#14EBFF`,
        theme_color: `#14EBFF`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
