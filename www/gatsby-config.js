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
      mailchimp: true,
      sources: {
        local: false,
        strapi: true,
      },
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
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
    },
  },
  {
    resolve: "gatsby-plugin-mailchimp",
    options: {
      endpoint:
        process.env.MAILCHIMP_ENDPOINT,
    },
  },
  {
    resolve: `gatsby-source-strapi`,
    options: {
      apiURL: process.env.STRAPI_URL,
      queryLimit: 1000,
      contentTypes: ["article", "author", "podcast", "move"],
      singleTypes: ["site-metadata"],
      loginData: {
        identifier: process.env.STRAPI_USER,
        password: process.env.STRAPI_PASSWORD,
      },
    },
  },
];

module.exports = {
  plugins,
};
