import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Hero from "../../components/hero";
import SEO from "../../components/seo";
import styled from "styled-components";

import CalendarWidget from "../../components/CalendarWidget";

import ToggleCaret from "../../public/assets/icons/Orli_Caret.svg";

const SingleRoomContentContainer = styled.section`
	display: inline-block;
	padding: 0 6rem;
	max-width: 100%;
	position: relative;
	margin: auto auto 3rem;
	@media screen and (max-width: 820px) {
		& {
			padding: 0 0rem;
		}
	}
`;
const MobileRoomsHero = styled.div`
	display: none;
	@media only screen and (max-width: 820px) {
		& {
			width: 100%;
			margin: auto;
			display: inline-block;
			position: relative;
		}
		& .roomGalleryMobileitem.landscape {
			width: 100%;
			margin: auto;
		}
		& .roomGalleryMobileitem.portrait {
			height: 100%;
			width: auto;
			margin: auto;
			overflow: hidden;
		}

		& .roomGalleryMobileitem.landscape img {
			width: 100%;
		}
		& .roomGalleryMobileitem.portrait img {
			height: 99.2%;
			width: auto;
		}

		& .flickity-button .flickity-button-icon {
			fill: var(--brown);
		}

		& .flickity-button {
			background: hsl(0 0% 100% / 100%);
		}

		& .flickity-prev-next-button:focus {
			box-shadow: 0 0 0 5px var(--green) !important;
		}
		& .flickity-prev-next-button.previous {
			top: unset;
			left: 1rem;
			bottom: 1rem;
		}
		& .flickity-prev-next-button.next {
			top: unset;
			right: 1rem;
			bottom: 1rem;
		}
	}
	@media only screen and (max-width: 414px) {
		& .roomGalleryMobileitem.portrait img {
			height: 98.8%;
			width: auto;
		}
	}
`;

const MobileBookingForm = styled.div`
	display: none;
	@media only screen and (max-width: 820px) {
		& {
			display: block;
			width: 100%;
			margin: auto;
		}
	}
`;

const SingleRoomContent = styled.div`
	width: 70%;
	display: inline;
	float: left;
	padding: 0 4rem 0 0;
	margin-top: 3rem;
	@media screen and (max-width: 820px) {
		& {
			margin-top: 0rem;
			width: 100%;
			padding: 0 0rem 0 0;
		}
	}
`;

const GreyBGMobile = styled.div`
	@media only screen and (max-width: 820px) {
		& p.sans-serif-bold.sub-heading {
			margin-block-end: 0.5rem !important;
		}
		& {
			background: var(--lt-grey);
			padding: 2rem 2rem;
			margin-top: -8px;
		}
	}
`;
const MobilePadding = styled.div`
	@media only screen and (max-width: 820px) {
		padding: 2rem 2rem 0 2rem;
	}
`;

const SingleRoomMainDesc = styled.div``;

