import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styled, { css } from "styled-components";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const BlogGridContainer = styled.section`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	justify-content: center;
	margin-bottom: 6rem;
`;

const BlogTitle = styled.div`
	cursor: pointer;
	transition: 0.3s ease all;
`;

const BlogTile = styled.div`
	display: inline;

	/* grid-column-end: 5; */

	& img.blogImage {
		cursor: pointer;
	}

	& img.blogImage:hover p.heading {
		color: var(--brown) !important;
	}

	& {
		width: 27.33%;
		margin: 0.5rem 0.5rem 2rem 0.5rem;
		position: relative;
	}

	&:first-child p.heading:hover,
	&:nth-child(1n + 3) p.heading:hover,
	&:nth-child(2) p.heading:hover,
	&:nth-child(2n) p.heading:hover {
		color: var(--brown);
	}

	@media only screen and (max-width: 1074px) {
		& {
			width: 26.33%;
			margin: 0.5rem;
		}
	}

	@media only screen and (max-width: 913px) {
		& {
			width: 43%;
			margin: 1rem;
		}

		&:nth-child(3n + 1) {
			width: 100%;
			height: 100%;
			margin: auto;
		}
		&:nth-child(3n + 1) {
			padding: 4rem 2rem 2rem 2rem;
		}

		&:nth-child(3n + 1) span {
			display: block !important;
			width: 100%;
			height: 100%;
		}
		&:nth-child(3n + 1) img {
			display: block;
			width: 100% !important;
			height: auto !important;
		}
	}

	@media only screen and (max-width: 600px) {
		& {
			width: 98%;
			margin: 1rem 2rem 1rem 2rem;
		}
		&:nth-child(3n + 1) {
			padding: 1rem 2rem 1rem 2rem;
		}
	}

	${(props) =>
		props.featured &&
		css`
			display: block;
			min-height: 70vh;
			width: 100% !important;
			background-image: url(${props.background}) !important;
			background-size: cover !important;
			-webkit-background-size: cover !important;
			-moz-background-size: cover !important;
			-o-background-size: cover !important;
			background-position: center !important;
			background-repeat: no-repeat !important;
			margin: 8rem 0 !important;
			padding: 4rem 6rem;
			cursor: pointer;

			img,
			span {
				display: none !important;
			}

			p {
				color: #fff;
			}

			& p.heading:hover {
				color: #fff !important;
			}
			@media only screen and (max-width: 600px) {
				margin: 2rem 0 !important;
				padding: 2rem !important;
			}
		`}
`;

export default function BlogGrid(props) {
	const { posts } = props;

	useEffect(() => {
		var sections = gsap.utils.toArray(".fadeinpress");

		sections.forEach((section) => {
			gsap.to(section, {
				autoAlpha: 1,
				scrollTrigger: {
					trigger: section,
					start: "+=0 80%",
					scrub: false,
					markers: false,
					toggleActions: "play reverse play reverse",
				},
			});
		});
	}, []);
	return (
		<BlogGridContainer>
			{posts &&
				posts.map((post, index) => {
					const featured =
						post.blogPost.featured === null
							? false
							: post.blogPost.featured;

					const category = post.categories.nodes[0].name;

					return (
						<BlogTile
							key={index}
							className="fadeinpress"
							featured={featured}
							background={post.featuredImage.node.mediaItemUrl}>
							{featured && (
								<p className="xs-heading uppercase white">
									{category}
								</p>
							)}
							<div
								style={{
									position: "relative",
									width: "100%",
									height: "auto",
								}}>
								<Link
									href={post.uri}
									aria-label={`Read more about ${post.title}`}>
									<img
										src={
											post.featuredImage.node.mediaItemUrl
										}
										width={640}
										height={427}
										style={{
											objectFit: "cover",
											width: "100%",
											height: "auto",
											aspectRatio: "16/9",
										}}
										alt={post.featuredImage.node.altText}
										className="blogImage"
									/>
								</Link>
							</div>
							{!featured && (
								<p className="xs-heading uppercase black">
									{category}
								</p>
							)}
							<Link
								href={post.uri}
								aria-label={`Read more about ${post.title}`}>
								<BlogTitle
									className={`serif ${
										featured
											? "heading white"
											: "press-heading black"
									} black`}
									dangerouslySetInnerHTML={{
										__html: post.title,
									}}></BlogTitle>
							</Link>
						</BlogTile>
					);
				})}
		</BlogGridContainer>
	);
}
