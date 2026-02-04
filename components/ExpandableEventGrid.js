import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const GridSection = styled.section`
	padding: 4rem 24px 5rem;
	background-color: #ffffff;

	@media (max-width: 768px) {
		padding: 32px 16px 48px;
	}
`;

const SectionTitle = styled.h2`
	font-family: "GT Walsheim Regular";
	letter-spacing: 2.5px;
	text-transform: uppercase;
	text-align: center;
	color: #1a1a1a;
	margin-bottom: 40px;

	@media (max-width: 768px) {
		margin-bottom: 32px;
	}
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 40px 24px;
	max-width: 1100px;
	margin: 0 auto;

	@media (max-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
		gap: 32px 20px;
	}

	@media (max-width: 600px) {
		grid-template-columns: 1fr;
		gap: 32px;
	}
`;

const EventCard = styled.article`
	display: flex;
	flex-direction: column;
	opacity: ${(props) => (props.$isVisible ? 1 : 0)};
	transform: translateY(${(props) => (props.$isVisible ? "0" : "20px")});
	transition:
		opacity 0.4s ease,
		transform 0.4s ease;
	transition-delay: ${(props) => props.$delay}ms;
`;

const ImageContainer = styled.div`
	position: relative;
	width: 100%;
	aspect-ratio: 4 / 3;
	overflow: hidden;
	background-color: #f5f5f5;
	margin-bottom: 12px;
`;

const EventImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
	transition: transform 0.3s ease;

	${EventCard}:hover & {
		transform: scale(1.03);
	}
`;

const TagBadge = styled.span`
	padding: 6px 12px;
	font-size: 11px;
	font-weight: 500;
	border-radius: 20px;
	background-color: ${(props) =>
		props.$variant === "hosted" ? "transparent" : "rgba(0, 0, 0, 0.75)"};
	border: ${(props) =>
		props.$variant === "hosted" ? "1px solid rgba(0, 0, 0, 0.8)" : "none"};
	color: rgba(0, 0, 0, 0.8);
	width: fit-content;
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const EventTitle = styled.h3`
	/* font-size: 22px; */
	font-weight: 400;
	line-height: 1.3;
	color: #1a1a1a;
	margin: 4px 0;
`;

const EventMeta = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	color: #000;
	font-family: "GT Walsheim Light";
`;

const CalendarIcon = styled.span`
	display: inline-flex;
	align-items: center;
	color: #8c361e;

	svg {
		width: 14px;
		height: 14px;
	}
`;

const CTAButton = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 12px 24px;
	background-color: #8c361e;
	color: #ffffff;
	font-size: 12px;
	font-weight: 600;
	letter-spacing: 1.5px;
	text-transform: uppercase;
	text-decoration: none;
	border: none;
	cursor: pointer;
	transition:
		background-color 0.3s ease,
		transform 0.2s ease;
	width: fit-content;
	margin-top: 8px;

	&:hover {
		background-color: #a04023;
		transform: translateY(-2px);
	}

	&:focus {
		outline: 2px solid #8c361e;
		outline-offset: 3px;
	}

	&:active {
		transform: translateY(0);
	}
`;

const LoadMoreContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 48px;
`;

const LoadMoreButton = styled.button`
	padding: 14px 32px;
	background-color: transparent;
	color: #8c361e;
	font-size: 12px;
	font-weight: 600;
	letter-spacing: 1.5px;
	text-transform: uppercase;
	border: 1px solid #8c361e;
	cursor: pointer;
	transition:
		background-color 0.3s ease,
		color 0.3s ease,
		transform 0.2s ease;

	&:hover {
		background-color: #8c361e;
		color: #ffffff;
		transform: translateY(-2px);
	}

	&:focus {
		outline: 2px solid #8c361e;
		outline-offset: 3px;
	}

	&:active {
		transform: translateY(0);
	}
`;

const VisuallyHidden = styled.span`
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
`;

const LiveRegion = styled.div`
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
`;

// Calendar Icon Component
const CalendarIconSVG = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="14"
		height="14"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true">
		<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
		<line x1="16" y1="2" x2="16" y2="6"></line>
		<line x1="8" y1="2" x2="8" y2="6"></line>
		<line x1="3" y1="10" x2="21" y2="10"></line>
	</svg>
);

export const ExpandableEventGridQuery = `
    ... on Page_Flexiblecontent_Sections_ExpandableEventGrid {
          anchor
          fieldGroupName
          title
          events {
            ... on Event {
              id
              featuredImage {
                node {
                  altText
                  mediaItemUrl
                }
              }
              title(format: RENDERED)
              singleEvent {
                date
                time
                rsvpLink
                rsvpText
                hostedByLabel
              }
            }
          }
        }
