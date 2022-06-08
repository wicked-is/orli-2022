import { useEffect, useState } from 'react';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Hero from '../../components/hero';
import SEO from '../../components/seo';

import styled from 'styled-components';
import FauxSocialFeed from '../../components/fauxSocialFeed';

const SingleRoomContentContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  max-width: 80vw;
  margin: auto auto 3rem; 
  gap: 2rem;

  @media screen and (max-width: 800px) {
    flex-direction: column !important;
    flex-wrap: wrap;
    gap: unset;
  }
`

const SingleRoomContent = styled.div`
  width: 100%;
  flex: 2;
  margin-top: 3rem;
  
  @media screen and (max-width: 800px) {
    flex: 1;
    width: 100%;
    order: 2;
  }
`

const SingleRoomMainDesc = styled.div``

const SingleRoomBookingForm = styled.div`
  width: 100%;
  flex: 1;
  @media screen and (max-width: 800px) {
    order: 1;
  }
`

const FeatureContainer = styled.div`
  margin: 3rem 0;
`

const FeatureList = styled.div`
  list-style-type: none;
  display: inline-flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;

  text-align: center;

  img {
    height: 100px;
    width: auto;
  }
`

const AmenitiesContainer = styled.div`
  margin: 3rem 0; 
`
const AmenitiesList = styled.ul`
  list-style-type: none;
  columns: 2;

  padding-inline-start: 0 !important;
`

const AboutOrliContainer = styled.div`
  margin: 3rem 0;
`

const NeighborhoodContainer = styled.div`
  margin: 3rem 0;
`

const GreyBackground = styled.div`
  background-color: var(--lt-grey);
  padding: 2rem;
  margin: 1rem 0 3rem;
  position: relative;
  top: -17.5rem;

  @media screen and (max-width: 800px) {
    top: 1rem;
  }
`

const ReservationForm = styled.form``

const ReservationFormLabel = styled.label`
  display: flex;
  justify-content: space-between; 
  * {
    flex: 1
    max-width: 50%
  }

  &:first-of-type {
    margin-top: 2rem;
  }
  &:last-of-type {
    margin-bottom: 2rem;
  }

  input {
    background-color: transparent;
    border: 0px;
    text-align: center;

    &:after {

    }
  }
`

const ReservationButton = styled.button`
  width: 100%;
  height: 5rem;
  color: #fff;
  border: 0;
  background-color: var(--brown);

