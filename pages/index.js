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

gsap.registerPlugin(ScrollTrigger);

export default function Home(props) {
  const { seo } = props.data.pageBy;
  
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
      {/* hero will need to get data from home page */}
      <Hero withBookingForm />
      <BlurbCenter
        content="A reimagined 1910’s-era landmark building in the seaside village of La Jolla, Orli pairs the finesse of a boutique hotel with the spirit of a homestay, delivering unfettered independence and profound experiences through elevated design and tap-away convenience."
        icon="https://stayorli.com/wp-content/uploads/2022/01/icon-shell.svg"
      />
      <RoomSlider images="" />
      <BlurbLeft
        title="DISCOVERIES"
        content="Explore La Jolla the local’s way. From secluded beaches and swimmable sea caves to favorite cafes, restaurants, boutiques and more, we’ll point you in the right direction."
        btnText="Map it Out"
        btnLink="/"
        icon="https://stayorli.com/wp-content/uploads/2022/01/icon-shell.svg"
      />
      <TwoStaggeredPhotos left="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" right="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" />
      <AmenitiesSlider amenities="" />
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
          pageBy(pageId: 68) {
            seo {
              metaDesc
              title
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

