import Image from "next/image";
import Link from "next/link";
import styled, { css } from "styled-components";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const GiftGridContainer = styled.section `
    width: 100%; 
    margin: auto;
    display: inline-block;
    padding: 4rem 6rem;

    @media only screen and (max-width: 820px) {
        & {
            padding: 4rem 4rem;
        }
    }
    @media only screen and (max-width: 700px) {
        & {
            padding: 4rem 2rem;
        }
    }
`;

const GiftGridInner = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem 0.5rem;
    align-items: flex-start;

    @media only screen and (max-width: 820px) {
        & {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    @media only screen and (max-width: 700px) {
        & {
            grid-template-columns: 1fr 1fr;
        }
    }
    @media only screen and (max-width: 480px) {
        & {
            grid-template-columns: 1fr;
        }
    }
`;

const SingleGift = styled.div `
    position: relative;

    & .sub-heading-bold {
        padding: 1.5rem 0 0.5rem 0;
        margin-block-start: 0em;
        margin-block-end: 0em;
    }

    & .med-heading {
        margin-block-start: 0em;
        margin-block-end: 0em;
    }
`;

const ImageContainer = styled.div `
    width: 100%;
    margin: auto;
    height: auto;
    display: block;
    position: relative;
    overflow: hidden;
    transition: 0.3s ease all;

    & img {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 100% !important;
        height: auto !important;
        min-height: auto !important;
        max-height: auto !important;
        z-index: 1;
    }

    & .overlay.blue,
    & .overlay.orange,
    & .overlay.grey,
    & .overlay.green {
        height: 100%;
        width: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        background: transparent;
        position: absolute;
        z-index: 2;
        opacity: 0;
        transition: 0.5s ease all;
    }

    & .overlay.blue {background: var(--navy);}
    & .overlay.orange {background: var(--brown);}
    & .overlay.grey {background: var(--lt-grey);}
    & .overlay.green {background: var(--green);}

    & .color-grey p {color: var(--brown);}

    & .color-blue p,
    & .color-orange p,
    & .color-green p {color: var(--white);}

    & .color-green p,
    & .color-blue p,
    & .color-orange p,
    & .color-grey p {
        opacity: 0;
        position: absolute;
        z-index: 3;
        top: 50%;
        left: 50%;
        width: 100%;
        padding: 0rem 2rem;
        transform: translate(-50%, -50%);
        text-align: center;
        margin: auto;
    }
    
    &:hover .color-orange p,
    &:hover .color-blue p,
    &:hover .color-grey p,
    &:hover .color-green p,
    &:hover .overlay.blue,
    &:hover .overlay.orange,
    &:hover .overlay.grey,
    &:hover .overlay.green{
        opacity: 1;
    }
`;

export default function GiftGrid(props) {
    const {
        giftRepeater
    } = props;

    return (
        <GiftGridContainer>
            <GiftGridInner>
            {giftRepeater &&
                    giftRepeater.map((gifts, index) => {
                        return (
                            <SingleGift
                                className="singlegift"
                                id={`gift-${index + 1}`}
                                key={`gift-${index + 1}`}>
                                
                                <Link href={gifts.link} passHref>
                                    <a target="_blank" rel="noopener">
                                        <ImageContainer>
                                            <div className={`positionCenter color-${gifts.hoverColor}`}>
                                                <p><span className="serif med-heading">{gifts.hoverText}</span><br/>
                                                <span className="sans-serif body underline">Shop Now</span></p>
                                            </div>
                                            <div className={`overlay ${gifts.hoverColor}`}></div>
                                            <Image src={gifts.image.mediaItemUrl} alt={gifts.image.altText} width={347} height={352} layout="responsive"/>
                                        </ImageContainer>
                                        <p className="sans-serif sub-heading-bold black left">{gifts.brand}</p>
                                        <p className="serif med-heading black left">{gifts.productName}</p>
                                    </a>
                                </Link>
                            </SingleGift>
                        );
                    })}
            </GiftGridInner>
        </GiftGridContainer>
    )
}