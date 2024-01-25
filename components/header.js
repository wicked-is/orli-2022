import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";

import styles from "../styles/header.module.css";
import Script from "next/script";
import Analytics from "./Analytics";
import WeatherWidget from "./WeatherWidget";

import Favicon from "../public/favicon.ico";

import ShopifyIcon from "../public/assets/icons/Orli_Icon_Spotify.svg";
import InstagramIcon from "../public/assets/icons/Orli_Icon_Instagram.svg";
import LocationIcon from "../public/assets/icons/Orli_Icon_Location.svg";
import BagIcon from "../public/assets/icons/Orli_Icon_bag.svg";

export default function Header(props) {
	const navItems = props.navItems.length
		? props.navItems
		: [
				{
					image: {
						altText: "",
						mediaItemUrl:
							"https://orlidev.wpengine.com/wp-content/uploads/2022/09/Nav-Wing-1Web.jpg",
					},
					label: "Find Your Room",
					link: "/find-your-room/",
				},
				{
					image: {
						altText: "",
						mediaItemUrl:
							"https://orlidev.wpengine.com/wp-content/uploads/2022/09/Orli_MenuTastefulTouchesWeb.jpg",
					},
					label: "Tasteful Touches",
					link: "/amenities/",
				},
				{
					image: {
						altText: "",
						mediaItemUrl:
							"https://orlidev.wpengine.com/wp-content/uploads/2022/06/Orli_Discoveriesweb.jpg",
					},
					label: "Discoveries",
					link: "/discoveries/",
				},
				{
					image: {
						altText: "",
						mediaItemUrl:
							"https://orlidev.wpengine.com/wp-content/uploads/2022/09/Orli_Menu_GatheringsWeb.jpg",
					},
					label: "Gatherings",
					link: "/gatherings/",
				},
				{
					image: {
						altText: "",
						mediaItemUrl:
							"https://orlidev.wpengine.com/wp-content/uploads/2022/09/Orli_Menu_Our-StoryWeb.jpg",
					},
					label: "Our Story",
					link: "/our-story/",
				},
				{
					image: {
						altText: "",
						mediaItemUrl:
							"https://orlidev.wpengine.com/wp-content/uploads/2022/06/Orli_TheJournalweb.jpg",
					},
					label: "The Journal",
					link: "/the-journal/",
				},
				{
					image: {
						altText: "",
						mediaItemUrl:
							"https://orlidev.wpengine.com/wp-content/uploads/2022/09/Orli_MenuGallery2Web.jpg",
					},
					label: "Gallery",
					link: "/gallery/",
				},
		  ];
	const topBar = props?.topBar;

	const [navIsOpen, setNavIsOpen] = useState(false);
	const [navImage, setNavImage] = useState(
		"https://orlistg.wpengine.com/wp-content/uploads/2022/09/Orli_Menu_Our-StoryWeb.jpg"
	);
	const [announcementbarIsOpen, setAnnouncementbarIsOpen] = useState(false);

	useEffect(() => {
		setNavImage(navImage);
	}, [navImage]);

	useEffect(() => {
		if (topBar) {
			setAnnouncementbarIsOpen(topBar.isAnnouncementBarActive);
		}
	}, [topBar]);

	function toggleNav() {
		setNavIsOpen(!navIsOpen);
	}

	function handleClick(e, path) {
		e.preventDefault();
		window.location = path;
	}

	function closeAnnouncementBar() {
		setAnnouncementbarIsOpen(false);
	}

	return (
		<header className={`${styles.header} ${navIsOpen ? styles.open : ""}`}>
			<Analytics />
			<Script
				src="https://app.mews.com/distributor/distributor.min.js"
				strategy="beforeInteractive"
			/>
			<Script
				id="lh-sdk"
				type="module"
				src="https://s3.us-east-2.amazonaws.com/cdn.prd.aws.life-house.com/rmms/booking-engine/2.0.0/sdk.min.js"
				strategy="beforeInteractive"
				data-hotel-id="b6f6f212-71c7-4e05-897a-afb801278392"
				data-theme='{
					"v2": {
						"palette": {
							"primary": "rgba(140, 54, 30, 1)",
							"primaryHover": "rgba(115, 52, 33, 1)",
							"primaryDimmed": "rgba(140, 54, 30, 0.6)",
							"primaryDisabled": "rgba(140, 54, 30, 0.32)",
							"destructive": "rgba(124, 70, 70, 1)",
							"destructiveHover": "rgba(101, 41, 41, 1)",
							"destructiveDimmed": "rgba(124, 70, 70, 0.6)",
							"destructiveDisabled": "rgba(124, 70, 70, 0.32)",
							"success": "rgba(71, 99, 82, 1)",
							"successHover": "rgba(40, 70, 52, 1)",
							"successDimmed": "rgba(71, 99, 82, 0.6)",
							"successDisabled": "rgba(71, 99, 82, 0.32)",
							"positive": "rgba(0, 0, 0, 1)",
							"positiveDimmed": "rgba(0, 0, 0, 0.6)",
							"positiveDisabled": "rgba(0, 0, 0, 0.32)",
							"negative": "rgba(255, 255, 255, 1)",
							"negativeDimmed": "rgba(255, 255, 255, 0.6)",
							"negativeDisabled": "rgba(255, 255, 255, 0.32)",
							"cell": "rgba(255, 255, 255, 1)",
							"cellHover": "rgba(251, 248, 247, 1)",
							"cellSelected": "rgba(239, 224, 219, 1)",
							"background": "rgba(255, 255, 255, 1)",
							"backgroundAlternative": "rgba(229,228,226, 1)",
							"separator": "rgba(230, 230, 230, 1)",
							"textAlternative": "rgba(0, 0, 0, 1)"
						},
						"typography": {
							"fonts": { "primary": "essonnes-display" },
							"largeTitle": {
								"font-family": "essonnes-display",
								"font-weight": "300",
								"font-size": "43px",
								"line-height": "41px",
								"text-transform": "uppercase"
							},
							"titleOne": {
								"font-family": "GT Walsheim",
								"font-weight": "300",
								"font-size": "28px",
								"line-height": "34px",
								"font-style": "italic"
							},
							"titleTwo": {
								"font-family": "GT Walsheim",
								"font-weight": "300",
								"font-size": "24px",
								"line-height": "32px"
							},
							"titleThree": {
								"font-family": "GT Walsheim",
								"font-weight": "300",
								"font-size": "28px",
								"line-height": "34px",
								"font-style": "italic"
							},
							"headline": {
								"font-family": "GT Walsheim",
								"font-weight": "300",
								"font-size": "17px",
								"line-height": "22px"
							},
							"body": {
								"font-family": "GT Walsheim",
								"font-weight": "500",
								"font-size": "16px",
								"line-height": "22px"
							},
							"callout": {
								"font-family": "GT Walsheim",
								"font-weight": "300",
								"font-size": "16px",
								"line-height": "21px"
							},
							"subhead": {
								"font-family": "essonnes-display",
								"font-weight": "300",
								"font-size": "15px",
								"line-height": "20px"
							},
							"footnote": {
								"font-family": "GT Walsheim",
								"font-weight": "300",
								"font-size": "13px",
								"line-height": "18px"
							},
							"captionOne": {
								"font-family": "GT Walsheim",
								"font-weight": "300",
								"font-size": "11px",
								"line-height": "14px"
							},
							"captionTwo": {
								"font-family": "GT Walsheim",
								"font-weight": "300",
								"font-size": "11px",
								"line-height": "13px"
							}
						}
					}
				}'
			/>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"></meta>
				<meta
					name="google-site-verification"
					content="W9uWEzplTotR5onZfBsXYP24CcPGRroR12P-KHIxlGY"
				/>
				<link rel="icon" href={Favicon.src} />
			</Head>
			<noscript
				dangerouslySetInnerHTML={{
					__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PMRKR2L" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
				}}></noscript>
			<noscript
				dangerouslySetInnerHTML={{
					__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TG8CZ4V" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
				}}></noscript>
			<noscript
				dangerouslySetInnerHTML={{
					__html: `<img
                    height="1"
                    width="1"
                    style="display:none"
                    src="https://www.facebook.com/tr?id=676429500584234&ev=PageView&noscript=1"
                />`,
				}}></noscript>
			{announcementbarIsOpen && (
				<div
					className={styles.announcementbar}
					style={{
						display: announcementbarIsOpen ? "flex" : "none",
					}}>
					<div
						className="sans-serif white xs-copy center"
						dangerouslySetInnerHTML={{
							__html: topBar.announcementBarText,
						}}></div>
					<button
						style={{
							color: "#ffffff",
							backgroundColor: "transparent",
							border: "none",
							fontSize: "1rem",
						}}
						onClick={closeAnnouncementBar}>
						&#10005;
					</button>
				</div>
			)}
			<div className={styles.sitebranding}>
				{navIsOpen ? (
					<Link href="/">
						<div className="openclick" onClick={() => toggleNav()}>
							<img
								src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg"
								alt="Orli La Jolla Logo"
								className={styles.headerlogo}
								width={380}
								height={95}
							/>
						</div>
					</Link>
				) : (
					<Link href="/">
						<img
							src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg"
							alt="Orli La Jolla Logo"
							className={styles.headerlogo}
							width={380}
							height={95}
						/>
					</Link>
				)}

				<div className={styles.telephoneContainer}>
					<Link href="tel:+16195760806">
						<img
							src="https://orlidev.wpengine.com/wp-content/uploads/2022/09/phone-solid.svg"
							alt="telephone link"
						/>
					</Link>
				</div>

				<Link href="/find-your-room">
					<div className={styles.primarybutton}>
						<p className="sans-serif xs-copy white center uppercase mobilehideme">
							Find Your Room
						</p>
						<p className="sans-serif xs-copy white center uppercase mobileshowme">
							Rooms
						</p>
					</div>
				</Link>

				<div className={styles.hamburgerContainer}>
					<div
						className="hamburger hamburger--collapse"
						type="button"
						onClick={() => toggleNav()}>
						{navIsOpen ? (
							<img
								className={styles.close}
								src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/white-copy.svg"
								alt="close icon"
							/>
						) : (
							<span className="hamburger-box">
								<span className="hamburger-inner"></span>
							</span>
						)}
						<div className={styles.hamburgermenu}>Menu</div>
					</div>
				</div>
			</div>

			<nav
				className={`${styles.navContianer} ${
					navIsOpen ? styles.showMeMobile : ""
				}`}>
				<div className="flex">
					<div className={`${styles.col160} relative`}>
						<div
							className={styles.backgroundImage}
							style={{ background: `url(${navImage})` }}></div>
					</div>
					<div
						className={`${styles.col140} relative flex flex-column justify-content-space-between`}>
						<WeatherWidget />
						<ul className={styles.mainNav}>
							{navItems.map((item, index) => {
								return (
									<li
										key={`ni-${index}`}
										onMouseEnter={() =>
											setNavImage(item.image.mediaItemUrl)
										}>
										<Link href={item.link} passHref>
											<a
												data-navimage={
													item.image.mediaItemUrl
												}
												data-alttext={
													item.image.altText
												}
												onClick={(e) =>
													handleClick(e, item.link)
												}
												className="serif-light white">
												{item.label}
											</a>
										</Link>
									</li>
								);
							})}
						</ul>
						<div className={styles.bottomnav}>
							<div className="col-1-50">
								<div style={{ display: "flex" }}>
									<Image
										src={LocationIcon}
										alt="location pin icon"
										width={30}
										height={30}
										// style={{ paddingRight: '.5rem' }}
									/>
									<address
										className="sans-serif xs-copy white left"
										style={{
											marginTop: ".88rem",
											marginLeft: ".5rem",
										}}>
										7753 Draper Ave,
										<br />
										La Jolla, CA 92037
									</address>
								</div>
								<div
									style={{
										display: "flex",
										marginTop: ".5rem",
									}}>
									<Image
										src={BagIcon}
										alt="shopping bag icon"
										width={30}
										height={30}
									/>
									<p className="directions xs-copy white left">
										<Link
											target="_blank"
											// href="https://goo.gl/maps/MvajX29ZNg3kz5M69"
											href="https://shop.stayorli.com/"
											rel="noreferrer"
											style={{
												textDecoration: "underline ",
											}}>
											Shop
										</Link>
									</p>
								</div>
							</div>
							<div className="col-1-50">
								<p className="sans-serif xs-copy white left">
									T:{" "}
									<a href="tel:18587272776">858.727.2776</a>
									<br />
									E:{" "}
									<a href="mailto:hello@stayorli.com">
										hello@stayorli.com
									</a>
									<br />
								</p>
								<p
									className={`${styles.contact} sans-serif xs-copy white left`}>
									<Link href="/contact">
										<span onClick={() => toggleNav()}>
											Contact
										</span>
									</Link>
								</p>
								<ul className={styles.socials}>
									<li>
										<a
											href="https://www.instagram.com/stayorli/"
											target="_blank"
											rel="noopener noreferrer">
											<Image
												src={InstagramIcon}
												alt="Instagram Logo"
												className="instagram"
												width={30}
												height={30}
											/>
										</a>
									</li>
									{/* <li>
                                        <Link href="/" passHref>
                                            <Image
                                               src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/facebook.svg"
                                               alt="facebook Logo"
                                               className="facebook"
                                               width={14}
                                               height={30} />
                                        </Link>
                                        </li>
                                    */}
									<li>
										<a
											href="https://open.spotify.com/playlist/5dt0gGfjFDjfd4CJe22E8T?si=6d7e7bfb014b433d"
											target="_blank"
											rel="noopener noreferrer">
											<Image
												src={ShopifyIcon}
												alt="spotify logo"
												className="spotify"
												width={30}
												height={30}
											/>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
