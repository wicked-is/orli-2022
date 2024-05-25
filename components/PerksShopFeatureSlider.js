"use client";
import Image from "next/image";
import { useRef } from "react";
import styled from "styled-components";

import "flickity/css/flickity.css";
import Flickity from "react-flickity-component";
export const PerksShopFeatureSliderQueryFragment = ``;

const Button = styled.a``;
const Title = styled.div``;
const Subtitle = styled.div``;
const Content = styled.div``;
const ContentContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
const RightMedia = styled(Image)`
	margin-top: 15rem;
`;
const RightMediaContainer = styled.div`
	margin-top: 10rem;
`;
const BottomMedia = styled(Image)`
	margin-top: 5rem;
`;
const TopMedia = styled(Image)``;
const Left = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;
const SingleSection = styled.div`
	display: flex;
	flex-direction: row;
	gap: 2rem;
	/* align-items: center; */
	justify-content: center;
	max-width: 90vw;
	margin-right: 5vw;
`;
const MediaContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 2rem;
	margin-block: 7rem;
	flex: 1.75;
`;
const PerksShopFeatureSliderSection = styled.section``;

export default function PerksShopFeatureSlider(props) {
	const slider = useRef(null);
	return (
		<PerksShopFeatureSliderSection>
			{props.anchor && <a id={props.anchor}></a>}
			<Flickity
				options={{
					draggable: true,
					cellAlign: "left",
					prevNextButtons: false,
					// arrowShape:
					// 	"M3.3,48.9l39.2,31.1l0.1-5.2l-29.9-24h83.5l-0.1-4l-83.5,0l29.9-23.2v-4.9L3.3,48.9z",
					// pageDots: false,
					wrapAround: true,
					imagesLoaded: true,
					selectedAttraction: 0.007,
					friction: 0.17,
					// autoPlay: 5500,
					pauseAutoPlayOnHover: true,
				}}
				disableImagesLoaded={false} // default false
				reloadOnUpdate={false} // default false
				static // default false
				flickityRef={(c) => {
					slider.current = c;
				}}>
				<SingleSection>
					<MediaContainer>
						<Left>
							<TopMedia
								src="https://orlidev.wpengine.com/wp-content/uploads/2024/05/Screenshot-2024-05-14-at-4.31-1.jpg"
								width={393}
								height={413}
							/>
							{/* <BottomMedia
							src="https://orlidev.wpengine.com/wp-content/uploads/2024/05/Screenshot-2024-05-14-at-5.04-1.jpg"
							width={428}
							height={509}
						/> */}
						</Left>
						<RightMediaContainer>
							<RightMedia
								src="https://orlidev.wpengine.com/wp-content/uploads/2024/05/Screenshot-2024-05-14-at-4.32-1.jpg"
								width={416}
								height={515}
							/>
						</RightMediaContainer>
					</MediaContainer>
					<ContentContainer>
						<Subtitle className="sans-serif-bold sub-heading">
							Shop
						</Subtitle>
						<Title className="heading">All Things Orli</Title>
						<Content
							className="black body-copy sans-serif"
							style={{ marginTop: "1rem", marginBottom: "3rem" }}>
							Explore La Jolla&apos;s charm with our signature
							Orli candle & Room Spray. Infuse your space with the
							soothing aromas of cedar, leather, and cypress,
							perfectly balanced with notesof citrus, rosemary,
							and lavender.
						</Content>
						<Button
							href="/shop"
							style={{
								padding: "1.25rem 2.5rem",
								backgroundColor: "#8C351F",
								maxWidth: "fit-content",
								color: "white",
							}}>
							Shop Now
						</Button>
					</ContentContainer>
				</SingleSection>
				<SingleSection>
					<MediaContainer>
						<Left>
							{/* <TopMedia
								src="https://orlidev.wpengine.com/wp-content/uploads/2024/05/Screenshot-2024-05-14-at-4.31-1.jpg"
								width={393}
								height={413}
							/> */}
							<BottomMedia
								src="https://orlidev.wpengine.com/wp-content/uploads/2024/05/Screenshot-2024-05-14-at-5.04-1.jpg"
								width={428}
								height={509}
								style={{ justifySelf: "flex-end" }}
							/>
						</Left>
						<RightMediaContainer>
							<RightMedia
								src="https://orlidev.wpengine.com/wp-content/uploads/2024/05/Screenshot-2024-05-14-at-4.32-1.jpg"
								width={416}
								height={515}
							/>
						</RightMediaContainer>
					</MediaContainer>
					<ContentContainer>
						<Subtitle className="sans-serif-bold sub-heading">
							Shop
						</Subtitle>
						<Title className="heading">All Things Orli</Title>
						<Content
							className="black body-copy sans-serif"
							style={{ marginTop: "1rem", marginBottom: "3rem" }}>
							Explore La Jolla&apos;s charm with our signature
							Orli candle & Room Spray. Infuse your space with the
							soothing aromas of cedar, leather, and cypress,
							perfectly balanced with notesof citrus, rosemary,
							and lavender.
						</Content>
						<Button
							href="/shop"
							style={{
								padding: "1.25rem 2.5rem",
								backgroundColor: "#8C351F",
								maxWidth: "fit-content",
								color: "white",
							}}>
							Shop Now
						</Button>
					</ContentContainer>
				</SingleSection>
			</Flickity>
		</PerksShopFeatureSliderSection>
	);
}
