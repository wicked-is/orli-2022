import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import styled, { css } from "styled-components";
import Flickity from 'react-flickity-component'
import "flickity/css/flickity.css";

const FullWidthContainer = styled.section`
    display: inline-block;
    width: 100%;
    margin: auto;
    position: relative;
`;
const FullImage = styled.div`
    & img {
        width: 100% !important; height: auto !important;
    }
`;
const FullVideo = styled.div`
    & video {
        width: 100%;
        margin: auto;
        display: block; 
        text-align: center;
    }

    & .iframeContainer {
        position: relative;
        overflow: hidden;
        width: 100%;
        padding-top: 56.25%;
    }
    & .iframeContainer iframe {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
`;

const ImageCaption = styled.p`
    width: 100%;
    margin: auto;
    display: block;
    color: var(--black);
    text-align: left;
    padding: 1rem 2rem 0rem 2rem;
`;
const VideoCaption = styled.p`
    width: 100%;
    margin: auto;
    display: block;
    color: var(--black);
    text-align: left;
    padding: 1rem 2rem 0rem 2rem;
`;

const FullSlider = styled.div`
    width: 100%;
    margin: auto;
    display: block; 
    position: relative;
    text-align: center;

    & .carouselitem {
        width: 75%;
        height: auto;
        margin: auto 1rem;
    }
    & .carouselitem img {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 100% !important;
        margin: auto; 
        height: auto !important;
        max-height: unset !important;
        min-height: auto !important;
        display: block;
    }
    @media only screen and (max-width: 600px){
        & .carouselitem {
            width: 80%;
            height: auto;
            margin: auto 0.5rem;
        }
    }
`;

const SliderNavigationContainer = styled.div`
    width: 100%;
    padding: 0rem 10rem;
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    @media (max-width: 800px) {
        padding: 0rem 2rem;
    }
`;

export default function FullWidthMedia(props) {
    const { 
        types,
        fullImage,
        iframeembed,
        imageCaption,
        videoCaption,
        mpfour,
        sliderImages
    } = props;

    const slider = useRef(null);

    const [sliderActive, setSliderActive] = useState(0);
    const [currentSlider, setCurrentSlider] = useState("1");
    const [currentSliderLength, setCurrentSliderLength] = useState("");

    const changeSlider = (index) => {
        slider.current.select(index)
    }

    useEffect(() => {
        if (slider.current !== null) {
          setCurrentSliderLength(slider.current.cells.length);
          slider.current.on("change", () => {
            setCurrentSlider(slider.current.selectedIndex + 1);
            setCurrentSliderLength(slider.current.cells.length);
          });
    
          document
            .querySelector("#previous-arrow")
            .addEventListener("click", () => slider.current.previous());
          document
            .querySelector("#next-arrow")
            .addEventListener("click", () => slider.current.next());
        }
      }, [slider]);

     const mediaStructure = (types) => {
        switch (types) {
            case 'Image':
                return (
                    <FullImage>
                        <Image
                            src={fullImage.mediaItemUrl}
                            alt={fullImage.altText}
                            width={1200}
                            height={800}
                            layout="responsive"
                         />
                         {imageCaption && (
                            <ImageCaption className="sans-serif">{imageCaption}</ImageCaption>
                         )}
                    </FullImage>
                )
             case 'Video':
                return (
                    <FullVideo>
                        {mpfour && (
                             <video>
                                <source src={mpfour} type="video/mp4" />
                             </video>
                        )}
                        {iframeembed && (
                            <div className="iframeContainer">
                                <div dangerouslySetInnerHTML={{ __html: iframeembed}}></div>
                            </div>
                        )}
                        {videoCaption && (
                            <VideoCaption className="sans-serif">{videoCaption}</VideoCaption>
                        )}
                    </FullVideo>
                )
            case 'Slider':
                return (
                        <FullSlider>
                            <Flickity
                                options={{
                                cellAlign: 'center',
                                prevNextButtons: false,
                                pageDots: false,
                                draggable: true,
                                wrapAround: true,
                                adaptiveHeight: true,
                                imagesLoaded: true,
                                fullscreen: true,
                                }}
                                disableImagesLoaded={false} // default false
                                reloadOnUpdate={false} // default false
                                static // default false
                                flickityRef={c => {
                                    slider.current = c
                                }}
                            >
                            {
                                sliderImages.map((item, index) => {
                                    return (
                                    <div key={item.item} className="carouselitem">
                                        <Image src={item.image.mediaItemUrl} alt={item.image.altText} width={1920} height={1080} layout="responsive" />
                                        <p className="sans-serif black body-copy left">{item.imageCaption}</p>
                                    </div>
                                    )
                                })
                                }
                            </Flickity>
                        <SliderNavigationContainer>
                        <div className="brown">
                          <img
                            id="previous-arrow"
                            src="https://orlidev.wpengine.com/wp-content/uploads/2022/06/RedArrow.png"
                            style={{
                              transform: "rotate(180deg)",
                              marginRight: "1rem",
                              width: "37px",
                              height: "22px",
                            }}
                            alt="previous arrow"
                          />
                          <img
                            id="next-arrow"
                            src="https://orlidev.wpengine.com/wp-content/uploads/2022/06/RedArrow.png"
                            style={{
                              width: "37px",
                              height: "22px",
                            }}
                            alt="next arrow"
                          />
                        </div>
                      </SliderNavigationContainer>
                        </FullSlider>
                )
                default:
                return null;
        }
    }

    return (
        <FullWidthContainer>
            { mediaStructure(types) }
        </FullWidthContainer>
    )
}