import React from 'react';

/**
 * 
 * This file is used to generate a sitemap.xml file for the website
 * 
 * @function createSitemap - generates XML structure for every page
 * @param {object} data - data from WPGraphQL of every post type for every post
 * @returns /sitemap.xml with a fully formed XML structure of the website
 * 
 */

const createSitemap = (data) => {

    const pageSlugs = [...data.data.pages.nodes]
    const postSlugs = [...data.data.posts.nodes]
    const roomsSlugs = [...data.data.rooms.nodes]
    const offersSlugs = [...data.data.offers.nodes]

    return (
        `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pageSlugs
            .map(({ slug, modified }) => {
                
                if (slug === 'home') {
                    slug = '';
                }
                return `
                    <url>
                        <loc>${`https://stayorli.com/${slug}`}</loc>
                        <lastmod>${modified.substring(0, 10)}</lastmod>
                        <changefreq>monthly</changefreq>
                    </url>
                `;
            })
            .join('')}
            ${postSlugs
            .map(({ slug, modified }) => {
                
                if (slug === 'home') {
                    slug = '';
                }
                return `
                    <url>
                        <loc>${`https://stayorli.com/${slug}`}</loc>
                        <lastmod>${modified.substring(0, 10)}</lastmod>
                        <changefreq>monthly</changefreq>
                    </url>
                `;
            })
            .join('')}
            ${roomsSlugs
            .map(({ slug, modified }) => {
                
                if (slug === 'home') {
                    slug = '';
                }
                return `
                    <url>
                        <loc>${`https://stayorli.com/rooms/${slug}`}</loc>
                        <lastmod>${modified.substring(0, 10)}</lastmod>
                        <changefreq>monthly</changefreq>
                    </url>
                `;
            })
            .join('')}
            ${offersSlugs
            .map(({ slug, modified }) => {
                
                if (slug === 'home') {
                    slug = '';
                }
                return `
                    <url>
                        <loc>${`https://stayorli.com/offers/${slug}`}</loc>
                        <lastmod>${modified.substring(0, 10)}</lastmod>
                        <changefreq>monthly</changefreq>
                    </url>
                `;
            })
            .join('')}
        </urlset>
        `
    )
};

class Sitemap extends React.Component {
    static async getInitialProps({ res }) {
        const resWithData = await fetch(process.env.WP_GQL_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                    query Everything {
                        pages(first: 300) {
                            nodes {
                                slug
                                modified
                            }
                        }
                        rooms(first: 300) {
                            nodes {
                                slug
                                modified
                            }
                        }
                        posts(first:300) {
                            nodes {
                                slug
                                modified
                            }
                        }
                        offers(first:300) {
                            nodes {
                                slug
                                modified
                            }
                        }
                    }
                `,
            }),
        });
        const data = await resWithData.json();

        res.setHeader('Content-Type', 'text/xml');
        res.write(createSitemap(data));
        res.end();
  }
}

export default Sitemap;