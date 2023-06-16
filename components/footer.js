import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useWindowSize } from "../utils/hooks";
import styled from "styled-components";
import FauxSocialFeed from "./fauxSocialFeed";
import Script from "next/script";

const MobileFooterContainer = styled.footer`
	display: flex;
	flex-direction: column;
	background: url(https://orlidev.wpengine.com/wp-content/uploads/2022/06/footer-bg.jpg)
		no-repeat center center;
	background-size: cover !important;
	-webkit-background-size: cover !important;
	-o-background-size: cover !important;
	-ms-background-size: cover !important;
	padding: 10% 10% 6rem 10%;
`;
const ColumnContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;
const GetDirectionsLink = styled.p`
	margin: 0 0 1.5rem;
`;
const Left = styled.div`
	width: 70%;
	@media only screen and (max-width: 600px) {
		width: 60%;
		margin: 0 10% 0 0;
		address,
		p {
			font-size: 0.9rem;
		}
	}
	.socials {
		padding-top: 1rem;
		padding-bottom: 3rem;
	}
`;
const Right = styled.div`
	width: 30%;
	.footer-links {
		grid-template-columns: 1fr;
		font-size: var(--body-copy);
	}
	@media only screen and (max-width: 600px) {
		.footer-links {
			font-size: 0.9rem;
		}
		.footer-links .privacy {
			padding: 5.5rem 0 0.5rem 0;
		}
	}
`;
const FullWidth = styled.div`
	width: 100%;
`;

