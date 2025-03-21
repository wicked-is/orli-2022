import { useEffect, useState } from "react";
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import { ResponsiveMasonry } from "react-responsive-masonry";
// import Responsive Masonry from 'react-responsive-masonry" only if typeof window is not undefined
// import Link from "next/link";
// import Image from "next/image";
import Fancybox from "../components/FancyBox.js";
import styles from "../styles/gallery.module.css";
import { useWindowSize } from "../utils/hooks";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import ImageMasonry from "react-image-masonry";
import Masonry from "react-masonry-css";
gsap.registerPlugin(ScrollTrigger);

export default function Gallery(props) {
	const { items, filters, index } = props;

	const size = useWindowSize();
	const [filteredItems, setFilteredItems] = useState(items);

	const breakpointColumnsObj = {
		default: 3,
		700: 2,
		500: 1,
	};

	useEffect(() => {
		var icons = gsap.utils.toArray(".iconnav");
		var arrows = gsap.utils.toArray(".arrowssub");

		if (icons) {
			icons.forEach((icon) => {
				gsap.to(icon, {
					autoAlpha: 1,
					scrollTrigger: {
						trigger: icon,
						start: "top top",
						endTrigger: "footer",
						end: "top top",
						toggleClass: "hide",
					},
				});
			});
		}

		if (arrows) {
			icons.forEach((arrow) => {
				gsap.to(arrow, {
					scrollTrigger: {
						trigger: arrows,
						start: "top top",
						endTrigger: "footer",
						end: "bottom 0px",
						toggleClass: "height",
					},
				});
			});
		}
		// setFilteredItems(items);
	}, []);

	return (
		<section>
			<div className={styles.bigheroSubnav}>
				{/* <ul className="subnavigationonlyContainer">
                    {
                        filters && filters.map((item, index) => {
                            return (
                                <li 
                                    key={`ni-${index}`} 
                                    data-filter={item.filter}
                                    className={`${ size.width < 768 ? 'pt-p5' : ''}`}
                                    onClick={() => {
                                        handleFilterClick(item)
                                    }}
                                >
                                    <img src={item.iconnav !== null ? item.iconnav.mediaItemUrl : 'https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_agave-1.svg'} className="iconnav" style={{ marginBottom: '1rem' }} alt={item.iconnav?.altText} />
                                    <p className="sans-serif nav-copy uppercase black center mt-0">{item.label}</p>
                                </li>
                                )
                        }, this)
                    }
                </ul>
                <div className="arrowssub"></div> */}
			</div>

			<div
				className={styles.galleryContainer}
				style={{ paddingTop: index < 2 ? "8rem" : "2rem" }}>
				<h1 className="serif heading dark center">Gallery</h1>
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column">
					{props.items.map((item, index) => {
						return (
							<div
								key={`gallery-item-${index}`}
								style={{ padding: ".25rem" }}>
								{item.type === "Image" &&
									item.filter === "Rooms" && (
										<Fancybox>
											<div
												data-fancybox="gallery"
												href={item.image.mediaItemUrl}>
												<img
													src={
														item.image.mediaItemUrl
													}
													alt={item.image.altText}
													data-filter={item.filter}
													style={{
														width: "100%",
														display: "block",
													}}
												/>
											</div>
										</Fancybox>
									)}
								{item.type === "Video" &&
									item.filter === "Rooms" && (
										<Fancybox>
											<div
												className={
													styles.videoContainer
												}
												data-fancybox="gallery"
												href={item.mp4ExternalLink}>
												<video
													data-filter={item.filter}
													autoPlay
													playsInline
													muted
													loop
													poster="">
													<source
														src={
															item.mp4ExternalLink
														}
														type="video/mp4"
													/>
													<source
														src={item.webm}
														type="video/webm"
													/>
												</video>
											</div>
										</Fancybox>
									)}
								{item.type === "Image" &&
									item.filter === "Amenities" && (
										<Fancybox>
											<div
												data-fancybox="gallery"
												href={item.image.mediaItemUrl}>
												<img
													src={
														item.image.mediaItemUrl
													}
													alt={item.image.altText}
													data-filter={item.filter}
													style={{
														width: "100%",
														display: "block",
													}}
												/>
											</div>
										</Fancybox>
									)}
								{item.type === "Video" &&
									item.filter === "Amenities" && (
										<Fancybox>
											<div
												className={
													styles.videoContainer
												}
												data-fancybox="gallery"
												href={item.mp4ExternalLink}>
												<video
													data-filter={item.filter}
													autoPlay
													playsInline
													muted
													loop
													poster="">
													<source
														src={
															item.mp4ExternalLink
														}
														type="video/mp4"
													/>
													<source
														src={item.webm}
														type="video/webm"
													/>
												</video>
											</div>
										</Fancybox>
									)}
								{item.type === "Image" &&
									item.filter === "Neighborhood" && (
										<Fancybox>
											<div
												data-fancybox="gallery"
												href={item.image.mediaItemUrl}>
												<img
													src={
														item.image.mediaItemUrl
													}
													alt={item.image.altText}
													data-filter={item.filter}
													style={{
														width: "100%",
														display: "block",
													}}
												/>
											</div>
										</Fancybox>
									)}
								{item.type === "Video" &&
									item.filter === "Neighborhood" && (
										<Fancybox>
											<div
												data-fancybox="gallery"
												href={item.mp4ExternalLink}
												className={
													styles.videoContainer
												}>
												<video
													data-filter={item.filter}
													autoPlay
													playsInline
													muted
													loop
													poster="">
													<source
														src={
															item.mp4ExternalLink
														}
														type="video/mp4"
													/>
													<source
														src={item.webm}
														type="video/webm"
													/>
												</video>
											</div>
										</Fancybox>
									)}
								{item.type === "Video" &&
									item.filter === "Video" && (
										<Fancybox>
											<div
												data-fancybox="gallery"
												href={item.mp4ExternalLink}
												className={
													styles.videoContainer
												}>
												<video
													data-filter={item.filter}
													autoPlay
													playsInline
													muted
													loop
													poster="">
													<source
														src={
															item.mp4ExternalLink
														}
														type="video/mp4"
													/>
													<source
														src={item.webm}
														type="video/webm"
													/>
												</video>
											</div>
										</Fancybox>
									)}
							</div>
						);
					})}
				</Masonry>
			</div>
		</section>
	);
}
