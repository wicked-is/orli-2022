import Image from "next/image";
import { useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import styles from "../styles/blurbLeft.module.css";

export default function BlurbLeft({ content, ctaLink, ctaText, icon, title }) {
	useEffect(() => {
		var twosections = gsap.utils.toArray(".fadeintwo");

		twosections.forEach((twosection) => {
			gsap.to(twosection, {
				autoAlpha: 1,
				scrollTrigger: {
					trigger: twosection,
					start: "+=0 80%",
					scrub: false,
					markers: false,
					toggleActions: "play reverse play reverse",
				},
			});
		});
	}, []);

	return (
		<div className={`${styles.blurbLeftContainer} fadeintwo`} tabIndex={0}>
			{icon && (
				<div className={styles.icon}>
					<Image
						src={icon.mediaItemUrl}
						width={100}
						height={100}
						layout="fixed"
						alt={icon.altText}
					/>
				</div>
			)}
			{title && (
				<p
					className={`${styles.mobilepadding} sans-serif-bold sub-heading`}>
					{title}
				</p>
			)}
			{content && (
				<p className={`${styles.content} heading`}>{content}</p>
			)}
			{ctaLink && (
				<p className={`${styles.cta} sans-serif xs-copy`}>
					<a href={ctaLink}>{ctaText}</a>
				</p>
			)}
		</div>
	);
}
