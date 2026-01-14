import { useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "../styles/blurbCenter.module.css";
import parse from "html-react-parser";
gsap.registerPlugin(ScrollTrigger);

export default function BlurbCenter(props) {
	useEffect(() => {
		var blurbcentersections = gsap.utils.toArray(".blurbcenterfade");

		blurbcentersections.forEach((blurbcentersection) => {
			gsap.to(blurbcentersection, {
				autoAlpha: 1,
				scrollTrigger: {
					trigger: blurbcentersection,
					start: "+=0 80%",
					scrub: false,
					markers: false,
					toggleActions: "play reverse play reverse",
				},
			});
		});
	}, []);

	const {
		blurb,
		greyBackground,
		hasBackgroundMedia,
		headline,
		icon,
		imagePoster,
		mp4ExternalLink,
		webm,
		isBlogSummary,
	} = props;

	return (
		<section
			className={`${styles.blurbContainer} ${
				greyBackground && "bg-lt-grey"
			} ${mp4ExternalLink ? "has-video" : ""} ${
				isBlogSummary ? "removepadding" : "addpadding blurbcenterfade"
			}`}
			aria-label={headline || "Content section"}>
			{mp4ExternalLink && (
				<video
					poster={imagePoster?.mediaItemUrl}
					autoPlay
					playsInline
					muted
					loop>
					<source src={mp4ExternalLink} type="video/mp4" />
					<source src={webm} type="video/webm" />
				</video>
			)}
			<div className="max-60 center">
				{!mp4ExternalLink && icon?.mediaItemUrl && (
					<div className={`${styles.icon}`} aria-hidden="true">
						<img 
							src={icon.mediaItemUrl} 
							alt={icon?.altText || ""} 
							role="presentation" />
					</div>
				)}
				{headline && (
					<h2 className="serif heading black center">{headline}</h2>
				)}
				<div className="heading-italic">{parse(blurb)}</div>
			</div>
		</section>
	);
}
