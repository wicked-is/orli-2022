import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import styled from "styled-components";
import { useWindowSize } from "../utils/hooks";
import FauxSocialFeed from "./fauxSocialFeed";
import OrliWebSticker from "../public/assets/images/OfferWebSticker.png";
import "../styles/footer.module.css";

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

	const [success, setSuccess] = useState(false);

	const [formState, setFormState] = useState({
		email: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		// console.log(e);

		const res = await fetch(
			"https://hooks.zapier.com/hooks/catch/2001353/bc24kj3/",
			{
				method: "POST",
				body: JSON.stringify({
					email: formState.email,
					time: new Date().toLocaleString(),
				}),
			},
		);
		// console.log(res);

		handleResponse(res);
	};

	const handleResponse = async (res) => {
		if (res.status === 200) setSuccess(true);
	};

	const handleChange = (e) => {
		e.preventDefault();
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			{props.page !== "/email" && <FauxSocialFeed image={props.page} />}

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
											type="text"
											id="email"
											name="email"
											aria-label="Email"
											placeholder="Enter Email*"
											onChange={handleChange}
										/>

										<button
											type="submit"
											aria-label="submit email"
											value="Submit"
											className="submit">
											Submit
										</button>
									</form>
								)}
							</div>
							<Link href="/">
								<img
									className="mobilefooter-logo"
									src="https://orlidev.wpengine.com/wp-content/uploads/2023/07/Orli_RegisteredLogo_White.svg"
									alt="orli logo"
								/>
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
												<Link
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
												</Link>
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
											href="/offers">
											Offers
										</Link>
										<Link
											className="walsh-regular"
											href="/faq">
											FAQ
										</Link>
										<Link
											className="walsh-regular"
											href="/press">
											Press
										</Link>
										<Link
											href="https://shop.stayorli.com/"
											target="_blank">
											Shop
										</Link>
										<Link href="/careers">Careers</Link>
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
								<p className="trademark white ">
									In Honor of the
									<br />
									Discerning Traveler &trade;
								</p>
								<p className="sans-serif copyright xs-copy white ">
									© {new Date().getFullYear()} Orli La Jolla
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
										<img
											className="footer-logo"
											src="https://orlidev.wpengine.com/wp-content/uploads/2023/07/Orli_RegisteredLogo_White.svg"
											width={380}
											height={75}
											alt="orli la jolla logo"
											//   layout="responsive"
										/>
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
									<div style={{ marginTop: "4.3rem" }}></div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="181"
										height="16"
										viewBox="0 0 181 16"
										fill="none">
										<g clip-path="url(#clip0_328_287)">
											<path
												d="M35.5041 15.6601V6.42995C35.5041 6.05667 35.5041 5.68339 35.5209 5.29315C35.5376 4.9029 35.5376 4.54659 35.5543 4.22422C35.5711 3.83397 35.5878 3.47767 35.6045 3.10439C35.4539 3.68127 35.32 4.20725 35.1693 4.73323C35.1191 4.9538 35.0522 5.17438 34.9852 5.41192C34.9182 5.64946 34.8513 5.87003 34.8011 6.0906C34.7341 6.31118 34.6839 6.51478 34.6169 6.70142C34.5667 6.88806 34.5165 7.05773 34.4663 7.19347L31.7546 15.694H29.5115L26.7998 7.19347C26.7496 7.05773 26.7161 6.88806 26.6491 6.70142C26.5989 6.51478 26.532 6.31118 26.4817 6.0906C26.4148 5.87003 26.3646 5.64946 26.2976 5.41192C26.2307 5.17438 26.1637 4.9538 26.1135 4.73323C25.9628 4.22422 25.8289 3.68127 25.6615 3.10439C25.6783 3.52857 25.7117 3.93578 25.7285 4.34299C25.7452 4.68233 25.762 5.05561 25.7787 5.42888C25.7954 5.81913 25.7954 6.1415 25.7954 6.42995V15.677H23V0.423583H27.2183L29.9133 8.94108C29.9802 9.16165 30.0639 9.43313 30.1476 9.7555C30.2313 10.0779 30.315 10.4003 30.3819 10.6887C30.4656 11.045 30.5661 11.4183 30.6665 11.7916C30.7669 11.4183 30.8674 11.062 30.9511 10.7057C31.0013 10.553 31.0348 10.4003 31.085 10.2475C31.1352 10.0948 31.1687 9.94214 31.2189 9.78944C31.2691 9.63673 31.3026 9.50099 31.3528 9.34829C31.403 9.21255 31.4365 9.09378 31.47 8.97501L34.1148 0.389648H38.3163V15.6431H35.5041V15.6601Z"
												fill="white"
											/>
											<path
												d="M41.2285 15.6603V0.423828H44.3755V15.6773H41.2285V15.6603Z"
												fill="white"
											/>
											<path
												d="M54.3191 13.37C54.905 13.37 55.4239 13.2851 55.8591 13.1155C56.2944 12.9458 56.6626 12.7252 56.9807 12.4538C57.2987 12.1823 57.5665 11.8769 57.7674 11.5206C57.985 11.1812 58.1524 10.8249 58.2863 10.4686L61.0315 11.5206C60.8139 12.0635 60.5293 12.6065 60.1611 13.1324C59.8096 13.6584 59.3576 14.1165 58.822 14.5237C58.2863 14.931 57.6502 15.2533 56.9137 15.5078C56.1772 15.7623 55.3067 15.8811 54.3191 15.8811C53.0135 15.8811 51.892 15.6775 50.9378 15.2873C49.9837 14.897 49.197 14.3541 48.5776 13.6415C47.9583 12.9458 47.4896 12.0974 47.1883 11.1303C46.887 10.1632 46.7363 9.11123 46.7363 7.95747C46.7363 6.8037 46.887 5.70084 47.1883 4.73371C47.4896 3.76659 47.9415 2.95216 48.5609 2.29045C49.1802 1.61176 49.9502 1.10275 50.8876 0.729472C51.825 0.373162 52.9298 0.186523 54.1852 0.186523C55.1728 0.186523 56.0265 0.288326 56.7631 0.491932C57.4996 0.695537 58.1357 1.00095 58.6713 1.37422C59.207 1.7475 59.6589 2.20561 60.0104 2.71463C60.362 3.22364 60.6465 3.80052 60.8307 4.41134L58.052 5.17486C57.9515 4.85248 57.8009 4.53011 57.6 4.24167C57.3991 3.93626 57.1313 3.68175 56.8133 3.44421C56.4952 3.20667 56.127 3.02003 55.6918 2.8843C55.2565 2.74856 54.7878 2.68069 54.2354 2.68069C53.4822 2.68069 52.8126 2.79946 52.277 3.05397C51.7246 3.30847 51.2726 3.66478 50.9211 4.1229C50.5696 4.58101 50.3018 5.14092 50.1344 5.78567C49.967 6.43043 49.8833 7.16001 49.8833 7.95747C49.8833 8.75492 49.967 9.48451 50.1344 10.1293C50.3018 10.791 50.5696 11.3509 50.9211 11.826C51.2726 12.3011 51.7413 12.6743 52.2937 12.9458C52.8628 13.2342 53.5324 13.37 54.3191 13.37Z"
												fill="white"
											/>
											<path
												d="M72.7819 15.6603V9.12796H66.2202V15.6603H63.0732V0.423828H66.2202V6.49806H72.7819V0.423828H75.9289V15.6773H72.7819V15.6603Z"
												fill="white"
											/>
											<path
												d="M78.875 15.6603V0.423828H90.7096V2.88406H82.022V6.71863H90.0567V9.17886H82.022V13.2001H91.1448V15.6603H78.875Z"
												fill="white"
											/>
											<path
												d="M93.4551 15.6603V0.423828H96.602V13.2001H104.67V15.6603H93.4551Z"
												fill="white"
											/>
											<path
												d="M106.812 15.6603V0.423828H109.959V15.6773H106.812V15.6603Z"
												fill="white"
											/>
											<path
												d="M122.045 15.6603L115.483 3.91906C115.517 4.24143 115.55 4.54684 115.584 4.86922C115.617 5.14069 115.634 5.4461 115.651 5.75151C115.667 6.07388 115.684 6.37929 115.684 6.66773V15.6603H112.889V0.423828H116.488L123.133 12.2669C123.1 11.9615 123.066 11.6391 123.033 11.3167C122.999 11.0283 122.982 10.7229 122.966 10.3666C122.949 10.0103 122.932 9.65394 122.932 9.29764V0.423828H125.728V15.6773H122.045V15.6603Z"
												fill="white"
											/>
											<path
												d="M134.382 15.6602V14.2858C134.75 13.4375 135.185 12.6909 135.704 12.0462C136.223 11.4014 136.776 10.8245 137.361 10.2986C137.931 9.77258 138.516 9.2975 139.069 8.83939C139.638 8.39825 140.14 7.94014 140.609 7.49899C141.061 7.05784 141.429 6.58276 141.714 6.09072C141.998 5.59867 142.132 5.03876 142.132 4.42794C142.132 3.98679 142.065 3.61352 141.948 3.29114C141.814 2.96877 141.63 2.68033 141.396 2.45975C141.161 2.23918 140.86 2.06951 140.525 1.95074C140.19 1.83197 139.805 1.78107 139.404 1.78107C139.002 1.78107 138.65 1.83197 138.316 1.95074C137.981 2.05254 137.679 2.22221 137.412 2.44279C137.144 2.66336 136.926 2.93483 136.759 3.25721C136.591 3.57958 136.491 3.95286 136.441 4.37704L134.482 4.1904C134.549 3.64745 134.7 3.12147 134.934 2.64639C135.169 2.17131 135.487 1.74713 135.905 1.37386C136.324 1.00058 136.809 0.729106 137.395 0.508533C137.981 0.304928 138.65 0.203125 139.404 0.203125C140.157 0.203125 140.81 0.287961 141.396 0.474599C141.981 0.661237 142.467 0.915744 142.869 1.27205C143.27 1.62836 143.572 2.06951 143.789 2.57852C144.007 3.08754 144.107 3.69835 144.107 4.37704C144.107 4.88605 144.024 5.3781 143.839 5.83621C143.655 6.29432 143.421 6.73547 143.12 7.15965C142.818 7.58383 142.467 7.97407 142.065 8.36431C141.663 8.75456 141.245 9.12783 140.81 9.50111C140.374 9.87439 139.939 10.2477 139.504 10.604C139.069 10.9603 138.65 11.3336 138.265 11.7068C137.88 12.0801 137.529 12.4534 137.227 12.8267C136.926 13.1999 136.675 13.6072 136.508 14.0144H144.358V15.6771H134.382V15.6602Z"
												fill="white"
											/>
											<path
												d="M156.745 8.04194C156.745 9.50111 156.611 10.7397 156.327 11.7408C156.059 12.7418 155.674 13.5393 155.205 14.1671C154.736 14.7949 154.167 15.219 153.531 15.4905C152.895 15.762 152.209 15.8977 151.489 15.8977C150.769 15.8977 150.066 15.762 149.447 15.4905C148.811 15.219 148.258 14.7779 147.79 14.1671C147.321 13.5563 146.953 12.7418 146.685 11.7408C146.417 10.7397 146.283 9.50111 146.283 8.04194C146.283 6.49793 146.417 5.24236 146.685 4.22433C146.953 3.22327 147.321 2.40885 147.79 1.815C148.258 1.22115 148.811 0.796974 149.447 0.559435C150.083 0.321895 150.786 0.203125 151.539 0.203125C152.293 0.203125 152.929 0.321895 153.565 0.559435C154.201 0.796974 154.736 1.22115 155.222 1.815C155.691 2.40885 156.059 3.22327 156.327 4.22433C156.611 5.22539 156.745 6.49793 156.745 8.04194ZM154.787 8.04194C154.787 6.83727 154.72 5.81924 154.569 5.02179C154.418 4.22433 154.218 3.57958 153.933 3.08754C153.648 2.61246 153.314 2.27311 152.912 2.06951C152.51 1.8659 152.058 1.7641 151.539 1.7641C151.02 1.7641 150.518 1.8659 150.116 2.06951C149.698 2.27311 149.363 2.61246 149.079 3.08754C148.794 3.56262 148.593 4.20737 148.443 5.00482C148.292 5.80228 148.225 6.8203 148.225 8.02497C148.225 9.22964 148.292 10.1798 148.443 10.9772C148.593 11.7747 148.794 12.4195 149.079 12.9115C149.363 13.4035 149.698 13.7429 150.116 13.9635C150.518 14.184 150.987 14.2858 151.506 14.2858C152.025 14.2858 152.46 14.184 152.878 13.9635C153.28 13.7429 153.632 13.4035 153.916 12.9115C154.201 12.4195 154.418 11.7747 154.569 10.9772C154.72 10.1968 154.787 9.21267 154.787 8.04194Z"
												fill="white"
											/>
											<path
												d="M158.704 15.6602V14.2858C159.072 13.4375 159.508 12.6909 160.026 12.0462C160.545 11.4014 161.098 10.8245 161.684 10.2986C162.253 9.77258 162.839 9.2975 163.391 8.83939C163.96 8.39825 164.462 7.94014 164.931 7.49899C165.4 7.05784 165.751 6.58276 166.036 6.09072C166.32 5.59867 166.454 5.03876 166.454 4.42794C166.454 3.98679 166.387 3.61352 166.27 3.29114C166.136 2.96877 165.952 2.68033 165.718 2.45975C165.483 2.23918 165.182 2.06951 164.847 1.95074C164.513 1.83197 164.128 1.78107 163.726 1.78107C163.324 1.78107 162.973 1.83197 162.638 1.95074C162.303 2.06951 162.002 2.22221 161.734 2.44279C161.466 2.66336 161.248 2.93483 161.081 3.25721C160.914 3.57958 160.813 3.95286 160.763 4.37704L158.805 4.1904C158.871 3.64745 159.022 3.12147 159.257 2.64639C159.491 2.17131 159.809 1.74713 160.227 1.37386C160.646 1.01755 161.131 0.729106 161.717 0.508533C162.303 0.304928 162.973 0.203125 163.726 0.203125C164.479 0.203125 165.132 0.287961 165.718 0.474599C166.304 0.661237 166.789 0.915744 167.191 1.27205C167.593 1.62836 167.894 2.06951 168.111 2.57852C168.329 3.08754 168.43 3.69835 168.43 4.37704C168.43 4.88605 168.346 5.3781 168.162 5.83621C167.978 6.29432 167.743 6.73547 167.442 7.15965C167.141 7.58383 166.789 7.97407 166.387 8.36431C165.986 8.75456 165.567 9.12783 165.132 9.50111C164.697 9.87439 164.261 10.2477 163.826 10.604C163.391 10.9603 162.973 11.3336 162.588 11.7068C162.203 12.0801 161.851 12.4534 161.55 12.8267C161.248 13.1999 160.997 13.6072 160.83 14.0144H168.681V15.6771H158.704V15.6602Z"
												fill="white"
											/>
											<path
												d="M181 10.7065C181 11.47 180.883 12.1657 180.665 12.8104C180.448 13.4552 180.096 13.9981 179.644 14.4563C179.192 14.9144 178.64 15.2707 177.97 15.5252C177.301 15.7797 176.531 15.8985 175.66 15.8985C174.874 15.8985 174.187 15.7967 173.601 15.61C173.016 15.4234 172.513 15.1689 172.112 14.8295C171.71 14.5072 171.392 14.1169 171.141 13.6758C170.906 13.2346 170.739 12.7595 170.639 12.2505L172.58 12.03C172.664 12.3184 172.765 12.5899 172.915 12.8613C173.066 13.1328 173.25 13.3704 173.501 13.5909C173.752 13.8115 174.053 13.9812 174.405 14.0999C174.756 14.2187 175.208 14.2866 175.711 14.2866C176.213 14.2866 176.665 14.2017 177.066 14.049C177.468 13.8963 177.82 13.6588 178.104 13.3704C178.389 13.0649 178.606 12.6917 178.774 12.2505C178.941 11.8094 179.008 11.3004 179.008 10.7405C179.008 10.2654 178.941 9.84119 178.791 9.45095C178.64 9.06071 178.422 8.72136 178.155 8.43292C177.87 8.14448 177.535 7.92391 177.133 7.7712C176.732 7.6185 176.28 7.53367 175.761 7.53367C175.443 7.53367 175.141 7.5676 174.874 7.6185C174.606 7.6694 174.355 7.75424 174.12 7.85604C173.886 7.95784 173.685 8.07661 173.484 8.21235C173.3 8.34809 173.116 8.48382 172.949 8.63653H171.074L171.576 0.441406H180.13V2.10418H173.334L173.049 6.93982C173.384 6.66834 173.819 6.44777 174.338 6.26113C174.857 6.07449 175.46 5.97269 176.163 5.97269C176.916 5.97269 177.585 6.09146 178.188 6.31203C178.791 6.54957 179.293 6.87195 179.711 7.29612C180.13 7.7203 180.448 8.22932 180.682 8.8062C180.916 9.38308 181 10.0109 181 10.7065Z"
												fill="white"
											/>
											<path
												d="M14.2328 13.4708L13.7072 14.0409L12.979 13.3537L12.4099 13.9696L11.7286 14.7077L12.4869 15.4254L11.9647 16.0006L11.2064 15.2829L10.2857 14.4107L10.808 13.8356L11.0607 13.5692L10.972 13.4826L10.5753 13.106L10.3225 13.3724L9.80028 13.9475L8.87963 13.0754L8.12135 12.3577L8.64361 11.7825L9.40189 12.5002L10.0832 11.7622L10.6456 11.1531L7.60746 8.27034C7.60746 8.27034 8.13139 7.68158 8.12972 7.70024L14.2328 13.4708ZM0.16023 8.49939C0.264013 8.79632 0.428056 9.07119 0.647338 9.31212C1.2784 10.001 2.15386 10.1656 3.25362 9.80077L3.36075 9.76345L3.34736 9.80077C2.90879 10.9596 2.99416 11.8809 3.59844 12.5427C4.0119 12.9957 4.54755 13.2604 5.19033 13.3299C5.31755 13.3435 5.43975 13.3486 5.56027 13.3435C6.04738 13.3215 6.47255 13.1416 6.82909 12.8073C7.2074 12.4527 8.10796 10.885 7.32122 8.42983L7.30281 8.37045L6.80733 8.50279L6.8157 8.56048C7.08353 10.3641 6.8994 11.5789 6.27 12.1694C6.0139 12.4103 5.68414 12.5104 5.26231 12.4731C4.84551 12.4409 4.49231 12.2695 4.21444 11.9658C3.48964 11.1734 3.91816 9.88222 5.48661 8.12951L5.52679 8.0854L5.18029 7.70364L5.13342 7.74096C3.29044 9.19335 1.98814 9.5293 1.26334 8.73524C1.00053 8.44849 0.859925 8.08709 0.841512 7.65952C0.823099 7.23025 0.946968 6.896 1.21982 6.64149C1.84753 6.05273 3.0561 5.95942 4.81203 6.36493L4.86894 6.3785L5.03466 5.88815L4.97607 5.8644C3.89975 5.43344 3.10464 4.94309 2.61418 4.40692C2.29447 4.0557 2.12708 3.68582 2.11871 3.30576C2.10531 2.92569 2.27103 2.57108 2.61251 2.2521C3.3256 1.5819 4.02362 1.64128 4.74675 2.43195C5.22716 2.95793 5.64564 3.79441 5.98544 4.91594L6.00385 4.97532L6.49933 4.84298L6.49096 4.78529C6.22314 2.98169 6.40559 1.76684 7.03498 1.17638C7.29109 0.93545 7.62085 0.835344 8.04268 0.872671C8.46115 0.904909 8.81268 1.07628 9.09054 1.37999C9.81535 2.17235 9.38683 3.46355 7.81837 5.21456L7.7782 5.25867L8.1247 5.64043L8.17157 5.60311C10.0162 4.15072 11.3185 3.81647 12.0433 4.60883C12.3061 4.89558 12.4467 5.25698 12.4635 5.68455C12.4819 6.11382 12.358 6.44807 12.0868 6.70427C11.4591 7.29303 10.2506 7.38635 8.49463 6.98084L8.43772 6.96726L8.272 7.45422L8.32557 7.47967C10.6021 8.54012 12.2576 7.70703 12.6576 7.33036C12.9774 7.03004 13.1816 6.64149 13.2653 6.1732C13.3473 5.70661 13.3071 5.26037 13.1464 4.84468C13.0426 4.54605 12.8786 4.27288 12.6593 4.03195C12.0299 3.34309 11.1562 3.1785 10.0581 3.5433L9.94424 3.57723L9.95596 3.54839C10.3945 2.38784 10.3108 1.46482 9.70654 0.803106C9.29309 0.350084 8.75744 0.0853969 8.11465 0.0158316C7.47187 -0.0537336 6.92116 0.121028 6.4759 0.540116C6.02729 0.960901 5.75779 1.48349 5.67577 2.09091L5.66405 2.18593L5.30918 1.79738C4.84049 1.28497 4.29646 1.01011 3.69051 0.981261C3.08455 0.952417 2.53049 1.16451 2.05342 1.61244C1.52949 2.10449 1.27338 2.6627 1.29012 3.27182C1.31021 3.88094 1.57469 4.46631 2.07351 5.01265L2.34971 5.31467C1.59812 5.42325 1.02564 5.6574 0.647338 6.01371C0.329295 6.31403 0.123404 6.70258 0.0397087 7.17087C-0.0439869 7.63916 -0.000465202 8.0837 0.16023 8.49939Z"
												fill="white"
											/>
										</g>
										<defs>
											<clipPath id="clip0_328_287">
												<rect
													width="181"
													height="16"
													fill="white"
												/>
											</clipPath>
										</defs>
									</svg>

									<p className="trademark white ">
										In Honor of the
										<br />
										Discerning Traveler &trade;
									</p>
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
												onSubmit={handleSubmit}>
												<input
													type="text"
													id="email"
													name="email"
													placeholder="Enter Email*"
													onChange={handleChange}
												/>
												<button
													type="submit"
													aria-label="submit email"
													value="Submit"
													className="submit">
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
										<Link href="/offers">
											Offers&nbsp;&&nbsp;Upgrades
										</Link>
										<Link href="/gallery">Gallery</Link>
										<Link href="/influencer-inquiry">
											Influencers
										</Link>
										<Link href="/press">Press</Link>
										<Link href="/faq">FAQ</Link>
										<Link href="/gatherings">Events</Link>
										<Link href="/event-vendor">
											Event Vendors
										</Link>
										<Link href="/careers">Careers</Link>
										{/* <Link
											href="https://giftup.app/place-order/d0df71a0-f0f5-4065-f9d7-08dab8104ad7?platform=hosted"
											passHref>
											<a target="_blank">Gift Cards</a>
										</Link> */}
										<Link
											href="https://shop.stayorli.com/"
											target="_blank">
											Shop
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
										<p className="sans-serif copyright xs-copy white">
											© {new Date().getFullYear()} Orli La
											Jolla |{" "}
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
						<Link
							href="/offers"
							aria-label="link to offers page"
							tabIndex={0}
							style={{
								position: "fixed",
								bottom: "4rem",
								right: "1rem",
								zIndex: 99,
							}}>
							<Image
								src={OrliWebSticker}
								width={75}
								height={75}
								id="shop-icon-btn"
								alt="Orli Offers graphic"
							/>
						</Link>
					</footer>
				))}
			<Script id="userway" strategy="lazyOnload">
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
