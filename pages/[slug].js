import { useEffect } from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Components
import Hero from '../components/hero';
import BlurbCenter from '../components/blurbCenter';
import BlurbLeft from '../components/blurbLeft';
import RoomSlider from '../components/roomSlider';
import AmenitiesSlider from '../components/amenitiesSlider';
import OurMission from '../components/ourMission';
import Gatherings from '../components/gatherings';
import FullFeatureBlog from '../components/fullFeatureBlog';
import SpotifyFeature from '../components/spotifyFeature';
import FauxSocialFeed from '../components/fauxSocialFeed';
import SEO from '../components/seo';
import DiscoveriesCallout from '../components/discoveriesCallout';
import BigImageSmallContent from '../components/bigimageSmallcontent';
import HistoricalSlider from '../components/historicalSlider';
import Form from '../components/forms';
import Gallery from '../components/gallery';
import FeaturedStorySlider from '../components/FeaturedStorySlider';
import AnchorBar from '../components/AnchorBar';


export default function DefaultPage(props) {

    const { seo } = props.data.data.pageBy;
    const { sections } = props.data.data.pageBy.flexibleContent;  

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

    const gatherSections = () => {
        const gatheredSections = []

        for (const [index, section] of sections.entries()) {

            const componentKey = `section-${index}`;

            switch (section.fieldGroupName) { 
                case 'Page_Flexiblecontent_Sections_AnchorBar':
                    gatheredSections.push(<AnchorBar key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_Hero':
                    gatheredSections.push(<Hero key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_HistoricTimeline':
                    gatheredSections.push(<HistoricalSlider key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_CenteredCopy':
                    gatheredSections.push(<BlurbCenter key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_RoomsSlider':
                    gatheredSections.push(<RoomSlider key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_DiscoveriesCallout':
                    gatheredSections.push(<DiscoveriesCallout key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_AmenitiesSlider':
                    gatheredSections.push(<AmenitiesSlider key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_OurMission':
                    gatheredSections.push(<OurMission key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_GatheringsCallout':
                    gatheredSections.push(<Gatherings key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_FeaturedJournal':
                    gatheredSections.push(<FullFeatureBlog key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_FollowAlong':
                    gatheredSections.push(<FauxSocialFeed key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_SpotifyFeature':
                    gatheredSections.push(<SpotifyFeature key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_BigImageSmallContent':
                    gatheredSections.push(<BigImageSmallContent key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_Form':
                    gatheredSections.push(<Form key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_Gallery':
                    gatheredSections.push(<Gallery key={componentKey} {...section} />)
                    break;
                case 'Page_Flexiblecontent_Sections_FeaturedStorySlider':
                    gatheredSections.push(<FeaturedStorySlider key={componentKey} {...section} />)
                default:
                    break;
            }
        }

        return gatheredSections
    }
    return (
        <>
            <SEO title={seo.title} description={seo.metaDesc} />
            {gatherSections()}
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
                query Pages {
                    pages {
                        nodes {
                            slug
                        }
                    }
                }
            `
        })
    })

    const pages = await res.json()
    
    const paths = pages.data.pages.nodes.map(page => ({
        params: { slug: page.slug }
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
    const pageQuery = `query AllComponents {
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
                pageBy(uri: "${slug}") {
                    seo {
                        title
                        metaDesc
                    }
                    flexibleContent {
                        sections {
                            ... on Page_Flexiblecontent_Sections_Gallery {
                                fieldGroupName
                                items {
                                    ... on Page_Flexiblecontent_Sections_Gallery_items {
                                        type
                                        filter
                                        image {
                                            altText
                                            mediaItemUrl
                                        }
                                        mp4ExternalLink
                                        webm
                                    }
                            ... on Page_Flexiblecontent_Sections_AnchorBar {
                                fieldGroupName
                                anchorNavigation {
                                    icon
                                    text
                                    anchor
                                }
                            }
                            ... on Page_Flexiblecontent_Sections_AmenitiesSlider {
                                fieldGroupName
                                subHeadline
                                headline
                                ctaLink
                                ctaText
                                amenities {
                                    ... on Amenity {
                                        title
                                        featuredImage {
                                            ... on NodeWithFeaturedImageToMediaItemConnectionEdge {
                                                node {
                                                    ... on MediaItem {
                                                        altText
                                                        mediaItemUrl
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            ... on Page_Flexiblecontent_Sections_BigImageSmallContent {
                                fieldGroupName
                                contentPosition
                                blurb
                                subHeadline
                                headline
                                icon {
                                    mediaItemUrl
                                    altText
                                }
                                imagePoster {
                                    mediaItemUrl
                                    altText
                                }
                                mediaFullWidth
                                mediaType
                                mp4OrExternalLink
                                webm
                                slides {
                                    altText
                                    mediaItemUrl
                                }
                                paddingType
                                anchorTag
                            }
                            ... on Page_Flexiblecontent_Sections_CenteredCopy {
                                fieldGroupName
                                blurb
                                hasBackgroundMedia
                                headline
                                icon {
                                    altText
                                    mediaItemUrl
                                }
                                imagePoster {
                                    altText
                                    mediaItemUrl
                                }
                                mp4ExternalLink
                                webm
                                greyBackground
                            }
                            ... on Page_Flexiblecontent_Sections_DiscoveriesCallout {
                                fieldGroupName
                                blurb
                                ctaLink
                                ctaText
                                icon {
                                    altText
                                    mediaItemUrl
                                }
                                media {
                                    ... on Page_Flexiblecontent_Sections_DiscoveriesCallout_media {
                                        type
                                        imagePoster {
                                            altText
                                            mediaItemUrl
                                        }
                                        mp4
                                        webm
                                    }
                                }
                                title
                            }
                            ... on Page_Flexiblecontent_Sections_EventSlider {
                                fieldGroupName
                                blurb
                                ctaLink
                                ctaText
                                headline
                                subHeadline
                                events {
                                    ... on Page_Flexiblecontent_Sections_EventSlider_events {
                                        eventType
                                        eventImage {
                                            altText
                                            mediaItemUrl
                                        }
                                    }
                                }
                            }
                            ... on Page_Flexiblecontent_Sections_FeaturedJournal {
                                fieldGroupName
                                subHeadline
                                headline
                                blurb
                                ctaText
                                ctaLink
                                featuredJournal {
                                    ... on Post {
                                        featuredImage {
                                            ... on NodeWithFeaturedImageToMediaItemConnectionEdge {
                                                node {
                                                    altText
                                                    mediaItemUrl
                                                }
                                            }
                                        }
                                        title
                                        uri
                                    }
                                }
                            }
                            ... on Page_Flexiblecontent_Sections_FollowAlong {
                                fieldGroupName
                                backgroundColor
                                ctaLink
                                ctaText
                                headline
                                image {
                                    altText
                                    mediaItemUrl
                                }
                            }
                            ... on Page_Flexiblecontent_Sections_Form {
                                fieldGroupName
                                blurb
                                headline
                                subHeadline
                                type
                            }
                            ... on Page_Flexiblecontent_Sections_GatheringsCallout {
                                fieldGroupName
                                ctaLink
                                ctaText
                                headline
                                subHeadline
                                blurb
                                type
                                anchorTag
                                events {
                                    ... on Event {
                                        link
                                        title
                                        date
                                        categories {
                                            nodes {
                                                name
                                            }
                                        }
                                    }
                                }
                                media {
                                    ... on Page_Flexiblecontent_Sections_GatheringsCallout_media {
                                        imagePoster {
                                            altText
                                            sourceUrl
                                        }
                                        mp4
                                        type
                                        webm
                                        ctaText
                                        ctaLink
                                    }
                                }
                            }
                            ... on Page_Flexiblecontent_Sections_Hero {
                                fieldGroupName
                                blurb
                                headline
                                includeBookingForm
                                mp4ExternalLink
                                types
                                webm
                                imagePoster {
                                    mediaItemUrl
                                    altText
                                }
                                subnavigation {
                                    ...on Page_Flexiblecontent_Sections_Hero_subnavigation {
                                        link
                                        label
                                        iconnav {
                                            altText
                                            mediaItemUrl
                                        }
                                    }
                                }
                            }
                            ... on Page_Flexiblecontent_Sections_HistoricTimeline {
                                fieldGroupName
                                years {
                                    ... on Page_Flexiblecontent_Sections_HistoricTimeline_years {
                                            year
                                            caption
                                            image {
                                                altText
                                                mediaItemUrl
                                            }
                                        }
                                    }
                                }
                            ... on Page_Flexiblecontent_Sections_OurMission {
                                fieldGroupName
                                logo {
                                    altText
                                    mediaItemUrl
                                }
                                headline
                                animatableTexts {
                                    title
                                }
                            }
                            ... on Page_Flexiblecontent_Sections_RoomsSlider {
                                fieldGroupName
                                rooms {
                                        ... on Room {
                                        featuredImage {
                                            node {
                                            altText
                                            mediaItemUrl
                                            }
                                        }
                                        title
                                    }
                                }
                            }
                            ... on Page_Flexiblecontent_Sections_RoomsGrid {
                                fieldGroupName
                                rooms {
                                    ... on Room {
                                        title
                                        slug
                                        featuredImage {
                                            node {
                                            altText
                                            mediaItemUrl
                                            }
                                        }
                                    }
                                }
                            }
                            ... on Page_Flexiblecontent_Sections_SpotifyFeature {
                                fieldGroupName
                                headline
                                ctaLink
                                ctaText
                                spotifyEmbed
                            }  
                            ... on Page_Flexiblecontent_Sections_Form {
                                fieldGroupName
                                type
                                subHeadline
                                headline
                                blurb
                                anchorTag
                            }
                        }
                    }
                }
            }`
    
    // Get page sections and SEO data
    const res = await fetch(process.env.WP_GQL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: pageQuery })
    })

    const data = await res.json()
    const page = data
    
    return {
        props: {
            data: page
        }
    }
}