import Image from "next/image";
import Link from "next/link";
import styles from "../styles/fauxSocialFeed.module.css";

export default function FauxSocialFeed(props) {
	let headline = props.headline || "Follow Along";
	let backgroundColor = props.backgroundColor || "Grey";
	let ctaLink = props.ctaLink || "https://www.instagram.com/stayorli";
	let ctaText = props.ctaText || "@StayOrli";
	let images = props.image || [
		{
			altText: "Orli La Jolla Balcony at sunset",
			mediaItemUrl:
				"https://orlidev.wpengine.com/wp-content/uploads/2024/02/Orli-Penthouse-58-9-1-1.jpg",
		},
		{
			altText:
				"Orli La Jolla room with a view of the kitchenette, desk and window seat",
			mediaItemUrl:
				"https://orlidev.wpengine.com/wp-content/uploads/2024/02/Orli-Sunset-Suite-13-10-1-1.jpg",
		},
		{
			altText: "Orli La Jolla Exterior of building",
			mediaItemUrl:
				"https://orlidev.wpengine.com/wp-content/uploads/2024/02/Orli-Exterior-225-9-1.jpg",
		},
		{
			altText: "Orli La Jolla Outdoor Gathering",
			mediaItemUrl:
				"https://orlidev.wpengine.com/wp-content/uploads/2024/02/Orli-Exterior-27-2-1-1.jpg",
		},
	];

	return (
		<section
			className={`${styles.fauxSocialFeedContainer} ${backgroundColor}-bg fauxsocial`}
			aria-label="instagram photos">
			<div className={`${styles.max80}`}>
				<div className={styles.topContainer}>
					<h2 className="heading">{headline}</h2>
					<Link
						href={ctaLink}
						className="sans-serif xs-copy underline"
						aria-label="Open Orli Instagram account - @StayOrli"
						target="_blank"
						rel="noreferrer">
						{ctaText}
					</Link>
				</div>
				<div className={styles.grid}>
					{images.map((image, index) => {
						return (
							<Link
								href={ctaLink}
								passHref
								key={`${index}-img`}
								target="_blank"
								aria-label="Open Orli Instagram account - @StayOrli">
								<Image
									key={`faux-${index}`}
									src={image.mediaItemUrl}
									width={1200}
									height={1200}
									layout="responsive"
									alt={image.altText}
								/>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