export default function Footer(props) {
	const size = useWindowSize();

	const [email, setEmail] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch(
			"https://hooks.zapier.com/hooks/catch/2001353/bc24kj3/",
			{
				method: "POST",
				body: JSON.stringify({
					email,
				}),
			}
		);

		handleResponse(res);
	};

	const handleResponse = async (res) => {
		if (res.status === 200) setSuccess(true);
	};

	return (
		<>
			{props.page !== "/email" && (
				<FauxSocialFeed image={props.footerImages} />
			)}

			{props.page !== "/email" &&
				(size.width < 768 ? (
					<>
						<MobileFooterContainer className="mobile-footer">
							<div className="email-signup">
								<p className="serif white left">
									Exclusive Offers, News & Events
								</p>
								{success ? (
									<div className="sans-serif body-copy white left">
										<p>Success. Thanks for joining us.</p>
									</div>
								) : (
									<form
										id="emailcapture"
										onSubmit={handleSubmit}>
										<input
											id="email"
											name="email"
											value={email}
											aria-label="Email"
											placeholder="Enter Email*"
											onChange={() =>
												setEmail(event.target.value)
											}
										/>
										<button className="submit">
											Submit
										</button>
									</form>
								)}
							</div>
							<Link href="/">
								<a>
									<img
										className="mobilefooter-logo"
										src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg"
										alt="orli logo"
									/>
								</a>
							</Link>
							<p className="heading white mb-2">Contact Us</p>
							<ColumnContainer>
								<Left>
									<address className="sans-serif xs-copy white left">
										Orli La Jolla
										<br />
										7753 Draper Ave,
										<br />
										La Jolla, CA 92037
									</address>

									<GetDirectionsLink className="directions xs-copy white left">
										<Link
											target="_blank"
											href="https://www.google.com/search?q=7753+Draper+Ave%2C+La+Jolla%2C+CA+92037&rlz=1C5CHFA_enUS963US963&oq=7753+Draper+Ave%2C+La+Jolla%2C+CA+92037&aqs=chrome..69i57j0i512j69i60l3.816j0j4&sourceid=chrome&ie=UTF-8#">
											Get Directions
										</Link>
									</GetDirectionsLink>
									<div>
										<p
											className="sans-serif xs-copy white left mt-0"
											id="phone-number">
											T:{" "}
											<a href="tel:18587272776">
												858.727.2776
											</a>
											<br />
											E: info@stayorli.com
											<br />
											<br />
											<span className="contactText">
												<Link href="/contact">
													Contact
												</Link>
											</span>
										</p>
										<ul className="socials">
											<li>
												<a
													href="https://www.instagram.com/stayorli/"
													target="_blank"
													rel="noopener noreferrer">
													<Image
														src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/instagram-copy.svg"
														alt="Instagram Logo"
														className="instagram"
														width={30}
														height={30}
													/>
												</a>
											</li>
											{/* <li>
                                            <Link href="/">
                                                <Image
                                                    src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/facebook.svg"
                                                    alt="facebook Logo"
                                                    className="facebook"
                                                    width={14}
                                                    height={30} />
                                            </Link>
                                        </li> */}
											<li>
												<a
													target="_blank"
													href="https://open.spotify.com/playlist/5dt0gGfjFDjfd4CJe22E8T?si=278d0b0810534a75"
													rel="noopener noreferrer">
													<Image
														src="https://orlidev.wpengine.com/wp-content/uploads/2022/08/spotify-brands.svg"
														alt="spotify logo"
														className="spotify"
														width={30}
														height={30}
													/>
												</a>
											</li>
										</ul>
									</div>
								</Left>
								<Right>
									<div className="footer-links">
										<Link
											className="walsh-regular"
											passHref
											href="/offers">
											<a className="walsh-regular">
												Offers
											</a>
										</Link>
										<Link
											className="walsh-regular"
											passHref
											href="/faq">
											<a className="walsh-regular">FAQ</a>
										</Link>
										<Link
											className="walsh-regular"
											passHref
											href="/press">
											<a className="walsh-regular">
												Press
											</a>
										</Link>
										<Link
											href="https://shop.stayorli.com/"
											passHref>
											<a
												className="walsh-regular"
												target="_blank">
												Shop
											</a>
										</Link>
										<Link
											href="/offers/stashrewards"
											passHref>
											<a
												className="walsh-regular"
												target="_blank">
												StashRewards
											</a>
										</Link>
										<Link
											href="/privacy-policy"
											className="privacy">
											Privacy Policy
										</Link>
										<Link href="/cookie-policy">
											Cookie Policy
										</Link>
										<Link href="/accessibility-statement">
											Accessibility
										</Link>
										<Link href="/terms-conditions">
											Terms
										</Link>
									</div>
								</Right>
							</ColumnContainer>
						<FullWidth>
						<p className="trademark white left">In Honor of the<br/>Discerning Traveler</p>
						<p className="sans-serif copyright xs-copy white left">
										© 2023 Orli La Jolla
						</p>
						</FullWidth>
						</MobileFooterContainer>
					</>
				) : (
					<footer className="footer desk-footer">
						<div className="inner-container">
							<div>
								<div>
									<Link href="/">
										<a>
											<img
												className="footer-logo"
												src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg"
												width={380}
												height={75}
												alt="orli la jolla logo"
												//   layout="responsive"
											/>
										</a>
									</Link>
								</div>
								<div>
									<address className="sans-serif xs-copy white left">
										Orli La Jolla
										<br />
										7753 Draper Ave,
										<br />
										La Jolla, CA 92037
									</address>

									<p className="directions xs-copy white left">
										<Link href="https://www.google.com/search?q=7753+Draper+Ave%2C+La+Jolla%2C+CA+92037&rlz=1C5CHFA_enUS963US963&oq=7753+Draper+Ave%2C+La+Jolla%2C+CA+92037&aqs=chrome..69i57j0i512j69i60l3.816j0j4&sourceid=chrome&ie=UTF-8#">
											Get Directions
										</Link>
									</p>
									<p className="trademark white left">In Honor of the<br/>Discerning Traveler</p>
								</div>
							</div>
							<div>
								<div>
									<div className="email-signup">
										<p className="serif white left">
											Exclusive Offers, News & Events
										</p>
										{success ? (
											<div
												style={{
													minHeight: "47px",
													display: "flex",
													alignContent: "center",
												}}>
												<p
													className="sans-serif copyright xs-copy white left"
													style={{
														verticalAlign: "center",
													}}>
													Success. Thanks for joining
													us.
												</p>
											</div>
										) : (
											<form
												id="emailcapture"
												action="https://hooks.zapier.com/hooks/catch/2001353/bc24kj3/"
												onSubmit={handleSubmit}>
												<input
													id="email"
													name="email"
													value={email}
													placeholder="Enter Email*"
													onChange={() =>
														setEmail(
															event.target.value
														)
													}
												/>
												<button className="submit">
													Submit
												</button>
											</form>
										)}
									</div>
								</div>

								<div>
									<div className="footer-links">
										<Link href="/find-your-room">
											Rooms
										</Link>
										<Link href="/our-story">Story</Link>
										<Link href="/amenities">Amenities</Link>
										<Link href="/gallery">Gallery</Link>
										<Link href="/the-journal">Journal</Link>
										<Link href="/discoveries">
											Discoveries
										</Link>
										<Link href="/faq">FAQ</Link>
										<Link href="/gatherings">Events</Link>
										<Link href="/press">Press</Link>
										<Link
											href="https://giftup.app/place-order/d0df71a0-f0f5-4065-f9d7-08dab8104ad7?platform=hosted"
											passHref>
											<a target="_blank">Gift Cards</a>
										</Link>
										<Link
											href="https://shop.stayorli.com/"
											passHref>
											<a target="_blank">Shop</a>
										</Link>
										<Link
											href="/offers/stashrewards"
											passHref>
											<a target="_blank">StashRewards</a>
										</Link>
									</div>
								</div>
								<div>
									<div>
										<div>
											<p
												className="sans-serif xs-copy white left mt-0"
												id="phone-number">
												T:{" "}
												<a href="tel:18587272776">
													858.727.2776
												</a>
												<br />
												E:{" "}
												<a href="mailto:hello@stayorli.com">
													hello@stayorli.com
												</a>
												<br />
												<br />
												<span className="contactText">
													<Link href="/contact">
														Contact
													</Link>
												</span>
											</p>
											<ul className="socials">
												<li>
													<a
														href="https://www.instagram.com/stayorli/"
														target="_blank"
														rel="noopener noreferrer">
														<Image
															src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/instagram-copy.svg"
															alt="Instagram Logo"
															className="instagram"
															width={30}
															height={30}
														/>
													</a>
												</li>
												{/* <li>
                                                <Link href="/">
                                                    <Image
                                                        src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/facebook.svg"
                                                        alt="facebook Logo"
                                                        className="facebook"
                                                        width={14}
                                                        height={30} />
                                                </Link>
                                            </li> */}
												<li>
													<a
														target="_blank"
														href="https://open.spotify.com/playlist/5dt0gGfjFDjfd4CJe22E8T?si=278d0b0810534a75"
														rel="noopener noreferrer">
														<Image
															src="https://orlidev.wpengine.com/wp-content/uploads/2022/08/spotify-brands.svg"
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

								<div>
									<div>
										<p className="sans-serif copyright xs-copy white left">
											© 2023 Orli La Jolla |{" "}
											<Link href="/privacy-policy">
												Privacy Policy
											</Link>{" "}
											|{" "}
											<Link href="/cookie-policy">
												Cookie Policy
											</Link>{" "}
											|{" "}
											<Link href="/accessibility-statement">
												Accessibility Statement
											</Link>{" "}
											|{" "}
											<Link href="/terms-conditions">
												Terms & Conditions
											</Link>
										</p>
									</div>
								</div>
							</div>
						</div>
					</footer>
				))}
			<Script id="userway" strategy="afterInteractive">
				{`(function(d){var s = d.createElement("script");s.setAttribute("data-account", "DA15DgPw2p");s.setAttribute("src", "https://cdn.userway.org/widget.js");(d.body || d.head).appendChild(s);})(document)`}
			</Script>
			<noscript
				dangerouslySetInnerHTML={{
					__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N3Z8NP4"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
				}}
			/>
		</>
	);
}
