import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Flickity from "react-flickity-component";

import styles from "../styles/roomSlider.module.css";

import "flickity/css/flickity.css";

export default function RoomSlider(props) {
	const slider = useRef(null);
	const [sliderActive, setSliderActive] = useState(2);
	const [loaded, setLoaded] = useState(false);

	const { rooms } = props;

	const changeSlider = (e) => {
		slider.current.select(e.target.dataset.slide);
	};

	const [dimensions, setDimensions] = useState({
		height: null,
		width: null,
	});
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		function handleResize() {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth,
			});

			if (window.innerWidth < 768) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		}

		window.addEventListener("resize", handleResize);

		return (_) => {
			window.removeEventListener("resize", handleResize);
		};
	});

	useEffect(() => {
		slider.current.on("change", () => {
			setSliderActive(slider.current.selectedIndex);
		});
	}, [sliderActive]);

	return (
		<section
			className={`${styles.roomSlider} roomsSliderglobal`}
			aria-label="Featured Room Carousel">
			<p className={`${styles.roomHeading} serif heading white`}>
				Featured Rooms
			</p>
			{/*<Link href="/rooms">
                <span className="sans-serif white xs-copy fadein"><a className={styles.cta} >Find Your Room</a></span>
            </Link>*/}
			{/* map over images */}
			<div className="roomsSliderarrows">
				<Flickity
					options={{
						cellAlign: "center",
						prevNextButtons: true,
						arrowShape:
							"M3.3,48.9l39.2,31.1l0.1-5.2l-29.9-24h83.5l-0.1-4l-83.5,0l29.9-23.2v-4.9L3.3,48.9z",
						pageDots: false,
						draggable: true,
						wrapAround: true,
						asNavFor: ".roomSliderNavigation",
						imagesLoaded: true,
						initialIndex: 2,
						accessibility: true,
						// fullscreen: true,
						// autoPlay: 5000,
					}}
					disableImagesLoaded={false} // default false
					reloadOnUpdate={false} // default false
					static // default false
					aria-label="Featured Room Carousel"
					flickityRef={(c) => {
						slider.current = c;
					}}>
					{rooms.map((room, index) => {
						return (
							<div
								key={room.title}
								className={styles.room}
								aria-label={`${room.title} - featured room ${
									index + 1
								} of ${rooms.length}`}
								style={{
									backgroundImage: isMobile
										? null
										: `url(${room.singleRooms.roomshero.mediaItemUrl})`,
								}}
								data-mobile={isMobile}>
								<p
									tabIndex={0}
									className={`${styles.roommobile} serif heading white`}>
									<a href={room.singleRooms.slug}>
										{room.title}
									</a>
								</p>
								{
									<Image
										src={
											room.singleRooms.roomshero
												.mediaItemUrl
										}
										alt={room.singleRooms.roomshero.altText}
										width={1436}
										height={1020}
										layout="intrinsic"
									/>
								}
								<div className={styles.bottomgradient}></div>
							</div>
						);
					})}
				</Flickity>
			</div>
			<div className={`${styles.roomSliderNavigation}`}>
				{rooms.map((room, index) => {
					return (
						<p
							key={room.title}
							className={`${
								sliderActive == index
									? styles.active
									: "sub-heading-bold"
							}`}
							style={{ margin: "0 1rem" }}>
							<a
								className={styles.navItem}
								data-slide={index}
								onClick={changeSlider}>
								{room.title === "The Irving Gill Penthouse"
									? "The Penthouse"
									: room.title}
							</a>
							<a
								href={room.singleRooms.slug}
								className={`${styles.explore} sans-serif center white textshadow`}>
								Explore This Room
							</a>
						</p>
					);
				})}
			</div>
		</section>
	);
}
