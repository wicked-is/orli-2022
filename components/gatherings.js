import Image from "next/image";
import ThreePartHeading from "./threePartHeading";
import EventFeed from "./eventFeed";

import styles from "../styles/gatherings.module.css";

export default function Gatherings(props) {
	const {
		type,
		subHeadline,
		headline,
		blurb,
		ctaText,
		ctaLink,
		media,
		events,
		anchorTag,
	} = props;

	const gatheringStructure = (type) => {
		switch (type) {
			case "Gatherings":
				return (
					<>
						<div className={`${styles.left} fadein`}>
							<ThreePartHeading
								subheader={subHeadline}
								header={headline}
								ctaText={ctaText}
								ctaLink={ctaLink}
							/>
							{media[0].type === "Video" && (
								<div className={`${styles.videoBackground}`}>
									<div
										style={{
											aspectRatio: "1/1.2",
											overflow: "hidden",
										}}>
										<video
											className={styles.videoBG}
											autoPlay
											playsInline
											muted
											loop>
											<source
												src={media[0].mp4}
												type="video/mp4"
											/>
											<source src={media[0].webm} />
										</video>
									</div>
									{media[0].ctaText && media[0].ctaLink && (
										<p className="serif xs-copy uppercase brown">
											<a href={media[0].ctaLink}>
												{media[0].ctaText}
											</a>
										</p>
									)}
								</div>
							)}
						</div>
						<div className={`${styles.right}`}>
							{media[1].type === "Image" && (
								<>
									<Image
										src={media[1].imagePoster.sourceUrl}
										alt={media[1].imagePoster.altText}
										width={561}
										height={370}
										layout="responsive"
									/>
									<p className="serif xs-copy uppercase brown">
										<a href={media[1].ctaLink}>
											{media[1].ctaText}
										</a>
									</p>
								</>
							)}
							{type === "Weddings" ? (
								<p
									className="sans-serif body-copy black left"
									style={{ paddingTop: "5rem" }}>
									{blurb}
								</p>
							) : (
								<EventFeed fullWidget={false} events={events} />
							)}
						</div>
					</>
				);
			case "Weddings":
				return (
					<>
						<div className={styles.left}>
							<ThreePartHeading
								subheader={subHeadline}
								header={headline}
								ctaText={ctaText}
								ctaLink={ctaLink}
							/>
							{media[0].type === "Video" && (
								<div className={`${styles.videoBackground}`}>
									<video
										className={styles.videoBG}
										autoPlay
										playsInline
										muted
										loop>
										<source
											src={media[0].mp4}
											type="video/mp4"
										/>
										<source src={media[0].webm} />
									</video>
								</div>
							)}
							{media[0].type === "Image" && (
								<>
									<Image
										src={media[0].imagePoster.sourceUrl}
										alt={media[0].imagePoster.altText}
										width={561}
										height={593}
										layout="responsive"
									/>
								</>
							)}
						</div>
						<div className={styles.right}>
							{media[1].type === "Image" && (
								<div className="hide-on-mobile">
									<Image
										src={media[1].imagePoster.sourceUrl}
										alt={media[1].imagePoster.altText}
										width={561}
										height={370}
										layout="responsive"
									/>
								</div>
							)}
							<p
								className={`${styles.blurbpadding} sans-serif body-copy black left`}>
								{blurb}
							</p>
						</div>
					</>
				);
		}
	};
	return (
		<section id="events" className={`${styles.gatheringsContainer} max-80`}>
			{anchorTag && (
				<a
					id={anchorTag}
					name={anchorTag}
					className="anchor"
					aria-hidden="true"></a>
			)}
			{gatheringStructure(type)}
		</section>
	);
}
