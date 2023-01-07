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
    height: auto;
    display: flex;
    flex-direction: row;
    z-index: 2;

    @media screen and (max-width: 865px) {
        flex-direction: column;
    }
`;
const ImageContainer = styled.div`
    flex: 1.5;
    padding: 8rem 0rem 3rem 6rem;
    @media screen and (max-width: 865px) {
        padding: 0;
    }
`;
const TextContainer = styled.div`
    padding: 8rem 6rem 3rem 6rem;
    /* width: 40%; */
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    & h2,
    & h1 {
        width: 100%;
    }
    & h1 {
        padding: 0;
    }
    & h3 {
        margin-block-start: 0em;
        margin-block-end: 1em;
    }
    & ul {
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 1rem;
    }
    & ul li,
    & p {
        line-height: 1.5;
        font-size: var(--body-copy);
    }

    & .terms-link {
        width: 100%;
        margin: auto;
        display: block;
        padding: 1rem 0 0 0;
    }

    & .terms-link a:visited,
    & .terms-link a:focus {
        color: var(--white);
    }

    @media only screen and (max-width: 1100px) {
        & {
            padding: 8rem 3rem 3rem;
        }
    }
    @media screen and (max-width: 865px) {
        padding-top: 3rem;
        width: 75vw;
        margin: 0 auto;
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
        & .white {
            color: #000;
        }
    }
`;

const ReservationButton = styled.button`
    margin: 0;
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

const QuickViewContainer = styled.dialog`
    width: 100%;
    height: 100vh;
    border: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 9999999999;
    display: none;
    place-items: center;

    &.show {
        display: grid;
    }

    & #closeBtn p {
        font-size: 2rem;
        margin: 0;
        position: absolute;
        right: 2rem;
        color: #ffffff;
        top: 2rem;
    }
    & .inner {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        margin: auto 10% 1rem;
        background: #ffffff;
    }
    & .inner p {
        font-family: "GT Walsheim Light";
        color: #000;
        font-size: var(--body-copy);
    }
    @media only screen and (max-width: 600px) {
        & .inner {
            display: flex;
            flex-direction: column;
            padding: 2rem;
            height: 70vh;
            margin: 0rem 1rem 0rem 1rem;
            overflow: scroll;
            background: #ffffff;
        }
    }
`;

export default function DefaultOffersPage(props) {
    const { offer } = props.data.data;

    const [isActive, setIsActive] = useState(false);
    const handleClick = e => {
        e.preventDefault();

        setIsActive(current => !current);
    };

    const closeClick = e => {
        e.preventDefault();

        setIsActive(false);
    };

    useEffect(() => {
        var tl = gsap.timeline();
        tl.fromTo("header", { opacity: 0 }, { opacity: 1, duration: 0.5 });
        tl.to("main", { opacity: 1, duration: 0.6 });
    }, []);

    return (
        <>
            <SEO fullhead={offer.seo.fullHead} />
            <SingleOfferContainer className="content">
                <QuickViewContainer
                    dialog
                    id="roomdialog"
                    className={isActive ? "show" : ""}>
                    <div className="ContentContainer">
                        <div
                            id="closeBtn"
                            className="heading"
                            onClick={closeClick}>
                            <p>&#10005;</p>
                        </div>
                        <div className="inner">
                            <h3 className="serif heading black left">
                                Terms & Conditions
                            </h3>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `${offer.singleOffers.offerTermsConditions}`,
                                }}></div>
                        </div>
                    </div>
                </QuickViewContainer>
                <SingleOfferContent>
                    <ImageContainer>
                        <Image
                            src={offer.singleOffers.offerImage.mediaItemUrl}
                            alt={offer.singleOffers.offerImage.altText}
                            width={853}
                            height={698}
                            // width={1728}
                            // height={1003}
                            layout="responsive"
                        />
                    </ImageContainer>
                    <TextContainer>
                        <h2 className="sans-serif-bold sub-heading left">
                            Offers
                        </h2>
                        <h1 className="serif heading left">{offer.title}</h1>
                        { offer.singleOffers.highlights &&
                            <h3 className="sans-serif body left black">{offer.singleOffers.highlights}</h3>
                        }
                        <div
                            className="sans-serif left"
                            dangerouslySetInnerHTML={{
                                __html: `${offer.singleOffers.offerDescription}`,
                            }}></div>
                        <ReservationButton>
                            <Link
                                href={`${offer.singleOffers.bookingLink}`}
                                passHref>
                                <a target="_blank">Book Now</a>
                            </Link>
                        </ReservationButton>
                        <p className="terms-link sans-serif body underline left" style={{ cursor: "pointer" }} onClick={handleClick}>Terms & Conditions</p>
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
          offerTermsConditions
          highlights
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
