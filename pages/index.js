import { useRef, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import styles from '../styles/Home.module.css'

import SEO from '../components/seo'
import Hero from '../components/hero';
import BlurbCenter from '../components/blurbCenter';
import BlurbLeft from '../components/blurbLeft';
import RoomSlider from '../components/roomSlider';
import TwoStaggeredPhotos from '../components/twoStaggeredImages';
import AmenitiesSlider from '../components/amenitiesSlider';
import OurMission from '../components/ourMission';
import Gatherings from '../components/gatherings';
import FullFeatureBlog from '../components/fullFeatureBlog';
import SpotifyFeature from '../components/spotifyFeature';
import FauxSocialFeed from '../components/fauxSocialFeed';

gsap.registerPlugin(ScrollTrigger);

export default function Home(props) {
  const { seo } = props.data.pageBy;
  const { hero } = props.data.pageBy.hero;
  const { introCopy } = props.data.pageBy.introCopy;
  const { nodes: rooms } = props.data.rooms;
  const { nodes: amenities } = props.data.amenities;
  
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

  return (
    <>
      <SEO title={seo.title} description={seo.metaDesc} />
      <Hero
        poster={hero.image.sourceUrl}
        mp4={hero.mp4File.sourceUrl}
        webm={hero.webmFile.sourceUrl}
        withBookingForm />
      <BlurbCenter
        content={introCopy.copy}
        icon={introCopy.icon.sourceUrl} 
        altText={introCopy.icon.altText}
        center />
      <RoomSlider rooms={rooms} />
      <section>
        <div className="max-80">
          <BlurbLeft
            title="DISCOVERIES"
            content="Explore La Jolla the local’s way. From secluded beaches and swimmable sea caves to favorite cafes, restaurants, boutiques and more, we’ll point you in the right direction."
            ctaText="Map it Out"
            ctaLink="/"
            icon="https://stayorli.com/wp-content/uploads/2022/01/icon-shell.svg" />
          <TwoStaggeredPhotos left="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" right="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" />
        </div>
      </section>
      <AmenitiesSlider
        amenities={amenities}
        subHeader={"Tasteful Touches"}
        header={"Everything You Need to Pioneer Your Perfect Stay"}
        ctaText={"Explore More"}
        ctaLink={"/amenities"} />
      <OurMission
        title="Our Mission"
        logo="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg"
        text="is Intentional" />
      <Gatherings />
      <FullFeatureBlog
        title="The Journal"
        blurb="Discover La Jolla through the lens of the locals – Founders Hailey and Max.  "
        ctaText="Stay in the Know"
        ctaLink="/"
        image="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg"
        articleTitle="7 Stylish Speakeasies to Visit in San Diego"
        articleLink="/" />
      <SpotifyFeature />
      <FauxSocialFeed />
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(process.env.WP_GQL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query PageHome {
          myOptionsPage {
            options {
              announcementBarText
              fieldGroupName
              isAnnouncementBarActive
            }
          }
          pageBy(pageId: 68) {
            seo {
              metaDesc
              title
            }
            hero {
              hero {
                caption
                hasVideo
                headline
                image {
                  sourceUrl
                }
                mp4File {
                  sourceUrl
                }
                webmFile {
                  sourceUrl
                }
              }
            }
            introCopy {
              introCopy {
                copy
                icon {
                  altText
                  sourceUrl
                }
              }
            }
          }
          rooms {
            nodes {
              title
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
          amenities(where: { orderby: {field: DATE, order: ASC} } ) {
            nodes {
              title
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }
      `,
    }),
  })

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch page data.')
  }

  return {
    props: {
      data: json.data
    },
  }
}

