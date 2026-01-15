import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "../styles/roomSlider.module.css";

export default function RoomSlider(props) {
	const swiperRef = useRef(null);
	const [sliderActive, setSliderActive] = useState(2);
	const [loaded, setLoaded] = useState(false);

	const { rooms } = props;

	const changeSlider = (e) => {
		if (swiperRef.current) {
			swiperRef.current.slideToLoop(parseInt(e.target.dataset.slide));
		}
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

	const handleSlideChange = (swiper) => {
		setSliderActive(swiper.realIndex);
	};

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
				<Swiper
					modules={[Navigation, Pagination, Keyboard]}
					spaceBetween={0}
					slidesPerView={"auto"}
					loop={rooms?.length > 2}
					loopedSlides={rooms?.length}
					centeredSlides={true}
					initialSlide={2}
					navigation={true}
					watchSlidesProgress={true}
					observer={true}
					observeParents={true}
					breakpoints={{
						0: {
							slidesPerView: 1,
							centeredSlides: true,
						},
						801: {
							slidesPerView: "auto",
							centeredSlides: true,
						},
					}}
					keyboard={{
						enabled: true,
						onlyInViewport: true,
					}}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					onSlideChange={handleSlideChange}
					onSlideChangeTransitionEnd={(swiper) => {
						// Force update of background images after transition
						const slides = swiper.slides;
						slides.forEach((slide, idx) => {
							const slideElement = slide;
							const dataIndex = slideElement.getAttribute(
								"data-swiper-slide-index"
							);
							if (dataIndex !== null && rooms[dataIndex]) {
								slideElement.style.backgroundImage = `url(${rooms[dataIndex].singleRooms.roomshero.mediaItemUrl})`;
							}
						});
					}}>
					{rooms.map((room, index) => {
						return (
							<SwiperSlide
								key={`${room.title}-${index}`}
								className={styles.room}
								style={{
									backgroundImage: `url(${room.singleRooms.roomshero.mediaItemUrl})`,
								}}
								data-mobile={isMobile}>
								<p
									tabIndex={0}
									className={`${styles.roommobile}`}>
									<Link
										href={room.singleRooms.slug}
										className="serif heading white"
										style={{
											display: "block",
											marginBottom: "0.5rem",
										}}>
										{room.title}
									</Link>
									<Link
										aria-label={`Explore ${room.title}`}
										href={room.singleRooms.slug}
										className={`sans-serif center white textshadow`}>
										Explore This Room
									</Link>
								</p>

								<div className={styles.bottomgradient}></div>
							</SwiperSlide>
						);
					})}
				</Swiper>
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
								aria-label={`Explore ${room.title}`}
								onClick={changeSlider}>
								{room.title === "The Irving Gill Penthouse"
									? "The Penthouse"
									: room.title}
							</a>
							<a
								aria-label={`Explore ${room.title}`}
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