const SingleRoomBookingForm = styled.div`
	margin: -8rem 0 0 0;
	z-index: 1;
	width: 30%;
	display: inline;
	float: left;
	max-height: calc();
	position: relative;

	@media screen and (max-width: 820px) {
		& {
			display: none;
		}
	}
`;
const FeatureContainer = styled.div`
	margin: 4.5rem 0 3rem;
	@media only screen and (max-width: 820px) {
		padding: 0rem 2rem;
	}
`;
const FeatureList = styled.div`
	list-style-type: none;
	display: grid;
	grid-template-columns: repeat(4, 150px);
	gap: 1rem;
	text-align: center;

	[data-page="/rooms/the-irving-gill-penthouse"] & {
		grid-template-columns: repeat(5, 150px);
	}
	@media only screen and (max-width: 1500px) {
		[data-page="/rooms/the-irving-gill-penthouse"] & {
			grid-template-columns: repeat(4, 150px);
		}
	}

	div {
		max-width: 130px;
	}

	img {
		height: 100px;
		width: auto;
	}

	@media screen and (max-width: 1200px) {
		grid-template-columns: repeat(3, 150px);
	}
	@media screen and (max-width: 820px) {
		grid-template-columns: repeat(2, 150px);
	}
	@media screen and (max-width: 800px) {
		grid-template-columns: repeat(3, 150px);
	}
	@media screen and (max-width: 700px) {
		grid-template-columns: repeat(2, 50%);
	}
	@media screen and (max-width: 370px) {
		grid-template-columns: repeat(1, 100%);
	}
`;
const AmenitiesContainer = styled.div`
	margin: 3rem 0;
	@media screen and (max-width: 820px) {
		padding: 0rem 2rem;
	}
`;
const AmenitiesList = styled.ul`
	list-style-type: none;
	columns: 2;

	padding-inline-start: 0 !important;

	@media screen and (max-width: 600px) {
		columns: 1;
	}
`;
const AboutOrliContainer = styled.div`
	margin: 3rem 0;
	@media screen and (max-width: 820px) {
		padding: 0rem 2rem;
	}
`;
const NeighborhoodContainer = styled.div`
	margin: 3rem 0;

	& p {
		padding: 4rem 0 0 0;
	}

	@media screen and (max-width: 820px) {
		padding: 0rem 2rem;
	}
`;
const BulletItem = styled.li`
	display: flex;
	justify-content: space-between;
	font-size: 1.3rem;

	@media screen and (max-width: 955px) {
		flex-direction: column;
		p:first-of-type {
			margin-bottom: 0;
		}
		p:last-of-type {
			margin-top: 0;
		}
	}
`;
const GreyBackground = styled.div`
	background-color: var(--lt-grey);
	padding: 2rem;

	&.fixed {
		position: fixed;
		width: 27%;
		top: 6rem;
		right: 6rem;
	}

	@media screen and (max-width: 1680px) {
		&.fixed {
			position: fixed;
			width: 26%;
			top: 6rem;
			right: 6rem;
		}
	}

	@media screen and (max-width: 800px) {
		top: 1rem;
	}
`;
const ReservationForm = styled.form``;

const ReservationFormLabel = styled.label`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  * {
    flex: 1
    max-width: 50%
  }

  &:first-of-type {
    margin-top: 1rem;
  }
  &:last-of-type {
    margin-bottom: 1.5rem;
  }

  input {
    background-color: transparent;
    border: 0px;
    text-align: center;
    color: var(--black);
    &:after {

    }
  }
`;
const ReservationButton = styled.button`
	width: 100%;
	height: 5rem;
	color: #fff;
	font-size: var(--xs-copy);
	border: 0;
	background-color: var(--brown);
`;

