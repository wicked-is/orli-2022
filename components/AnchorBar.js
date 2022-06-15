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
        margin: auto 2rem; 
        cursor: pointer; 
        transition: 0.3s ease all;
    }

    img {
        height: 85px;
        width: auto;
    }

    .iconNav {
        width: 100%; 
        
        max-width: 4rem;
        margin: auto; 
        text-align: center; 
        display: block;
    }
`

export default function AnchorBar(props) {

    const { anchorNavigation } = props

    useEffect(() => {  
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
        <SubNavContainer>               
            {   
                anchorNavigation.map((item, index) => {
                    return (
                        <li key={`ni-${index}`} >
                            <a href={item.anchor}>
                            <img src={item.icon !== null ? item.icon.mediaItemUrl : 'https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_agave-1.svg'} className="iconnav" alt={item.iconnav?.altText} />
                            <p className="black xs-copy uppercase center">{item.text}</p>
                            </a>
                        </li>
                        )
                })
            }
        </SubNavContainer>
    )
}