`;

const ExpandableEventGrid = ({
	events = [],
	title = "Discover All Events",
	initialCount = 6,
	loadMoreText = "Load More",
}) => {
	const [visibleCount, setVisibleCount] = useState(initialCount);
	const [announcement, setAnnouncement] = useState("");
	const [newItemsVisible, setNewItemsVisible] = useState(true);
	const firstNewItemRef = useRef(null);
	const previousVisibleCount = useRef(initialCount);

	const hasMoreEvents = visibleCount < events.length;
	const visibleEvents = events.slice(0, visibleCount);
	const remainingCount = events.length - visibleCount;

	const handleLoadMore = () => {
		const newCount = Math.min(visibleCount + 6, events.length);
		const loadedCount = newCount - visibleCount;

		setNewItemsVisible(false);
		previousVisibleCount.current = visibleCount;
		setVisibleCount(newCount);

		// Trigger animation after state update
		setTimeout(() => {
			setNewItemsVisible(true);
		}, 50);

		// Announce to screen readers
		setAnnouncement(
			`Loaded ${loadedCount} more events. Showing ${newCount} of ${events.length} events.`,
		);
	};

	// Focus management for newly loaded items
	useEffect(() => {
		if (visibleCount > initialCount && firstNewItemRef.current) {
			// Small delay to allow animation to start
			setTimeout(() => {
				firstNewItemRef.current?.focus();
			}, 100);
		}
	}, [visibleCount, initialCount]);

	if (!events || events.length === 0) {
		return null;
	}

	return (
		<GridSection aria-labelledby="events-grid-title">
			<SectionTitle id="events-grid-title" className="body-copy xs-copy">
				{title}
			</SectionTitle>

			<GridContainer role="list">
				{visibleEvents.map((event, index) => {
					const isNewItem = index >= previousVisibleCount.current;
					const isFirstNewItem =
						index === previousVisibleCount.current &&
						visibleCount > initialCount;

					return (
						<EventCard
							key={event.id || index}
							role="listitem"
							$isVisible={isNewItem ? newItemsVisible : true}
							$delay={
								isNewItem
									? (index - previousVisibleCount.current) *
										100
									: 0
							}
							ref={isFirstNewItem ? firstNewItemRef : null}
							tabIndex={isFirstNewItem ? -1 : undefined}>
							<ImageContainer>
								{event.featuredImage && (
									<EventImage
										src={
											event.featuredImage.node
												.mediaItemUrl
										}
										alt={
											event.featuredImage.node.altText ||
											`${event.title}`
										}
										loading={index < 6 ? "eager" : "lazy"}
									/>
								)}
							</ImageContainer>

							<ContentContainer>
								{event.singleEvent.hostedByLabel && (
									<TagBadge
										$variant={
											event.singleEvent.hostedByLabel.includes(
												"Orli",
											)
												? "hosted"
												: "default"
										}>
										{event.singleEvent.hostedByLabel}
									</TagBadge>
								)}
								<EventTitle className="serif med-heading">
									{event.title}
								</EventTitle>

								<EventMeta>
									<CalendarIcon>
										<CalendarIconSVG />
									</CalendarIcon>
									<time
										dateTime={
											event.singleEvent.dateTime ||
											event.singleEvent.date
										}>
										{event.singleEvent.date}
									</time>
									{event.singleEvent.time && (
										<>
											<span aria-hidden="true">|</span>
											<span>
												{event.singleEvent.time}
											</span>
										</>
									)}
								</EventMeta>

								{event.singleEvent.rsvpLink && (
									<CTAButton
										href={event.singleEvent.rsvpLink}
										aria-label={`Learn More about ${event.title}`}>
										Learn More
									</CTAButton>
								)}
							</ContentContainer>
						</EventCard>
					);
				})}
			</GridContainer>

			{hasMoreEvents && (
				<LoadMoreContainer>
					<LoadMoreButton
						onClick={handleLoadMore}
						aria-label={`${loadMoreText}. ${remainingCount} more events available.`}
						type="button">
						{loadMoreText}
					</LoadMoreButton>
				</LoadMoreContainer>
			)}

			{/* Live region for screen reader announcements */}
			<LiveRegion role="status" aria-live="polite" aria-atomic="true">
				{announcement}
			</LiveRegion>
		</GridSection>
	);
};

export default ExpandableEventGrid;
