import Image from "next/image";
import styled, { css } from "styled-components";

const BannerContainer = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
    gap: 2rem;
	max-width: 90%;
	margin-inline: auto;

	margin-block: 2rem;
	padding: 2rem 2rem;

    &.blue {
        background-color: var(--blue);
        p {color: var(--white);}
        .body p {line-height: 1.5;}
        p a,
        p a:visited {
            text-decoration: underline;
            color: var(--white);
        }
    }
    &.green {
        background-color: var(--green);
        p {color: var(--white);}
        .body p {line-height: 1.5;}
        p a,
        p a:visited {
            text-decoration: underline;
            color: var(--white);
        }
    }
    &.brown {
        background-color: var(--brown);
        p {color: var(--white);}
        .body p {line-height: 1.5;}
        p a,
        p a:visited {
            text-decoration: underline;
            color: var(--white);
        }
    }

	@media screen and (max-width: 900px) {
		margin-inline: auto;
        margin-block: 2rem;
	    padding: 2rem 1rem;
        flex-direction: column;
        gap: 1rem;
	}
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export default function Banner(props) {
	const { backgroundColor, title, copy, icon, showIcons, anchor } = props;

	return (
		<BannerContainer className={backgroundColor}>
			{anchor ? (
				<a
					id={anchor}
					style={{ position: "relative", top: "-150px" }}></a>
			) : null}
			{showIcons && (
				<Image
					src={icon.mediaItemUrl}
					alt={icon.altText}
					width={100}
					height={100}
					layout="fixed"
				/>
			)}
            <TextContainer>
            {title && (
			    <p className="heading">{title}</p>
            )}
			{copy && (
				<div className="sans-serif body black" dangerouslySetInnerHTML={{ __html: copy }}></div>
			)}
            </TextContainer>
		</BannerContainer>
	);
}
