import Image from "next/image";
import { useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import styles from "../styles/blurbLeft.module.css";

export default function BlurbLeft({
	caption,
	content,
	ctaLink,
	ctaText,
	icon,
	title,
}) {
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
		<section className={`${styles.blurbLeftContainer} fadeintwo`} aria-labelledby={title ? "blurb-title" : undefined}>
			{icon && (
				<div className={styles.icon} aria-hidden="true">
					<Image
						src={icon?.mediaItemUrl}
						width={100}
						height={100}
						layout="fixed"
						alt={icon?.altText || ""}
						role="presentation"
					/>
				</div>
			)}
			{title && (
				<h2
					id="blurb-title"
					className={`${styles.mobilepadding} sans-serif-bold sub-heading`}>
					{title}
				</h2>
			)}
			{content && (
				<p
					className={`${styles.content} ${
						caption && styles.nbm
					} heading`}>
					{content}
				</p>
			)}
			{caption && (
				<p className={`${styles.content} black body-copy sans-serif`}>
					{caption}
				</p>
			)}
			{ctaLink && (
				<p className={`${styles.cta} sans-serif xs-copy`}>
					<a href={ctaLink} aria-label={ctaText ? `${ctaText} - ${title || 'Learn more'}` : undefined}>
						{ctaText}
					</a>
				</p>
			)}
		</section>
	);
}
