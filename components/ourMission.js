import { useEffect } from 'react';
import { gsap } from "gsap/dist/gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import { CustomEase } from "gsap/dist/CustomEase";
import Image from 'next/image';
import styles from '../styles/ourMission.module.css';



export default function OurMission(props) {

    const { headline: title, logo, animatableTexts } = props;

    useEffect(() => {
        gsap.registerPlugin(TextPlugin, CustomEase);
        var timeline = gsap.timeline({ repeat: -1 });
        
        timeline.fromTo(".cursor", {autoAlpha: 0, x:0},{autoAlpha: 1, duration: 0.5, repeat: -1, ease: "steps(1)"})
            .to(".textAnimation", {text: {value: "intentional"}, duration: 1, delay: 1, ease: "none"})
            .to(".textAnimation", {delay: 2, duration: 0.5, autoAlpha: 0, display: 'none'})
            .to(".textAnimation2", {text: {value: "local-minded"}, duration: 1, delay: 1, ease: "none"})
            .to(".textAnimation2", {delay: 2, duration: 0.5, autoAlpha: 0, display: 'none'})
            .to(".textAnimation3", {text: {value: "effortless"}, duration: 1.5, delay: 1, ease: "none"})
            .to(".textAnimation3", {delay: 3, duration: 0.5, autoAlpha: 0, display: 'none'})
            .add(() => timeline.restart())
    },[])

    return (
        <section className={`${styles.missionContainer} center bg-lt-grey`}>
            <p className={`${styles.center} serif sub-heading brown`}>{title}</p>
            <div className={styles.missionFlex}>
                <div className={`${styles.orliimagecontainer} serif heading`}>
                    <Image src={logo.mediaItemUrl} alt={logo.altText} width={167} height={108} className={styles.orliimage}/> 
                    <span>is</span>
                <span className={`${styles.headingAnimate} heading`}>
                    <span data-word={animatableTexts[0].title} className="textAnimation"></span> 
                    <span data-word={animatableTexts[1].title} className="textAnimation2"></span>
                    <span data-word={animatableTexts[2].title} className="textAnimation3"></span>
                    <span className="cursor"></span>
                    </span>
                </div>
            </div>
        </section>
    )
}