export default function DefaultRoomsPage(props) {
	const slider = useRef(null);
	const [sliderActive, setSliderActive] = useState(0);

	const changeSlider = (e) => {
		slider.current.select(e.target.dataset.slide);
	};

	useEffect(() => {
		slider.current.on("change", () => {
			setSliderActive(slider.current.selectedIndex);
		});
	}, [sliderActive]);

	const [showingFloorplan, setShowingFloorplan] = useState(false);

	const { room } = props.data.data;

	useEffect(() => {
		var tl = gsap.timeline();
		tl.fromTo("header", { opacity: 0 }, { opacity: 1, duration: 0.5 });
		tl.to("main", { opacity: 1, duration: 0.6 });
	}, []);

	useEffect(() => {
		var wideScreen = window.matchMedia("(min-width: 800px)");
		var narrowScreen = window.matchMedia("(max-width: 799px)");

		var content = gsap.utils.toArray(".content");
		var sidebar = gsap.utils.toArray(".sidebar");

		if (wideScreen.matches) {
			gsap.to(sidebar, {
				scrollTrigger: {
					trigger: sidebar,
					start: "top+=0px 80px",
					endTrigger: content,
					end: "bottom bottom-=35%",
					markers: false,
					toggleClass: {
						targets: ".greyBackground",
						className: "fixed",
					},
				},
			});
		}
	}, []);

	// const [checkOutDate, setCheckOutDate] = useState("");

	// const setCheckout = date => {
	//     setCheckOutDate(date.target.value);
	// };

	const [checkOutDate, setCheckOutDate] = useState("");
	const [checkInDate, setCheckInDate] = useState("");
	const [calendarIsVisible, setcalendarIsVisible] = useState(false);

	const checkInRef = useRef(null);
	const checkOutRef = useRef(null);

	const setCheckin = (date) => {
		// checkInRef.current.placeholder = "";
		// checkInRef.current.value = date.toISOString().split("T")[0];
		setCheckInDate(date.toISOString().split("T")[0]);
		// setCheckOutDate(date.target.value);
	};
	const setCheckout = (date) => {
		// checkOutRef.current.placeholder = "";
		// checkOutRef.current.value = date.toISOString().split("T")[0];
		setCheckOutDate(date.toISOString().split("T")[0]);
		// date.target.placeholder = "";
		// setCheckOutDate(date.target.value);
		setTimeout(() => {
			toggleShowCalendar();
		}, 1000);
	};

	function toggleShowCalendar() {
		console.log("toggled");
		setcalendarIsVisible(!calendarIsVisible);
	}

	function handleFormSubmit(e) {
		e.preventDefault();

		Mews.Distributor(
			{
				// This is the demo id
				configurationIds: ["e12243c4-2c54-4d1c-a958-afb801279497"],
				// This is the id from the Mews General Settings of the dashboard
				// configurationIds: ["b6f6f212-71c7-4e05-897a-afb801278392"],
				// This is the id from the Mews Booking Engines Settings of the dashboard
				// configurationIds: ["e12243c4-2c54-4d1c-a958-afb801279497"],
				openElements: ".distributor-open",
			},
			function (api) {
				// you can call API functions on a booking engine instance here
				// set different start and end date
				api.setStartDate(new Date(checkInDate));
				api.setEndDate(new Date(checkOutDate));
				if (room?.singleRooms?.mewsRoomId)
					api.showRates(room.singleRooms.mewsRoomId);
				api.open();
			}
		);
	}

	return (
		<>
			<SEO fullhead={room.seo.fullHead} />
			<Hero
				types="Single Room"
				imagePoster={room.singleRooms.roomshero}
				gallery={room.singleRooms.gallery}
				video={room.singleRooms.heroVideo}
			/>
			<MobileRoomsHero>
				<Flickity
					options={{
						cellAlign: "center",
						draggable: true,
						prevNextButtons: true,
						imagesLoaded: true,
						contian: true,
						pageDots: false,
						wrapAround: true,
						arrowShape:
							"M3.3,48.9l39.2,31.1l0.1-5.2l-29.9-24h83.5l-0.1-4l-83.5,0l29.9-23.2v-4.9L3.3,48.9z",
					}}
					disableImagesLoaded={false} // default false
					reloadOnUpdate={false} // default false
					static // default false
					flickityRef={(c) => {
						slider.current = c;
					}}>
					{room.singleRooms.mobileGallery.map((item, index) => {
						return (
							<div
								key={`gallery-item-${index}`}
								className={`roomGalleryMobileitem ${item.imageType}`}>
								<img
									src={item.image.mediaItemUrl}
									alt={item.image.altText}
								/>
							</div>
						);
					})}
				</Flickity>
			</MobileRoomsHero>
			<SingleRoomContentContainer className="content">
				<SingleRoomContent>
					<SingleRoomMainDesc className="sans-serif body-copy black">
						<GreyBGMobile>
							<p className="sans-serif-bold sub-heading">
								Sleeps {room.singleRooms.sleeps}
							</p>
							<h1 className="heading">
								{room.title === "The Irving Gill Penthouse"
									? "The Two-Story Irving Gill Penthouse"
									: room.title}
							</h1>
							<MobileBookingForm>
								<ReservationForm
									// action={room.singleRooms.cloudbedsLink}
									onSubmit={handleFormSubmit}
									method="POST">
									<ReservationFormLabel className="sans-serif uppercase">
										Check In
										<input
											type={"date"}
											name="widget_date"
											placeholder="mm/dd/yyyy"
											className="sans-serif"
											onChange={setCheckout}
										/>
									</ReservationFormLabel>
									<br />
									<ReservationFormLabel className="sans-serif uppercase">
										Check Out
										<input
											type={"date"}
											name="widget_date_to"
											placeholder="mm/dd/yyyy"
											className="sans-serif"
											value={checkOutDate}
											onChange={setCheckout}
										/>
									</ReservationFormLabel>
									<ReservationButton className="sans-serif uppercase distributor-open">
										Check Availability
									</ReservationButton>
								</ReservationForm>
							</MobileBookingForm>
						</GreyBGMobile>
						<MobilePadding>
							<p>{room.singleRooms.description}</p>
							<p
								className="sans-serif xs-copy underline mb-3"
								onClick={() =>
									setShowingFloorplan(!showingFloorplan)
								}>
								<a>
									View Floor Plan{" "}
									<img
										src="/assets/icons/Orli_Caret.svg"
										width="12px"
										height="7px"
										alt="caret"
									/>
								</a>
							</p>
							{showingFloorplan && room.singleRooms.floorplan && (
								<img
									src={
										room.singleRooms.floorplan.mediaItemUrl
									}
									alt={room.singleRooms.floorplan.altText}
									width="90%"
									height="auto"
									style={{ marginInline: "auto" }}
								/>
							)}
						</MobilePadding>
					</SingleRoomMainDesc>

					<FeatureContainer>
						<p className="sans-serif-bold sub-heading">
							Highlights
						</p>
						<FeatureList>
							{room.singleRooms.features.map((feature, index) => {
								return (
									<div
										key={index}
										className="sans-serif body-copy black">
										{feature.icon && (
											<img
												src={
													feature?.icon?.mediaItemUrl
												}
												alt={feature?.icon?.altText}
											/>
										)}
										<p>{feature.label}</p>
									</div>
								);
							})}
						</FeatureList>
					</FeatureContainer>

					<AmenitiesContainer>
						<p className="sans-serif-bold sub-heading">Features</p>
						<AmenitiesList>
							{room.singleRooms.amenities.map(
								(amenity, index) => {
									return (
										<li
											key={index}
											style={{ marginBottom: ".5rem" }}
											className="sans-serif body-copy black">
											{amenity}
										</li>
									);
								}
							)}
						</AmenitiesList>
						<p
							className="sans-serif body-copy black"
							style={{ marginTop: "2rem" }}>
							When booking, see available add-on amenities
							including The Juice Fix, The Dog Lover, and more.
						</p>
					</AmenitiesContainer>

					<AboutOrliContainer>
						<h2 className="heading">
							{room.singleRooms.aboutOrliTitle}
						</h2>
						<div
							className="sans-serif body-copy black"
							dangerouslySetInnerHTML={{
								__html: room.singleRooms.aboutOrliDescription,
							}}></div>
					</AboutOrliContainer>

					<NeighborhoodContainer>
						<h2 className="heading">
							{room.singleRooms.neighborhoodTitle}
						</h2>
						<div
							className="sans-serif body-copy black"
							dangerouslySetInnerHTML={{
								__html: room.singleRooms
									.neighborhoodDescription,
							}}></div>
						<ul style={{ paddingInline: 0 }}>
							{room.singleRooms.neighborhoodBullets.map(
								(bullet, index) => {
									return (
										<BulletItem
											key={index}
											className="serif black uppercase brown">
											{bullet.pointOfInterest && (
												<p>{bullet?.pointOfInterest}</p>
											)}
											{bullet.walkability && (
												<p>{bullet?.walkability}</p>
											)}
										</BulletItem>
									);
								}
							)}
						</ul>
						<p className="sans-serif xs-copy underline arrow-left relative">
							<Link href="/find-your-room">
								Back to All Rooms
							</Link>
						</p>
					</NeighborhoodContainer>
				</SingleRoomContent>

				<SingleRoomBookingForm className="sidebar">
					{calendarIsVisible ? (
						<CalendarWidget
							handleCheckin={setCheckin}
							handleCheckout={setCheckout}
						/>
					) : null}
					<GreyBackground className="greyBackground">
						<p className="sans-serif-bold sub-heading">
							Sleeps {room.singleRooms.sleeps}
						</p>
						<p className="heading">Reservations</p>
						<ReservationForm
							// action={room.singleRooms.cloudbedsLink}
							onSubmit={handleFormSubmit}
							method="POST">
							<ReservationFormLabel className="sans-serif uppercase">
								Check In
								<input
									type={"date"}
									name="widget_date"
									placeholder="mm/dd/yyyy"
									className="sans-serif"
									value={checkInDate}
									onChange={setCheckin}
									onFocus={toggleShowCalendar}
								/>
							</ReservationFormLabel>
							<br />
							<ReservationFormLabel className="sans-serif uppercase">
								Check Out
								<input
									type={"date"}
									name="widget_date_to"
									placeholder="mm/dd/yyyy"
									className="sans-serif"
									value={checkOutDate}
									onChange={setCheckout}
									onFocus={toggleShowCalendar}
								/>
							</ReservationFormLabel>
							<ReservationButton className="sans-serif uppercase distributor-open">
								Check Availability
							</ReservationButton>
						</ReservationForm>
					</GreyBackground>
				</SingleRoomBookingForm>
			</SingleRoomContentContainer>
		</>
	);
}

