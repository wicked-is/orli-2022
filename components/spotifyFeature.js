import Link from "next/link";
import styles from "../styles/spotifyFeature.module.css";

export default function SpotifyFeature(props) {
	return (
		<section className={styles.spotifyFeature}>
			<div className={styles.overlay}></div>
			<video className={styles.videoBG} autoPlay playsInline muted loop>
				<source
					src="https://orlidev.wpengine.com/wp-content/uploads/2022/10/Orli_SpotifySessions_v2_Web_1728x700.mp4"
					type="video/mp4"
				/>
				<source
					src="https://orlidev.wpengine.com/wp-content/uploads/2022/10/Orli_SpotifySessions_v2_Web_1728x700.webm"
					type="video/webm"
				/>
			</video>
			<div className={`${styles.container} ${styles.max70}`}>
				<div className="fadein">
					<p className="heading white">
						We&apos;re Friends, and Friends Share Music
					</p>
					<Link
						href={props.ctaLink}
						target="_blank"
						className="xs-copy white sans-serif"
						style={{ textDecoration: "underline" }}>
						{props.ctaText}
					</Link>
				</div>
				<div
					className={styles.spotifyEmbed}
					dangerouslySetInnerHTML={{
						__html: props.spotifyEmbed,
					}}></div>
			</div>
		</section>
	);
}
