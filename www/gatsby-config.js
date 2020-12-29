require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const plugins = [
  {
    resolve: "gatsby-theme-novela-labbalabba",
    options: {
      rootPath: "/",
      basePath: "/",
      authorsPage: true,
      mailchimp: false,
      categoryPage: true,
      sources: {
        local: false,
        strapi: true,
      },
      strapiContentTypes: ["article", "podcast"],
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Labba Labba`,
      short_name: `Labba Labba`,
      start_url: `/`,
      background_color: `#fff`,
      theme_color: `#fff`,
      display: `standalone`,
      icon: `src/assets/favicon.png`,
    },
  },
  'gatsby-plugin-offline',
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID,
    },
  },
  {
    resolve: `gatsby-source-strapi`,
    options: {
      apiURL: process.env.GATSBY_STRAPI_URL,
      queryLimit: 1000,
      contentTypes: ["article", "author", "podcast", "move"],
      singleTypes: ["site-metadata"],
      loginData: {
        identifier: process.env.GATSBY_STRAPI_USER,
        password: process.env.GATSBY_STRAPI_PASSWORD,
      },
    },
  },
];

module.exports = {
  plugins,
};
