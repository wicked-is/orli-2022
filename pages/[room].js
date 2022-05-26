import { useEffect } from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from '../styles/singleRooms.module.css'

// Components
import SEO from '../components/seo';


export default function DefaultRoomsPage(props) {

    const { seo } = props.data.data.room;

    useEffect(() => {
        var tl =  gsap.timeline()
            tl.fromTo('main', {opacity:0}, { opacity:1, delay: 0.5, duration: 1});

        var sections = gsap.utils.toArray('.fade');

        sections.forEach((section) => {
            gsap.to(section, { autoAlpha: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "+=0 80%",
                    scrub: false,
                    markers: false,
                    toggleActions: "play reverse play reverse"
                }
            });
        })
    },[])

    console.log(props);
    return (
        <>
            <SEO title={seo.title} description={seo.metaDesc} />
            <div className={styles.heroContainer}>
                    <div className={styles.bigHero} style={{
                        backgroundImage: `url(${rooms.nodes.featuredImage.node.mediaItemUrl})`
                    }}>
                        <div className={styles.herotextOver}>
                        <p className="sans-serif sub-heading-bold white">{rooms.nodes.title}</p>
                        </div>
                    </div>
            </div>
        </>
    )
}

// Get all dynamic [slug]s from the CMS
export async function getStaticPaths() {

    const res = await fetch(process.env.WP_GQL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
                query Rooms {
                    rooms {
                        nodes {
                            slug
                        }
                    }
                }
            `
        })
    })

    const rooms = await res.json()
    
    const paths = rooms.data.rooms.nodes.map(page => ({
        params: { slug: room.slug }
    }));

    return {
        paths,
        fallback: false,
    }
}

// Get relative [slug] data
export async function getStaticProps({ params }) {
    const { slug } = params ? params : { slug: 'home' };
    /**
     * TODO: Breakout fragments into seperate files or consts
     */
    
    // Query for Sections and SEO data
    const roomsQuery = `
query AllComponents {
  myOptionsPage {
    options {
      navigation {
        navigationItems {
          image {
            altText
            mediaItemUrl
          }
          label
          link
        }
      }
      announcementBar {
        announcementBarText
        isAnnouncementBarActive
      }
    }
  }

  rooms(first: 99) {
    nodes {
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      id
      title
      singleRooms {
        description
        features {
          fieldGroupName
          label
          icon {
            altText
            mediaItemUrl
          }
        }
        keyFeature
        neighborhoodTitle
        neighborhoodDescription
        sleeps
        squareFeet
        theme
        neighborhoodBullets {
          fieldGroupName
          pointOfInterest
          walkability
        }
        aboutOrliTitle
        aboutOrliDescription
        amenities
      }
    }
  }
  
}`
    
    // Get page sections and SEO data
    const res = await fetch(process.env.WP_GQL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: roomsQuery })
    })

    const data = await res.json()
    const page = data
    
    return {
        props: {
            data: page
        }
    }
}