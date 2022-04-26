export { default, getStaticProps } from '../pages/[slug].js';

// import { useRef, useEffect } from 'react';
// import Link from 'next/link'
// import Head from 'next/head'
// import Image from 'next/image'
// import { gsap } from "gsap/dist/gsap";
// import { TextPlugin } from "gsap/dist/TextPlugin";
// import { CustomEase } from "gsap/dist/CustomEase";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// import styles from '../styles/Home.module.css'

// import SEO from '../components/seo'
// import Hero from '../components/hero';
// import BlurbCenter from '../components/blurbCenter';
// import RoomSlider from '../components/roomSlider';
// import AmenitiesSlider from '../components/amenitiesSlider';
// import OurMission from '../components/ourMission';
// import Gatherings from '../components/gatherings';
// import FullFeatureBlog from '../components/fullFeatureBlog';
// import SpotifyFeature from '../components/spotifyFeature';
// import FauxSocialFeed from '../components/fauxSocialFeed';

// gsap.registerPlugin(ScrollTrigger);

// export default function Home(props) {
//   const { seo } = props.data.pageBy;
//   const { hero } = props.data.pageBy.hero;
//   const { introCopy } = props.data.pageBy.introCopy;
//   const { nodes: rooms } = props.data.rooms;
//   const { nodes: amenities } = props.data.amenities;
//   const { nodes: posts } = props.data.posts;
  
//   useEffect(() => {
//     var tl =  gsap.timeline()
// 		tl.fromTo('main', {opacity:0}, { opacity:1, delay: 0.5, duration: 1});

//     var sections = gsap.utils.toArray('.fade');

//     sections.forEach((section) => {
//       gsap.to(section, { autoAlpha: 1,
//         scrollTrigger: {
//           trigger: section,
//           start: "+=0 80%",
//           scrub: false,
//           markers: false,
//           toggleActions: "play reverse play reverse"
//         }
//       });
//     })

//     gsap.registerPlugin(TextPlugin, CustomEase);
//     var timeline = gsap.timeline({repeat: -1});
//     timeline.fromTo(".cursor", {autoAlpha: 0, x:-10},{autoAlpha: 1, duration: 0.5, repeat: -1, ease: "steps(1)"})
//     .to(".textAnimation", {text: {value: "is Intentional"}, duration: 1, delay: 1, ease: "none"})
//     .to(".textAnimation", {delay: 2, duration: 0.5, autoAlpha: 0, display: 'none'})
//     .to(".textAnimation2", {text: {value: "is Local-Minded"}, duration: 1, delay: 1, ease: "none"})
//     .to(".textAnimation2", {delay: 2, duration: 0.5, autoAlpha: 0, display: 'none'})
//     .to(".textAnimation3", {text: {value: "is Effortless by Design"}, duration: 1.5, delay: 1, ease: "none"})
//     .to(".textAnimation3", {delay: 3, duration: 0.5, autoAlpha: 0, display: 'none'})
//     .add(() => timeline.restart())
  
//   },[])
  
//   return (
//     <>
//       <SEO title={seo.title} description={seo.metaDesc} />
//       <Hero
//         heroData={hero}
//         withBookingForm />
//       <BlurbCenter
//         content={introCopy.copy}
//         icon={introCopy.icon.sourceUrl} 
//         altText={introCopy.icon.altText}
//         greyBG />
//       <RoomSlider rooms={rooms} />
//       <DiscoveriesCallout />
//       <AmenitiesSlider amenities={amenities}
//       title="Tasteful Touches"
//       blurb="Everything You Need to Pioneer Your Perfect Stay"
//       cta="Explore More"
//       ctaLink="https://orlidev.wpengine.com/amenities/" />
//       <OurMission
//         title="Our Mission"
//         logo="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg"
//         text1="is Intentional"
//         text2="is Local-Minded"
//         text3="is Effortless by Design" />
//       <Gatherings />
//       <FullFeatureBlog posts={posts}
//         title="The Journal"
//         blurb="Discover La Jolla through the lens of the locals – Founders Hailey and Max.  "
//         ctaText="Stay in the Know"
//         ctaLink="/"
//         />
//       <SpotifyFeature />
//       <FauxSocialFeed />
//     </>
//   )
// }

// export async function getStaticProps() {
//   const res = await fetch(process.env.WP_GQL_API, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       query: `
//         query PageHome {
//           myOptionsPage {
//             options {
//               announcementBarText
//               fieldGroupName
//               isAnnouncementBarActive
//             }
//           }
//           pageBy(pageId: 68) {
//             seo {
//               metaDesc
//               title
//             }
//             hero {
//               hero {
//                 caption
//                 headline
//                 heroTypes
//                 image {
//                   altText
//                   sourceUrl
//                 }
//                 mp4File
//                 webmFile
//               }
//             }
//             introCopy {
//               introCopy {
//                 copy
//                 icon {
//                   altText
//                   sourceUrl
//                 }
//               }
//             }
//           }
//           rooms {
//             nodes {
//               title
//               featuredImage {
//                 node {
//                   altText
//                   sourceUrl
//                 }
//               }
//             }
//           }
//           amenities(where: { orderby: {field: DATE, order: ASC} } ) {
//             nodes {
//               title
//               slug
//               featuredImage {
//                 node {
//                   altText
//                   sourceUrl
//                 }
//               }
//             }
//           }
//           posts(first: 1) {
//             nodes {
//               featuredImage {
//                 node {
//                   altText
//                   sourceUrl
//                 }
//               }
//               title
//               slug
//             }
//           }
//         }
//       `,
//     }),
//   })

//   const json = await res.json();

//   if (json.errors) {
//     console.error(json.errors);
//     throw new Error('Failed to fetch page data.')
//   }

//   return {
//     props: {
//       data: json.data
//     },
//   }
// }

