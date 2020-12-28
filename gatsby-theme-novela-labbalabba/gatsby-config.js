/* eslint-disable */

module.exports = ({
  contentAuthors = 'content/authors',
  contentPosts = 'content/posts',
  pathPrefix = '',
  sources: { local, strapi } = { local: false, strapi: true },
}) => ({
  pathPrefix,
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            strapiSiteMetadata {
              title
              description
              siteUrl
            }
          }
        `,
        setup: ({
          query: {
            strapiSiteMetadata,
          },
          ...rest
        }) => {
          strapiSiteMetadata.feed_url = strapiSiteMetadata.siteUrl + '/rss.xml';
          strapiSiteMetadata.image_url =
            strapiSiteMetadata.siteUrl + '/icons/icon-512x512.png';
          const siteMetadataModified = strapiSiteMetadata;
          siteMetadataModified.feed_url = `${strapiSiteMetadata.siteUrl}/rss.xml`;
          siteMetadataModified.image_url = `${strapiSiteMetadata.siteUrl}/icons/icon-512x512.png`;

          return {
            ...siteMetadataModified,
            ...rest,
          };
        },
        feeds: [
          {
            serialize: ({ query: { strapiSiteMetadata, allStrapiArticle, allStrapiPodcast } }) => {
              const allArticlesData = { ...allStrapiArticle, ...allStrapiPodcast };
              return allArticlesData.edges
                .filter(edge => !edge.node.secret)
                .map(edge => {
                  return {
                    ...edge.node,
                    description: edge.node.excerpt,
                    date: edge.node.published_at,
                    url: strapiSiteMetadata.siteUrl + edge.node.fields.slug,
                    guid: strapiSiteMetadata.siteUrl + edge.node.fields.slug,
                    author: edge.node.authors.name ? edge.node.authors.name : '',
                    custom_elements: [{ "content:encoded": edge.node.childMdBody.childMdx.rawBody }],
                  };
                });              
            },
            query:
              `
              {
                allStrapiArticle(sort: {order: DESC, fields: published_at}) {
                  edges {
                    node {
                      excerpt
                      childMdBody {
                        childMdx {
                          rawBody
                        }
                      }
                      published_at
                      fields {
                        slug
                      }
                      title
                      authors {
                        name
                      }
                      secret
                    }
                  }
                }
                allStrapiPodcast(sort: {order: DESC, fields: published_at}) {
                  edges {
                    node {
                      excerpt
                      childMdBody {
                        childMdx {
                          rawBody
                        }
                      }
                      published_at
                      fields {
                        slug
                      }
                      title
                      authors {
                        name
                      }
                      secret
                    }
                  }
                }
              }
              `,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: contentPosts,
        name: contentPosts,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: contentAuthors,
        name: contentAuthors,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 10000,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true,
            },
          },
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              providers: {
                include: ["Instagram"]
              }
            }
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 680,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`,
                }
              ] //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
            }
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-numbered-footnotes` },
          { resolve: `gatsby-remark-smartypants` },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer', // eslint-disable-line unicorn/prevent-abbreviations
            },
          },
        ],
        remarkPlugins: [require(`remark-slug`)], // eslint-disable-line global-require
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
    },
  ],
});
