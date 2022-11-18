import { useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import ExitIntent from "../components/exitIntent";

export default function Email() {
    useEffect(() => {
        var tl = gsap.timeline();
        tl.fromTo("header", { opacity: 0 }, { opacity: 1, duration: 0.5 });
        tl.to("main", { opacity: 1, duration: 0.6 });

        var sections = gsap.utils.toArray(".fadein");

        sections.forEach(section => {
            gsap.to(section, {
                autoAlpha: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "+=0 80%",
                    scrub: false,
                    markers: false,
                    toggleActions: "play reverse play reverse",
                },
            });
        });
    }, []);
    return <ExitIntent isPage={true} />;
}
