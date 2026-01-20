import Image from "next/image";
import styled from "styled-components";

export const TwoColumnContentMediaQuery = `
    ... on Page_Flexiblecontent_Sections_TwoColumnContentMedia {
          anchor
          content
          ctaLink
          ctaText
          eyebrow
          fieldGroupName
          title
          video {
            mediaItemUrl
          }
          mediaImage {
            altText
            mediaItemUrl
          }
        }
`;

const ContentContainer = styled.section`
	display: flex;
	align-items: center;
	gap: 60px;
	padding: 80px 60px;
	max-width: 1362px;
	margin-left: auto;
	margin-right: auto;

	/* Every second ContentSection gets reversed layout and white background */
	& + & {
		flex-direction: row-reverse;
		background-color: #ffffff;
	}

	/* Every fourth section (and pattern continues) goes back to normal */
	& + & + & {
		flex-direction: row;
	}

	& + & + & + & {
		flex-direction: row-reverse;
		background-color: #ffffff;
	}

	@media (max-width: 968px) {
		flex-direction: column !important;
		padding: 60px 30px;
		gap: 40px;
	}
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 1362px;
	width: 100%;

	@media (max-width: 968px) {
		flex-direction: column;
	}
`;

const TextContent = styled.div`
	flex: 1;
	max-width: 500px;
`;

const Eyebrow = styled.p`
	/* font-size: 12px; */
	letter-spacing: 2px;
	text-transform: uppercase;
	margin-bottom: 12px;
	color: #000;
`;

const Title = styled.h2`
	/* font-family: "Playfair Display", serif; */
	/* font-size: 48px; */
	/* font-weight: 400; */
	/* margin-bottom: 24px; */
	color: #1a1a1a;

	@media (max-width: 968px) {
		font-size: 36px;
	}
`;

const Description = styled.p`
	font-size: 20px;
	line-height: 1.8;
	color: #000;
	margin-bottom: 32px;
`;

const BookButton = styled.button`
	background-color: #6b4423;
	color: white;
	padding: 14px 32px;
	border: none;
	cursor: pointer;
	font-size: 13px;
	letter-spacing: 1.5px;
	text-transform: uppercase;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #533318;
	}
`;

const ImageWrapper = styled.div`
	flex: 1;

	@media (max-width: 968px) {
		width: 100%;
	}
`;

const ContentImage = styled(Image)`
	width: 100%;
	height: auto;
	display: block;
`;

const ContentSection = (props) => {
	return (
		<ContentContainer>
			<TextContent>
				<Eyebrow className="sans-serif-bold sub-heading">
					{props.data.eyebrow}
				</Eyebrow>
				<Title className="heading">{props.data.title}</Title>
				<Description className="sans-serif xs-copy black">
					{props.data.content}
				</Description>
				<BookButton className="sans-serif">
					{props.data.ctaText}
				</BookButton>
			</TextContent>
			<ImageWrapper>
				<ContentImage
					src={props?.data.mediaImage?.mediaItemUrl}
					alt={props?.data.mediaImage?.altText}
					width={854}
					height={650}
				/>
			</ImageWrapper>
		</ContentContainer>
	);
};

export default ContentSection;