// Get all dynamic [room]s from the CMS
export async function getStaticPaths() {
	const res = await fetch(process.env.WP_GQL_API, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
                query Rooms {
                    rooms(first: 100) {
                        nodes {
                            slug
                        }
                    }
                }
            `,
		}),
	});

	const rooms = await res.json();

	const paths = rooms.data.rooms.nodes.map((room) => ({
		params: { room: room.slug },
	}));

	return {
		paths,
		fallback: false,
	};
}

// Get relative [slug] data
export async function getStaticProps({ params }) {
	const { room } = params;

	// Query for Sections and SEO data
	const roomsQuery = `
    query Rooms {
      myOptionsPage {
        options {
          navigation {
            navigationItems {
              image {
                altText
                mediaItemUrl
              }
              label
              link
            }
          }
          announcementBar {
            announcementBarText
            isAnnouncementBarActive
          }
        }
      }
      room(id: "${room}", idType: URI) {
        seo {
          fullHead
        }
        singleRooms {
			mewsRoomId
          cloudbedsLink
          featuredVideoUrl
          heroVideo
          floorplan {
            mediaItemUrl
            altText
          }
          roomshero {
            mediaItemUrl
            altText
          }
          gallery {
            mediaItemUrl
            altText
          }
          mobileGallery {
            imageType
            image {
              mediaItemUrl
              altText
            }
          }
          aboutOrliDescription
          aboutOrliTitle
          amenities
          description
          keyFeature
          neighborhoodDescription
          neighborhoodTitle
          sleeps
          squareFeet
          theme
          features {
            label
            icon {
              altText
              mediaItemUrl
            }
          }
          neighborhoodBullets {
            pointOfInterest
            walkability
          }
        }
        status
        title
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    }
    `;

	// Get page sections and SEO data
	const res = await fetch(process.env.WP_GQL_API, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ query: roomsQuery }),
	});

	// If status is not OK.
	if (!res?.ok) {
		return {
			notFound: true,
		};
	}

	let page;

	// Try...catch method is best way to get data on build runtime.

	try {
		const data = await res?.text();
		page = JSON.parse(data);
	} catch (e) {
		return {
			notFound: true,
		};
	}

	if (!page) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			data: page,
		},
	};

	// const data = await res.json()
	// const page = data

	// return {
	//     props: {
	//         data: page
	//     }
	// }
}
