import { useEffect, useState } from 'react';
import Link from 'next/link';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Hero from '../../components/hero';
import SEO from '../../components/seo';
import styled from 'styled-components';

import ToggleCaret from '../../public/assets/icons/Orli_Caret.svg';

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
  margin: -8rem 0 0 0;
  z-index: 1;
  max-height: calc();
  @media screen and (max-width: 800px) {
    order: 1;
  }
`
const FeatureContainer = styled.div`
  margin: 4.5rem 0 3rem;
`
const FeatureList = styled.div`
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4,150px);
  gap: 1rem;


  text-align: center;

  div {
    max-width: 130px;
  }

  img {
    height: 100px;
    width: auto;
  }

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 150px);
  }
  @media screen and (max-width: 820px) {
    grid-template-columns: repeat(2, 150px);
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(3, 150px);
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 50%);
  }
  @media screen and (max-width: 370px) {
    grid-template-columns: repeat(1, 100%);
  }
`
const AmenitiesContainer = styled.div`
  margin: 3rem 0; 
`
const AmenitiesList = styled.ul`
  list-style-type: none;
  columns: 2;

  padding-inline-start: 0 !important;

  @media screen and (max-width: 600px) {
    columns: 1;
  }
`
const AboutOrliContainer = styled.div`
  margin: 3rem 0;
`
const NeighborhoodContainer = styled.div`
  margin: 3rem 0;
`
const BulletItem = styled.li`
  display: flex;
  justify-content: space-between; 
  font-size: 1.3rem;

  @media screen and (max-width: 955px) {
    flex-direction: column;
    p:first-of-type {
      margin-bottom: 0;
    }
    p:last-of-type {
      margin-top: 0;
    }
  }
`
const GreyBackground = styled.div`
  background-color: var(--lt-grey);
  padding: 2rem;
  margin: 1rem 0 3rem;
  position: relative;
  top: 0rem;
  z-index: 8;

  @media screen and (max-width: 800px) {
    top: 1rem;
  }
`
const ReservationForm = styled.form``
const ReservationFormLabel = styled.label`
  display: flex;
  justify-content: space-between; 
  align-items: center;
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
  const [showingFloorplan, setShowingFloorplan] = useState(false)

  const { room } = props.data.data;

  useEffect(() => {
    var tl =  gsap.timeline()
    tl.fromTo('header', {opacity: 0}, { opacity:1, duration: 0.5});
    tl.to('main', { opacity:1, duration: 0.6});
  }, [])

  useEffect(() => {
    var	wideScreen = window.matchMedia("(min-width: 800px)");
    var	narrowScreen = window.matchMedia("(max-width: 799px)");

    var content = gsap.utils.toArray('.content');
    var sidebar = gsap.utils.toArray('.sidebar');

    if(wideScreen.matches) {
      gsap.to(sidebar, {
        scrollTrigger: {
            trigger: content,
            start: "top-=40px 150px",
            endTrigger: "footer",
            end: "top-=0px 0px",
            pin: sidebar,
            markers: false,
            onRefresh: self => self.pin.parentNode.style.float = "right",
            pinSpacing: false,
        }, y: 0
      });
    }
  }, [])
  
  return (
    <>
      <SEO fullhead={room.seo.fullHead} />
      <Hero types="Single Room" imagePoster={room.featuredImage} />

      <SingleRoomContentContainer className="content">
        <SingleRoomContent>
          <SingleRoomMainDesc className="sans-serif body-copy black">
            <p className="sans-serif-bold sub-heading">Sleeps {room.singleRooms.sleeps}</p>
            <h1 className="heading">{room.title}</h1>
            <p>{room.singleRooms.description}</p>
            <p className="sans-serif xs-copy underline mb-3" onClick={() => setShowingFloorplan(!showingFloorplan)}><a>View Floor Plan <img src="/assets/icons/Orli_Caret.svg" width="12px" height="7px" /></a></p>
            {
              showingFloorplan && room.singleRooms.floorplan && <img src={room.singleRooms.floorplan.mediaItemUrl} alt={room.singleRooms.floorplan.altText} width="90%" height="auto" style={{ marginInline: 'auto' }} />
            }
          </SingleRoomMainDesc>

          <FeatureContainer>
            <p className="sans-serif-bold sub-heading">Highlights</p>
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
            <p className="sans-serif-bold sub-heading">Features</p>
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
                  return <BulletItem key={index} className="serif black uppercase brown">
                    { bullet.pointOfInterest && ( 
                    <p>{bullet?.pointOfInterest}</p>
                    )}
                    { bullet.walkability && ( 
                    <p>{bullet?.walkability}</p>
                    )}
                 </BulletItem>
                })
              }
            </ul>
          </NeighborhoodContainer>
          <p className="sans-serif xs-copy underline arrow-left relative"><Link href="/find-your-room">Back to All Rooms</Link></p>
        </SingleRoomContent>

        <SingleRoomBookingForm className="sidebar">
          <GreyBackground>
            <p className="sans-serif-bold sub-heading">Sleeps {room.singleRooms.sleeps}</p>
            <p className="heading">Reservations</p>
            <ReservationForm action={room.singleRooms.cloudbedsLink} method="POST" target="_blank">
              <ReservationFormLabel className="sans-serif uppercase">Check In<input type={"date"} name="widget_date" placeholder="Add Dates" className="sans-serif"/></ReservationFormLabel><br />
              <ReservationFormLabel className="sans-serif uppercase">Check Out<input type={"date"} name="widget_date_to" placeholder="Add Dates" className="sans-serif"/></ReservationFormLabel>
              <ReservationButton className="sans-serif uppercase">Check Availability</ReservationButton>
            </ReservationForm>
          </GreyBackground>
        </SingleRoomBookingForm>
      </SingleRoomContentContainer>
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
          floorplan {
            mediaItemUrl
            altText
          }
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