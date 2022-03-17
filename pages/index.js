import { useRef, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import styles from '../styles/Home.module.css'

import SEO from '../components/seo'
import Hero from '../components/hero';

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
      <Hero />
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