`

export default function DefaultRoomsPage(props) {

  const [checkInType, setCheckInType] = useState('text');
  const [checkOutType, setCheckOutType] = useState('text');

  const { room } = props.data.data;

  useEffect(() => {  
      var tl =  gsap.timeline()
      tl.fromTo('header', {opacity: 0}, { opacity:1, duration: 0.5});
      tl.to('main', { opacity:1, duration: 0.6});

      var sections = gsap.utils.toArray('.fadein');

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
      <SEO fullhead={room.seo.fullHead} />
      <Hero types="Single Room" imagePoster={room.featuredImage} />

      <SingleRoomContentContainer>
        <SingleRoomContent>
          <SingleRoomMainDesc className="sans-serif body-copy black">
            <p className="sans-serif-bold sub-heading">Sleeps {room.singleRooms.sleeps}</p>
            <h1 className="heading">{room.title}</h1>
            <p>{room.singleRooms.description}</p>
            <p className="sans-serif xs-copy underline"><a>View Floorplan</a></p>
          </SingleRoomMainDesc>

          <FeatureContainer>
            <p className="sans-serif-bold sub-heading">Features</p>
            <FeatureList>
              {
                room.singleRooms.features.map((feature, index) => {
                  return <div key={index} className="sans-serif body-copy black">
                    { feature.icon && (
                    <img src={feature?.icon?.mediaItemUrl} alt={feature.altText} />
                    )}
                    <p>{feature.label}</p>
                  </div>
                })
              }
            </FeatureList>
          </FeatureContainer>

          <AmenitiesContainer>
            <p className="sans-serif-bold sub-heading">In-Room Amentities</p>
            <AmenitiesList>
              {
                room.singleRooms.amenities.map((amenity, index) => {
                  return <li key={index} style={{ marginBottom: '.5rem'}} className="sans-serif body-copy black">
                    {amenity}
                  </li>
                })
              }
            </AmenitiesList>
            <p className="sans-serif body-copy black" style={{ marginTop: '2rem' }}>When booking, see available add-on amenities including the Wellness Package, Pup Package, and more.</p>
          </AmenitiesContainer>

          <AboutOrliContainer>
            <h2 className="heading">{room.singleRooms.aboutOrliTitle}</h2>
            <div className="sans-serif body-copy black" dangerouslySetInnerHTML={{ __html: room.singleRooms.aboutOrliDescription }}></div>
          </AboutOrliContainer>

          <NeighborhoodContainer>
            <h2 className="heading">{room.singleRooms.neighborhoodTitle}</h2>
            <div className="sans-serif body-copy black" dangerouslySetInnerHTML={{ __html: room.singleRooms.neighborhoodDescription }}></div>
            <ul style={{ paddingInline: 0 }}>
              { 
                room.singleRooms.neighborhoodBullets.map((bullet, index) => {
                  return <li key={index} className="serif black uppercase brown" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem' }}>
                    { bullet.pointOfInterest && ( 
                    <p>{bullet?.pointOfInterest}</p>
                    )}
                    { bullet.walkability && ( 
                    <p>{bullet?.walkability}</p>
                    )}
                 </li>
                })
              }
            </ul>
          </NeighborhoodContainer>
          <p className="sans-serif xs-copy underline arrow-left relative">Back to All Rooms</p>
        </SingleRoomContent>

        <SingleRoomBookingForm>
          <GreyBackground>
            <p className="sans-serif-bold sub-heading">Sleeps {room.singleRooms.sleeps}</p>
            <p className="heading">Reservations</p>
            <ReservationForm action={room.singleRooms.cloudbedsLink ? room.singleRooms.cloudbedsLink : 'https://hotels.cloudbeds.com/reservation/uK87lN'} method="POST">
              <ReservationFormLabel className="sans-serif uppercase">Check In<input type={checkInType} onFocus={() => setCheckInType('date')} name="widget_date" placeholder="Add Dates" className="sans-serif"/></ReservationFormLabel><br />
              <ReservationFormLabel className="sans-serif uppercase">Check Out<input type={checkOutType} name="widget_date_to" placeholder="Add Dates" onFocus={() => setCheckOutType('date')} className="sans-serif"/></ReservationFormLabel>
              <ReservationButton className="sans-serif uppercase">Check Availability</ReservationButton>
            </ReservationForm>
          </GreyBackground>
        </SingleRoomBookingForm>
      </SingleRoomContentContainer>

      <FauxSocialFeed ctaLink="https://www.instagram.com/stayorli/" ctaText="@StayOrli" headline="Follow Along" backgroundColor="Grey" />
    </>
  )
}

// Get all dynamic [room]s from the CMS
export async function getStaticPaths() {

    const res = await fetch(process.env.WP_GQL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
                query Rooms {
                    rooms(first: 100) {
                        nodes {
                            slug
                        }
                    }
                }
            `
        })
    })

    const rooms = await res.json()
    
    const paths = rooms.data.rooms.nodes.map(room => ({
        params: { room: room.slug }
    }));

    return {
        paths,
        fallback: false,
    }
}

// Get relative [slug] data
export async function getStaticProps({ params }) {
  const { room } = params ;
  
  // Query for Sections and SEO data
  const roomsQuery = `
    query Rooms {
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
      room(id: "${room}", idType: URI) {
        seo {
          fullHead
        }
        singleRooms {
          cloudbedsLink
          aboutOrliDescription
          aboutOrliTitle
          amenities
          description
          keyFeature
          neighborhoodDescription
          neighborhoodTitle
          sleeps
          squareFeet
          theme
          features {
            label
            icon {
              altText
              mediaItemUrl
            }
          }
          neighborhoodBullets {
            pointOfInterest
            walkability
          }
        }
        status
        title
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    }
    `
  
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