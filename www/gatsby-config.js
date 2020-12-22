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
      name: `Novela by Narative`,
      short_name: `Novela`,
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
      trackingId: "UA-118232427-3",
    },
  },
  {
    resolve: "gatsby-plugin-mailchimp",
    options: {
      endpoint:
        "https://narative.us19.list-manage.com/subscribe/post?u=65ef169332a03669b9538f6ef&amp;id=c55c426282",
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
