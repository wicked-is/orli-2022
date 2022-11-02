import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "flickity/css/flickity.css";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import SEO from "../../components/seo";
import styled from "styled-components";

import ToggleCaret from "../../public/assets/icons/Orli_Caret.svg";

const SingleOfferContainer = styled.div`
width: inline-block;
margin: auto;
`;
const SingleOfferContent = styled.div`
width: 100%;
height: 100vh;
display: inline-block;
z-index: 2;
background-position: center center;
background-size: cover !important;
-webkit-background-size: cover !important;
-moz-background-size: cover !important;
-o-background-size: cover !important;

& .mobileshow {display: none;}

@media only screen and (max-width: 820px) {
    height: auto;
    background-image: unset !important;
    & .mobileshow {display: block;}
}
`;

const TextContainer = styled.div`
padding: 8rem 6rem;
width: 40%;
display: flex;
flex-wrap: wrap;

& h2, & h1 {width: 100%;}
& h1 {padding: 0rem 0rem 2rem 0rem;}
& ul {
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 1rem;
}
& ul li,
& p {line-height: 1.5}

& .terms-link {
    width: 100%; margin: auto; display: block; padding: 1rem 0 0 0;
}

& .terms-link a:visited,
& .terms-link a:focus {color: var(--white);}
@media only screen and (max-width: 1024px) {
    & {width: 55%;}
}
@media only screen and (max-width: 820px) {
    & {
        padding: 4rem 4rem;
        width: 100%;
        display: inline-block;
        flex-wrap: unset;
    }
    & .terms-link,
    & .terms-link a:visited,
    & .terms-link a:focus,
    & .white {color: #000;}
}
`;

const ReservationButton = styled.button`
    margin: 2rem 0 0 0;
    padding: 1.5rem 4rem;
    color: #fff;
    text-transform: uppercase;
    font-size: var(--xs-copy);
    border: 0;
    font-family: "GT Walsheim Light";
    background-color: var(--brown);
    @media only screen and (max-width: 600px) {
        width: 100%;
    }
`;

export default function DefaultOffersPage(props) {
    const { offer } = props.data.data;

    useEffect(() => {
        var tl = gsap.timeline();
        tl.fromTo("header", { opacity: 0 }, { opacity: 1, duration: 0.5 });
        tl.to("main", { opacity: 1, duration: 0.6 });
    }, []);

    return (
        <>
            <SEO fullhead={offer.seo.fullHead} />
            <SingleOfferContainer className="content">
                <SingleOfferContent style={{
                    backgroundImage: `url(${offer.singleOffers.offerImage.mediaItemUrl})`
                }}>
                    <div className="mobileshow">
                        <Image src={offer.singleOffers.offerImage.mediaItemUrl} alt={offer.singleOffers.offerImage.altText} width={1728} height={1003} layout="responsive"/>
                    </div>
                    <TextContainer>
                        <h2 className="sans-serif-bold sub-heading white left">Offers</h2>
                        <h1 className="serif heading white left">{offer.title}</h1>
                        <div className="sans-serif white left" dangerouslySetInnerHTML={{
                            __html: `${offer.singleOffers.offerDescription}`,
                        }}></div>
                        <ReservationButton>
                            <Link href={`${offer.singleOffers.bookingLink}`} passHref>
                                <a target="_blank">Book Now</a>
                            </Link>
                        </ReservationButton>
                        <p className="terms-link sans-serif white body underline left">
                            <Link href="/terms-conditions">Terms & Conditions</Link>
                        </p>
                    </TextContainer>
                </SingleOfferContent>
            </SingleOfferContainer>
        </>
    );
}

// Get all dynamic [offer]s from the CMS
export async function getStaticPaths() {
    const res = await fetch(process.env.WP_GQL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `
                query Offers {
                    offers(first: 100) {
                        nodes {
                            slug
                        }
                    }
                }
            `,
        }),
    });

    const offers = await res.json();

    const paths = offers.data.offers.nodes.map(offer => ({
        params: { offer: offer.slug },
    }));

    return {
        paths,
        fallback: false,
    };
}

// Get relative [slug] data
export async function getStaticProps({ params }) {
    const { offer } = params;

    // Query for Sections and SEO data
    const offersQuery = `
    query Offers {
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
      offer(id: "${offer}", idType: URI) {
        seo {
          fullHead
        }
        singleOffers {
          bookingLink
          offerImage {
            mediaItemUrl
            altText
          }
          offerDescription
        }
        status
        slug
        title
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    }
    `;

    // Get page sections and SEO data
    const res = await fetch(process.env.WP_GQL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: offersQuery }),
    });

    // If status is not OK.
    if (!res?.ok) {
        return {
            notFound: true,
        };
    }

    let page;

    // Try...catch method is best way to get data on build runtime.

    try {
        const data = await res?.text();
        page = JSON.parse(data);
    } catch (e) {
        return {
            notFound: true,
        };
    }

    if (!page) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            data: page,
        },
    };

    // const data = await res.json()
    // const page = data

    // return {
    //     props: {
    //         data: page
    //     }
    // }
}