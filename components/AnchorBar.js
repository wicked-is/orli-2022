import { useEffect } from 'react';
import styled from 'styled-components'
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const SubNavContainer = styled.ul`
    width: 100%;
    background: var(--lt-grey);
    padding: 1rem 0rem 0rem;
    margin: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    list-style: none;
    z-index: 98;
    height: auto !important; 
    max-height: auto !important; 
    p {
        font-family: 'GT Walsheim Light'; 
        font-weight: 300;

        &:hover {
            font-family: 'GT Walsheim Bold'; 
            font-weight: 700;
        }
    }

    li {
        position: relative; 
        margin: 0 2rem; 
        cursor: pointer; 
        transition: 0.3s ease all;
        text-align: center;
    }

    .icon {
        max-height: 85px;
        height: 85px;
        width: 100%;
        max-width: auto;
        margin: auto; 
        text-align: center; 
        display: block;
        transition: 0.3s ease all;
    }
    .icon.hidden {
        max-height: 0px !important;
        min-height: 0px !important;
        height: 0px !important;
        display: none !important;
    }
`

export default function AnchorBar(props) {

    const { anchorNavigation } = props

    useEffect(() => {  

        var maincontent = gsap.utils.toArray('main');
        var journalnav = gsap.utils.toArray('.top-bar-active .subnavjournal');
        var journalnavtwo = gsap.utils.toArray('.tob-bar-not-active .subnavjournal');

            gsap.to(journalnav, {
            scrollTrigger: {
                trigger: journalnav,
                start: "top-=0 143px",
                endTrigger: maincontent,
                end: "bottom-=0 bottom-=0",
                pin: journalnav,
                markers: false,
                pinSpacing: false,
                scrub: true
            }, y: 0
            })

            const icons = gsap.utils.toArray('.top-bar-active .subnavjournal .icon');
            icons.forEach((icon) => {
                gsap.to(journalnav, {
                    scrollTrigger: {
                      trigger: icon,
                      start: "top-=0 0px",
                      endTrigger: maincontent,
                      end: "bottom-=0 bottom-=150",
                      toggleClass: "hidden"
                    }
                  });
                });

            gsap.to(journalnavtwo, {
              scrollTrigger: {
                  trigger: journalnavtwo,
                  start: "top-=0 88px",
                  endTrigger: maincontent,
                  end: "bottom-=0 bottom-=0",
                  pin: journalnavtwo,
                  markers: false,
                  pinSpacing: false,
                  scrub: true
              }
            });

            const iconstwo = gsap.utils.toArray('.tob-bar-not-active .subnavjournal .icon');
            iconstwo.forEach((icontwo) => {
                gsap.to(journalnavtwo, {
                    scrollTrigger: {
                      trigger: icontwo,
                      start: "top-=0 0px",
                      endTrigger: maincontent,
                      end: "bottom-=0 bottom-=150",
                      toggleClass: "hidden"
                    }
                  });
                });
        
        // var tl =  gsap.timeline()
        // tl.fromTo('header', {opacity: 0}, { opacity:1, duration: 0.5});
        // tl.to('main', { opacity:1, duration: 0.6});

        // var	wideScreen = window.matchMedia("(min-width: 800px)");
        // var	narrowScreen = window.matchMedia("(max-width: 799px)");

        // var anchorBar = gsap.utils.toArray('.anchor-bar');
        // var sidebar = gsap.utils.toArray('.sidebar');

        // if(wideScreen.matches) {
        //     gsap.to(anchorBar, {
        //         scrollTrigger: {
        //             trigger: anchorBar,
        //             start: "top-=80 150px",
        //             end: "bottom+=150 bottom-=150",
        //             pin: anchorBar,
        //             markers: false,
        //             onRefresh: self => self.pin.parentNode.style.float = "right",
        //             pinSpacing: false,
        //         }, y: 0
        //     });
        // }
    }, [])

    return (
        <SubNavContainer className="subnavjournal">              
            {   
                anchorNavigation.map((item, index) => {
                    return (
                        <li key={`ni-${index}`} >
                            <a href={item.anchor}>
                            <img src={item.icon !== null ? item.icon.mediaItemUrl : 'https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_agave-1.svg'} className="icon" alt={item.iconnav?.altText} />
                            <p className="black xs-copy uppercase center">{item.text}</p>
                            </a>
                        </li>
                        )
                })
            }
        </SubNavContainer>
    )
}