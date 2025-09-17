import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap/dist/gsap";
import { useEffect, useState } from "react";
gsap.registerPlugin(ScrollTrigger);

// Components
import AnchorBar from "../components/AnchorBar";
import BlogGrid from "../components/BlogGrid";
import BookingIframe from "../components/BookingIframe";
import ContactBlock from "../components/ContactBlock";
import ContentBlock from "../components/ContentBlock";
import ExploreMorePosts from "../components/ExploreMorePosts";
import FAQ from "../components/Faq";
import FeaturedStorySlider from "../components/FeaturedStorySlider";
import GettingHere from "../components/GettingHere";
import GiftGrid from "../components/GiftGrid";
import ImageContentRepeater from "../components/ImageContentRepeater";
import ImagesThreeUp from "../components/ImagesThreeUp";
import OffersUpgradesSlider from "../components/OffersUpgradesSlider";
import OffersGridFilters from "../components/OffersGridFilters";
import OffersGrid from "../components/OffersGrid";
import PerksShopFeatureSlider from "../components/PerksShopFeatureSlider";
import PressGrid from "../components/PressGrid";
import RoomsGrid from "../components/RoomsGrid";
import TheLocalWay from "../components/TheLocalWay";
import TitleBar from "../components/TitleBar";
import UpgradesGrid, {
	UpgradesGridPageQuery,
	UpgradesGridPostQuery,
} from "../components/UpgradesGrid";
import AmenitiesSlider from "../components/amenitiesSlider";
import BigImageSmallContent from "../components/bigimageSmallcontent";
import BlurbCenter from "../components/blurbCenter";
import DiscoveriesCallout from "../components/discoveriesCallout";
import EventFeed from "../components/eventFeed";
import FauxSocialFeed from "../components/fauxSocialFeed";
import Form from "../components/forms";
import FullFeatureBlog from "../components/fullFeatureBlog";
import FullWidthMedia from "../components/fullWidthMedia";
import Gallery from "../components/gallery";
import Gatherings from "../components/gatherings";
import Hero from "../components/hero";
import HistoricalSlider from "../components/historicalSlider";
import MediaTwoUp from "../components/mediaTwoUp";
import OurMission from "../components/ourMission";
import RoomSlider from "../components/roomSlider";
import SEO from "../components/seo";
import SpotifyFeature from "../components/spotifyFeature";

export default function DefaultPage(props) {
	const roomAmenities = props?.data?.data?.roomAmenities;
	const seo = props?.data?.data?.page?.seo || props?.data?.data?.post?.seo;
	const sections =
		props?.data?.data?.page?.flexibleContent?.sections ||
		props?.data?.data?.post?.flexibleContent?.sections;

	const title = props?.data?.data?.post?.title || null;
	const categories = props?.data?.data?.post?.categories || null;
	const showMorePosts =
		props?.data?.data?.post?.blogPost?.includeMorePostsSection[0] === "true"
			? true
			: null;

	const postId = props?.data?.data?.post?.postId || null;
	const [morePosts, setMorePosts] = useState([]);

	// console.log(props.data);

	useEffect(() => {
		var tl = gsap.timeline();
		tl.fromTo("header", { opacity: 0 }, { opacity: 1, duration: 0.5 });
		tl.to("main", { opacity: 1, duration: 0.6 });

		var sections = gsap.utils.toArray(".fadein");

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

	const gatherSections = () => {
		const gatheredSections = [];

		for (const [index, section] of sections.entries()) {
			const componentKey = `section-${index}`;

			switch (section.fieldGroupName) {
				case "Page_Flexiblecontent_Sections_AnchorBar":
				case "Post_Flexiblecontent_Sections_AnchorBar":
					gatheredSections.push(
						<AnchorBar
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_ImagesThreeUp":
				case "Post_Flexiblecontent_Sections_ImagesThreeUp":
					gatheredSections.push(
						<ImagesThreeUp
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_ImageContentRepeater":
				case "Post_Flexiblecontent_Sections_ImageContentRepeater":
					gatheredSections.push(
						<ImageContentRepeater
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_ContactBlock":
				case "Post_Flexiblecontent_Sections_ContactBlock":
					gatheredSections.push(
						<ContactBlock
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_EventFeed":
				case "Post_Flexiblecontent_Sections_EventFeed":
					gatheredSections.push(
						<EventFeed
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_Hero":
					gatheredSections.push(
						<Hero key={componentKey} {...section} index={index} />
					);
					break;
				case "Post_Flexiblecontent_Sections_Hero":
					gatheredSections.push(
						<Hero
							key={componentKey}
							postTitle={title}
							{...section}
							categories={categories}
							index={index}
						/>
					);
					break;
				case "Post_Flexiblecontent_Sections_FullWidthMedia":
					gatheredSections.push(
						<FullWidthMedia
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Post_Flexiblecontent_Sections_MediaTwoUp":
					gatheredSections.push(
						<MediaTwoUp
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_HistoricTimeline":
				case "Post_Flexiblecontent_Sections_HistoricTimeline":
					gatheredSections.push(
						<HistoricalSlider
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_CenteredCopy":
				case "Post_Flexiblecontent_Sections_CenteredCopy":
					gatheredSections.push(
						<BlurbCenter
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_RoomsSlider":
				case "Post_Flexiblecontent_Sections_RoomsSlider":
					gatheredSections.push(
						<RoomSlider
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_DiscoveriesCallout":
				case "Post_Flexiblecontent_Sections_DiscoveriesCallout":
					gatheredSections.push(
						<DiscoveriesCallout
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_AmenitiesSlider":
				case "Post_Flexiblecontent_Sections_AmenitiesSlider":
					gatheredSections.push(
						<AmenitiesSlider
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_OurMission":
				case "Post_Flexiblecontent_Sections_OurMission":
					gatheredSections.push(
						<OurMission
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_GatheringsCallout":
				case "Post_Flexiblecontent_Sections_GatheringsCallout":
					gatheredSections.push(
						<Gatherings
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_BookingIframe":
				case "Post_Flexiblecontent_Sections_BookingIframe":
					gatheredSections.push(
						<BookingIframe
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_FeaturedJournal":
				case "Post_Flexiblecontent_Sections_FeaturedJournal":
					gatheredSections.push(
						<FullFeatureBlog
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_FollowAlong":
				case "Post_Flexiblecontent_Sections_FollowAlong":
					gatheredSections.push(
						<FauxSocialFeed
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_SpotifyFeature":
				case "Post_Flexiblecontent_Sections_SpotifyFeature":
					gatheredSections.push(
						<SpotifyFeature
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_BigImageSmallContent":
				case "Post_Flexiblecontent_Sections_BigImageSmallContent":
					gatheredSections.push(
						<BigImageSmallContent
							key={componentKey}
							order={index}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_Form":
				case "Post_Flexiblecontent_Sections_Form":
					gatheredSections.push(
						<Form key={componentKey} {...section} index={index} />
					);
					break;
				case "Page_Flexiblecontent_Sections_FeaturedStorySlider":
				case "Post_Flexiblecontent_Sections_FeaturedStorySlider":
					gatheredSections.push(
						<FeaturedStorySlider
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_Gallery":
				case "Post_Flexiblecontent_Sections_Gallery":
					gatheredSections.push(
						<Gallery
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_Titlebar":
				case "Post_Flexiblecontent_Sections_Titlebar":
					gatheredSections.push(
						<TitleBar
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_BlogGrid":
				case "Post_Flexiblecontent_Sections_BlogGrid":
					gatheredSections.push(
						<BlogGrid
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_PressGrid":
				case "Post_Flexiblecontent_Sections_PressGrid":
					gatheredSections.push(
						<PressGrid
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_OffersGrid":
				case "Post_Flexiblecontent_Sections_OffersGrid":
					gatheredSections.push(
						<OffersGrid
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
        case "Page_Flexiblecontent_Sections_OffersUpgradesSlider":
					gatheredSections.push(
						<OffersUpgradesSlider
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_GettingHere":
				case "Post_Flexiblecontent_Sections_GettingHere":
					gatheredSections.push(
						<GettingHere
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_TheLocalWay":
				case "Post_Flexiblecontent_Sections_TheLocalWay":
					gatheredSections.push(
						<TheLocalWay
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_ContentBlock":
				case "Post_Flexiblecontent_Sections_ContentBlock":
					gatheredSections.push(
						<ContentBlock
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_ExploreMorePosts":
				case "Post_Flexiblecontent_Sections_ExploreMorePosts":
					gatheredSections.push(
						<ExploreMorePosts
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_RoomsGrid":
				case "Post_Flexiblecontent_Sections_RoomsGrid":
					gatheredSections.push(
						<RoomsGrid
							key={componentKey}
							{...section}
							filters={roomAmenities.nodes}
							index={index}
						/>
					);
					break;
        case "Page_Flexiblecontent_Sections_OffersGridFilters":
					gatheredSections.push(
						<OffersGridFilters
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_UpgradesGrid":
				case "Post_Flexiblecontent_Sections_UpgradesGrid":
					gatheredSections.push(
						<UpgradesGrid
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_Faqs":
				case "Post_Flexiblecontent_Sections_Faqs":
					gatheredSections.push(
						<FAQ
							key={componentKey}
							{...section}
							index={index}
							filters={roomAmenities.nodes}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_PerksShopSlider":
				case "Post_Flexiblecontent_Sections_PerksShopSlider":
					gatheredSections.push(
						<PerksShopFeatureSlider
							key={componentKey}
							{...section}
							index={index}
						/>
					);
					break;
				case "Page_Flexiblecontent_Sections_GiftGrid":
				case "Post_Flexiblecontent_Sections_GiftGrid":
					gatheredSections.push(
						<GiftGrid
							key={componentKey}
							{...section}
							index={index}
							filters={roomAmenities.nodes}
						/>
					);
					break;
				default:
					break;
			}
		}
		return gatheredSections;
	};

	async function handleShowMorePosts() {
		if (postId === null || postId === undefined) return;

		const res = await fetch(process.env.WP_GQL_API, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: `
                query GetMorePosts {
                  posts(first:3 where: { notIn: 1820, categoryNotIn: 22 }) {
                    nodes {
                      title
                      uri
                      categories(first:1) {
                        edges {
                          node {
                            name
                          }
                        }
                      }
                      featuredImage {
                        node {
                          altText
                          mediaItemUrl
                        }
                      }
                    }
                  }
                }
            `,
			}),
		});

		const data = await res.json();
		// console.log({ data });

		setMorePosts(data.data.posts.nodes);
	}

	useEffect(() => {
		if (showMorePosts) {
			handleShowMorePosts();
		}
	}, [showMorePosts]);

	return (
		<>
			<SEO
				title={seo.title}
				description={seo.metaDesc}
				fullhead={seo.fullHead}
			/>
			{gatherSections()}
			{showMorePosts && morePosts !== [] ? (
				<ExploreMorePosts posts={morePosts} />
			) : null}
		</>
	);
}

// Get all dynamic [slug]s from the CMS
export async function getStaticPaths() {
	const res = await fetch(process.env.WP_GQL_API, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
                query Pages {
                    pages(first: 999) {
                      nodes {
                        slug
                        uri
                      }
                    }
                    posts(first: 999) {
                      nodes {
                        slug
                        uri
                      }
                    }
                }
            `,
		}),
	});

	const data = await res.json();

	const pages = data.data.pages.nodes.map((page) => ({
		params: { slug: page.slug },
	}));
	const posts = data.data.posts.nodes.map((post) => ({
		params: { slug: post.slug },
	}));

	const paths = [...pages, ...posts];

	return {
		paths,
		fallback: false,
	};
}

// Get relative [slug] data
export async function getStaticProps({ params }) {
	const { slug } = params ? params : { slug: "home" };
	/**
	 * TODO: Breakout fragments into seperate files or consts
	 */

	// Query for Sections and SEO data
	const pageQuery = `
      query AllComponents {
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
            exitPopup {
              bodyCopy
              headline
              image {
                altText
                mediaItemUrl
              }
            }
            socialFooter {
              altText
              mediaItemUrl
            }
          }
        }
        roomAmenities {
          nodes {
            name
          }
        }
        page(id: "${slug}", idType: URI) {
          seo {
            title
            metaDesc
            fullHead
          }
          flexibleContent {
            sections {
              ${UpgradesGridPageQuery}
              ... on Page_Flexiblecontent_Sections_AnchorBar {
                fieldGroupName
                anchorNavigation {
                  icon {
                    altText
                    mediaItemUrl
                  }
                  text
                  anchor
                }
              }
              ... on Page_Flexiblecontent_Sections_GiftGrid {
                fieldGroupName
                giftRepeater {
                  ... on Page_Flexiblecontent_Sections_GiftGrid_giftRepeater {
                    image {
                      altText
                      mediaItemUrl
                    }
                    productName
                    link
                    brand
                    hoverText
                    hoverBlurb
                    hoverColor
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_PerksShopSlider {
                anchor
                fieldGroupName
                features {
                  content
                  ctaLink
                  ctaText
                  subtitle
                  title
                  rightPhoto {
                    altText
                    mediaItemUrl
                  }
                  leftTopPhoto {
                    altText
                    mediaItemUrl
                  }
                  leftBottomPhoto {
                    altText
                    mediaItemUrl
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_ImagesThreeUp {
                fieldGroupName
                anchor
                heading
                paddingOptions
                imageRepeater {
                  ... on Page_Flexiblecontent_Sections_ImagesThreeUp_imageRepeater {
                    image {
                      altText
                      mediaItemUrl
                    }
                    link
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_ImageContentRepeater {
                fieldGroupName
                anchor
                smallHeading
                heading
                paddingOptions
                repeater {
                  ... on Page_Flexiblecontent_Sections_ImageContentRepeater_repeater {
                    image {
                      altText
                      mediaItemUrl
                    }
                    link
                    title
                    subheading
                    content
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_Faqs {
                fieldGroupName
                anhor
                title
                blurb
                faqs {
                  ... on Page_Flexiblecontent_Sections_Faqs_faqs {
                    anchor
                    question
                    answer
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_AmenitiesSlider {
                fieldGroupName
                subHeadline
                headline
                types
                description
                ctaLink
                ctaText
                anchor
                amenities {
                  ... on Amenity {
                    title
                    link
                    amenityContent {
                      sliderLink
                      mobileSliderImage {
                          altText
                          mediaItemUrl
                      }
                    }
                    featuredImage {
                      ... on NodeWithFeaturedImageToMediaItemConnectionEdge {
                        node {
                          ... on MediaItem {
                            altText
                            mediaItemUrl
                          }
                        }
                      }
                    }
                  }
                  ... on Event {
                    title
                    featuredImage {
                      ... on NodeWithFeaturedImageToMediaItemConnectionEdge {
                        node {
                          ... on MediaItem {
                            altText
                            mediaItemUrl
                          }
                        }
                      }
                    }
                  }
                  ... on Room {
                    title
                    featuredImage {
                      ... on NodeWithFeaturedImageToMediaItemConnectionEdge {
                        node {
                          ... on MediaItem {
                            altText
                            mediaItemUrl
                          }
                        }
                      }
                    }
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_BigImageSmallContent {
                fieldGroupName
                contentPosition
                blurb
                subHeadline
                headline
                imageCaption
                isThereACta
                ctaLabel
                ctaLink
                greyBackground
                icon {
                  mediaItemUrl
                  altText
                }
                imagePoster {
                  mediaItemUrl
                  altText
                }
                mediaFullWidth
                mediaType
                mp4OrExternalLink
                webm
                slides {
                  altText
                  mediaItemUrl
                }
                paddingType
                anchorTag
              }
              ... on Page_Flexiblecontent_Sections_FollowAlong {
                fieldGroupName
                backgroundColor
                ctaLink
                ctaText
                headline
                image {
                  altText
                  mediaItemUrl
                }
              }
              ... on Page_Flexiblecontent_Sections_Form {
                fieldGroupName
                blurb
                headline
                subHeadline
                type
                anchorTag
              }
              ... on Page_Flexiblecontent_Sections_Gallery {
                fieldGroupName
                filters {
                  ... on Page_Flexiblecontent_Sections_Gallery_filters {
                    filter
                    iconnav {
                      altText
                      mediaItemUrl
                    }
                    label
                  }
                }
                items {
                  ... on Page_Flexiblecontent_Sections_Gallery_items {
                    type
                    filter
                    image {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_CenteredCopy {
                fieldGroupName
                blurb
                hasBackgroundMedia
                headline
                icon {
                  altText
                  mediaItemUrl
                }
                imagePoster {
                  altText
                  mediaItemUrl
                }
                mp4ExternalLink
                webm
                greyBackground
                isBlogSummary
              }
              ... on Page_Flexiblecontent_Sections_DiscoveriesCallout {
                fieldGroupName
                blurb
                caption
                ctaLink
                ctaText
                icon {
                  altText
                  mediaItemUrl
                }
                typeLeft
                typeRight
                imagePosterLeft {
                  altText
                  mediaItemUrl
                }
                imagePosterRight {
                  altText
                  mediaItemUrl
                }
                mp4Left
                webmLeft
                mp4Right
                webmRight
                title
              }
              ... on Page_Flexiblecontent_Sections_EventSlider {
                fieldGroupName
                blurb
                ctaLink
                ctaText
                headline
                subHeadline
                events {
                  ... on Page_Flexiblecontent_Sections_EventSlider_events {
                    eventType
                    eventImage {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_FeaturedJournal {
                fieldGroupName
                subHeadline
                headline
                blurb
                ctaText
                ctaLink
                featuredJournal {
                  ... on Post {
                    featuredImage {
                      ... on NodeWithFeaturedImageToMediaItemConnectionEdge {
                        node {
                          altText
                          mediaItemUrl
                        }
                      }
                    }
                    title
                    uri
                    slug
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_FeaturedStorySlider {
                fieldGroupName
                ctaLink
                ctaText
                headline
                subHeadline
                featuredStories {
                  ... on Post {
                    blogPost {
                      gallery {
                        ... on MediaItem {
                          altText
                          mediaItemUrl
                        }
                      }
                    }
                    title
                    uri
                    featuredImage {
                      node {
                        mediaItemUrl
                        altText
                      }
                    }
                    flexibleContent {
                      ... on Post_Flexiblecontent {
                        sections {
                          ... on Post_Flexiblecontent_Sections_Hero {
                            imagePoster {
                              mediaItemUrl
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_FollowAlong {
                fieldGroupName
                backgroundColor
                ctaLink
                ctaText
                headline
                image {
                  altText
                  mediaItemUrl
                }
              }
              ... on Page_Flexiblecontent_Sections_Form {
                fieldGroupName
                blurb
                headline
                subHeadline
                type
              }
              ... on Page_Flexiblecontent_Sections_Gallery {
                fieldGroupName
                filters {
                  ... on Page_Flexiblecontent_Sections_Gallery_filters {
                    filter
                    iconnav {
                      altText
                      mediaItemUrl
                    }
                    label
                  }
                }
                items {
                  ... on Page_Flexiblecontent_Sections_Gallery_items {
                    type
                    filter
                    image {
                      altText
                      mediaItemUrl
                    }
                    mp4ExternalLink
                    webm
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_GatheringsCallout {
                fieldGroupName
                ctaLink
                ctaText
                headline
                subHeadline
                blurb
                type
                anchorTag
                events {
                  link
                  title
                  date
                }
                media {
                  ... on Page_Flexiblecontent_Sections_GatheringsCallout_media {
                    imagePoster {
                      altText
                      sourceUrl
                      caption
                    }
                    mp4
                    type
                    webm
                    ctaText
                    ctaLink
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_FullWidthMedia {
                fieldGroupName
                types
                iframeembed
                imageCaption
                videoCaption
                mpfour
                fullImage {
                  mediaItemUrl
                  altText
                }
                sliderImages {
                  ... on Page_Flexiblecontent_Sections_FullWidthMedia_sliderImages {
                    image {
                      mediaItemUrl
                      altText
                    }
                    imageCaption
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_Hero {
                fieldGroupName
                blurb
                headline
                subheading
                copy
                pressLink
                publicationTitle
                pressLogo {
                  mediaItemUrl
                  altText
                }
                includeLogo
                includeBookingForm
                includeBookMultipleRoomsLink
                includeFeaturedRoomCta
                featuredRoomCtaLink
                featuredRoomCtaText
                mp4ExternalLink
                types
                textPosition
                webm
                imagePoster {
                  mediaItemUrl
                  altText
                }
                mobileImage {
                  mediaItemUrl
                  altText
                }
                subnavigation {
                  ... on Page_Flexiblecontent_Sections_Hero_subnavigation {
                    link
                    label
                    iconnav {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_HistoricTimeline {
                fieldGroupName
                years {
                  ... on Page_Flexiblecontent_Sections_HistoricTimeline_years {
                    year
                    caption
                    image {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_OurMission {
                fieldGroupName
                logo {
                  altText
                  mediaItemUrl
                }
                headline
                animatableTexts {
                  title
                }
              }
              ... on Page_Flexiblecontent_Sections_RoomsSlider {
                fieldGroupName
                rooms {
                  ... on Room {
                    singleRooms {
                      roomshero {
                        mediaItemUrl
                        altText
                      }
                      slug
                    }
                    featuredImage {
                      node {
                        altText
                        mediaItemUrl
                      }
                    }
                    title
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_RoomsGrid {
                fieldGroupName
                roomsGridFilter {
                  ... on Category {
                    name
                  }
                }
                roomsgrid {
                  ... on Room {
                    roomAmenities {
                      nodes {
                        name
                      }
                    }
                    singleRooms {
                      amenities
                      includeVideoOnFindYourRoomTile
                      featuredVideoUrl
                      featuredVideoPoster {
                        mediaItemUrl
                      }
                      features {
                        label
                      }
                    }
                    title
                    slug
                    featuredImage {
                      node {
                        altText
                        mediaItemUrl
                      }
                    }
                    singleRooms {
                      sleeps
                      keyFeature
                      mewsRoomId
                      theme
                      description
                    }
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_SpotifyFeature {
                fieldGroupName
                headline
                ctaLink
                ctaText
                spotifyEmbed
              }
              ... on Page_Flexiblecontent_Sections_BookingIframe {
                fieldGroupName
                headline
                blurb
                embed
              }
              ... on Page_Flexiblecontent_Sections_Titlebar {
                fieldGroupName
                title
                showIcons
                anchor
                icon {
                  mediaItemUrl
                  altText
                }
              }
              ... on Page_Flexiblecontent_Sections_PressGrid {
                fieldGroupName
                posts {
                  ... on Post {
                    featuredImage {
                      node {
                        mediaItemUrl
                        altText
                      }
                    }
                    singlePress {
                      externalLink
                      publicationName
                    }
                    link
                    title
                  }  
                }
              }
              ... on Page_Flexiblecontent_Sections_OffersUpgradesSlider {
                fieldGroupName
                heading
                sliderType
                backgroundOptions
                paddingOptions
                backgroundImage {
                  mediaItemUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
                offersUpgrades {
                  ... on Offer {
                    featuredImage {
                      node {
                        mediaItemUrl
                        altText
                        mediaDetails {
                          width
                          height
                        }
                      }
                    }
                    singleOffers {
                      bookingLink
                      highlights
                      offerImage {
                        mediaItemUrl
                        altText
                      }
                      offerDescription
                      offerTermsConditions
                    }
                    slug
                    link
                    title
                  }
                  ... on Upgrade {
                    featuredImage {
                      node {
                        mediaItemUrl
                        altText
                        mediaDetails {
                          width
                          height
                        }
                      }
                    }
                    Upgrades {
                      description
                      externalLink
                    }
                    slug
                    title
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_OffersGridFilters {
                fieldGroupName
                heading
                howToBook
                filters {
                  ... on Page_Flexiblecontent_Sections_OffersGridFilters_filters {
                    label
                    class
                  }
                }
                offers {
                  ... on Offer {
                    featuredImage {
                      node {
                        mediaItemUrl
                        altText
                        mediaDetails {
                          width
                          height
                        }
                      }
                    }
                    singleOffers {
                      bookingLink
                      highlights
                      offerImage {
                        mediaItemUrl
                        altText
                      }
                      offerDescription
                      offerTermsConditions
                    }
                    slug
                    link
                    title
                  }
                  ... on Upgrade {
                    featuredImage {
                      node {
                        mediaItemUrl
                        altText
                        mediaDetails {
                          width
                          height
                        }
                      }
                    }
                    Upgrades {
                      description
                      externalLink
                    }
                    slug
                    title
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_OffersGrid {
                fieldGroupName
                heading
                offers {
                  ... on Offer {
                    featuredImage {
                      node {
                        mediaItemUrl
                        altText
                      }
                    }
                    singleOffers {
                      bookingLink
                      highlights
                      offerImage {
                        mediaItemUrl
                        altText
                      }
                      offerDescription
                      offerTermsConditions
                    }
                    slug
                    link
                    title
                  }  
                }
              }
              ... on Page_Flexiblecontent_Sections_BlogGrid {
                fieldGroupName
                posts {
                  ... on Post {
                    categories(first:13) {
                      nodes {
                        ... on Category {
                          link
                          name
                        }
                      }
                    }
                    featuredImage {
                      node {
                        mediaItemUrl
                        altText
                      }
                    }
                    slug
                    title
                    uri
                    blogPost {
                      featured
                    }
                  }  
                }
              }
              ... on Page_Flexiblecontent_Sections_GettingHere {
                fieldGroupName
                title
                blurb
                gettinghereimage {
                  altText
                  mediaItemUrl
                }
                gettinghereimagemobile {
                  altText
                  mediaItemUrl
                }
              }
              ... on Page_Flexiblecontent_Sections_TheLocalWay {
                fieldGroupName
                title
                iframe
                columns {
                  ... on Page_Flexiblecontent_Sections_TheLocalWay_columns {
                    sections {
                      ... on Page_Flexiblecontent_Sections_TheLocalWay_columns_sections {
                        title
                        list
                        locations {
                          ... on Page_Flexiblecontent_Sections_TheLocalWay_columns_sections_locations {
                            name
                            address
                            lat
                            long
                          }
                        }
                      }
                    }
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_EventFeed {
                fieldGroupName
                fullWidget
                events {
                  ... on Event {
                    title
                    featuredImage {
                      node {
                        altText
                        mediaItemUrl
                      }
                    }
                    categories (first: 1) {
                      ... on EventToCategoryConnection {
                        nodes {
                          name
                        }
                      }
                    }
                    singleEvent {
                      addToAppleCalendarLink
                      addToGoogleCalendarLink
                      date
                      rsvpLink
                      rsvpText
                      time
                      address
                      description
                      locationName
                    }
                  }
                }
              }
              ... on Page_Flexiblecontent_Sections_ContentBlock {
                fieldGroupName
                content
              }
              ... on Page_Flexiblecontent_Sections_ContactBlock {
                fieldGroupName
                reservationsBlurb
                eventsBlurb
                mediaBlurb
                developmentBlurb
                backgroundImage {
                  mediaItemUrl
                  altText
                }
              }
              ... on Page_Flexiblecontent_Sections_ExploreMorePosts {
                fieldGroupName
                anchor
                title
                posts {
                  ... on Post {
                    categories(first: 1) {
                      nodes {
                        slug
                        name
                        uri
                      }
                    }
                    title
                    uri
                    featuredImage {
                      node {
                        mediaItemUrl
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
        post(id: "${slug}", idType: SLUG) {
          postId
          seo {
            title
            metaDesc
            fullHead
          }
          title
          categories(first: 1) {
            nodes {
              name
            }
          }
          next {
            categories(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
            title
            featuredImage {
              node {
                altText
                mediaItemUrl
              }
            }
            uri
          }
          previous {
            categories(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
            title
            featuredImage {
              node {
                altText
                mediaItemUrl
              }
            }
            uri
          }
          blogPost {
            includeMorePostsSection
          }
          flexibleContent {
            sections {
              ${UpgradesGridPostQuery}
              ... on Post_Flexiblecontent_Sections_GiftGrid {
                fieldGroupName
                giftRepeater {
                  ... on Post_Flexiblecontent_Sections_GiftGrid_giftRepeater {
                    image {
                      altText
                      mediaItemUrl
                    }
                    productName
                    link
                    brand
                    hoverText
                    hoverBlurb
                    hoverColor
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_AnchorBar {
                fieldGroupName
                anchorNavigation {
                  icon {
                    altText
                    mediaItemUrl
                  }
                  text
                  anchor
                }
              }
              ... on Post_Flexiblecontent_Sections_AmenitiesSlider {
                fieldGroupName
                subHeadline
                headline
                description
                types
                ctaLink
                ctaText
                anchor
                amenities {
                  ... on Amenity {
                    title
                    link
                    amenityContent {
                      mobileSliderImage {
                          altText
                          mediaItemUrl
                      }
                      sliderLink
                    }
                    featuredImage {
                      ... on NodeWithFeaturedImageToMediaItemConnectionEdge {
                        node {
                          ... on MediaItem {
                            altText
                            mediaItemUrl
                          }
                        }
                      }
                    }
                  }
                  ... on Event {
                    title
                    featuredImage {
                      ... on NodeWithFeaturedImageToMediaItemConnectionEdge {
                        node {
                          ... on MediaItem {
                            altText
                            mediaItemUrl
                          }
                        }
                      }
                    }
                  }
                  ... on Room {
                    title
                    featuredImage {
                      ... on NodeWithFeaturedImageToMediaItemConnectionEdge {
                        node {
                          ... on MediaItem {
                            altText
                            mediaItemUrl
                          }
                        }
                      }
                    }
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_BigImageSmallContent {
                fieldGroupName
                contentPosition
                blurb
                subHeadline
                imageCaption
                headline
                isThereACta
                ctaLabel
                ctaLink
                greyBackground
                icon {
                  mediaItemUrl
                  altText
                }
                imagePoster {
                  mediaItemUrl
                  altText
                }
                mediaFullWidth
                mediaType
                mp4OrExternalLink
                webm
                slides {
                  altText
                  mediaItemUrl
                }
                paddingType
                anchorTag
              }
              ... on Post_Flexiblecontent_Sections_FollowAlong {
                fieldGroupName
                backgroundColor
                ctaLink
                ctaText
                headline
                image {
                  altText
                  mediaItemUrl
                }
              }
              ... on Post_Flexiblecontent_Sections_Form {
                fieldGroupName
                blurb
                headline
                subHeadline
                type
                anchorTag
              }
              ... on Post_Flexiblecontent_Sections_Gallery {
                fieldGroupName
                filters {
                  ... on Post_Flexiblecontent_Sections_Gallery_filters {
                    filter
                    iconnav {
                      altText
                      mediaItemUrl
                    }
                    label
                  }
                }
                items {
                  ... on Post_Flexiblecontent_Sections_Gallery_items {
                    type
                    filter
                    image {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_CenteredCopy {
                fieldGroupName
                blurb
                hasBackgroundMedia
                headline
                icon {
                  altText
                  mediaItemUrl
                }
                imagePoster {
                  altText
                  mediaItemUrl
                }
                mp4ExternalLink
                webm
                greyBackground
                isBlogSummary
              }
              ... on Post_Flexiblecontent_Sections_DiscoveriesCallout {
                fieldGroupName
                blurb
                ctaLink
                ctaText
                icon {
                  altText
                  mediaItemUrl
                }
                typeLeft
                typeRight
                imagePosterLeft {
                  altText
                  mediaItemUrl
                }
                imagePosterRight {
                  altText
                  mediaItemUrl
                }
                mp4Left
                webmLeft
                mp4Right
                webmRight
                title
              }
              ... on Post_Flexiblecontent_Sections_EventSlider {
                fieldGroupName
                blurb
                ctaLink
                ctaText
                headline
                subHeadline
                events {
                  ... on Post_Flexiblecontent_Sections_EventSlider_events {
                    eventType
                    eventImage {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_FeaturedJournal {
                fieldGroupName
                subHeadline
                headline
                blurb
                ctaText
                ctaLink
                featuredJournal {
                  ... on Post {
                    featuredImage {
                      ... on NodeWithFeaturedImageToMediaItemConnectionEdge {
                        node {
                          altText
                          mediaItemUrl
                        }
                      }
                    }
                    title
                    uri
                    slug
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_FeaturedStorySlider {
                fieldGroupName
                ctaLink
                ctaText
                headline
                subHeadline
                featuredStories {
                  ... on Post {
                    blogPost {
                      gallery {
                        ... on MediaItem {
                          altText
                          mediaItemUrl
                        }
                      }
                    }
                    title
                    uri
                    featuredImage {
                      node {
                        mediaItemUrl
                        altText
                      }
                    }
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_FollowAlong {
                fieldGroupName
                backgroundColor
                ctaLink
                ctaText
                headline
                image {
                  altText
                  mediaItemUrl
                }
              }
              ... on Post_Flexiblecontent_Sections_Form {
                fieldGroupName
                blurb
                headline
                subHeadline
                type
              }
              ... on Post_Flexiblecontent_Sections_Gallery {
                fieldGroupName
                filters {
                  ... on Post_Flexiblecontent_Sections_Gallery_filters {
                    filter
                    iconnav {
                      altText
                      mediaItemUrl
                    }
                    label
                  }
                }
                items {
                  ... on Post_Flexiblecontent_Sections_Gallery_items {
                    type
                    filter
                    image {
                      altText
                      mediaItemUrl
                    }
                    mp4ExternalLink
                    webm
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_GatheringsCallout {
                fieldGroupName
                ctaLink
                ctaText
                headline
                subHeadline
                blurb
                type
                anchorTag
                events {
                  link
                  title
                  date
                }
                media {
                  ... on Post_Flexiblecontent_Sections_GatheringsCallout_media {
                    imagePoster {
                      altText
                      sourceUrl
                    }
                    mp4
                    type
                    webm
                    ctaText
                    ctaLink
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_MediaTwoUp {
                fieldGroupName
                layout
                paddingType
                anchorTag
                leftMediaType
                imagePosterLeft {
                  mediaItemUrl
                  altText
                }
                videoLeft
                captionLeft
                rightMediaType
                imagePosterRight {
                  mediaItemUrl
                  altText
                }
                videoRight
                captionRight
              }
              ... on Post_Flexiblecontent_Sections_FullWidthMedia {
                fieldGroupName
                types
                iframeembed
                imageCaption
                videoCaption
                mpfour
                fullImage {
                  mediaItemUrl
                  altText
                }
                sliderImages {
                  ... on Post_Flexiblecontent_Sections_FullWidthMedia_sliderImages {
                  image {
                    mediaItemUrl
                    altText
                  }
                  imageCaption
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_Hero {
                fieldGroupName
                blurb
                headline
                subheading
                copy
                pressLink
                publicationTitle
                pressLogo {
                  mediaItemUrl
                  altText
                }
                includeBookingForm
                includeBookMultipleRoomsLink
                includeFeaturedRoomCta
                featuredRoomCtaLink
                featuredRoomCtaText
                mp4ExternalLink
                types
                textPosition
                webm
                imagePoster {
                  mediaItemUrl
                  altText
                }
                mobileImage {
                  mediaItemUrl
                  altText
                }
                datePublished
                subnavigation {
                  ... on Post_Flexiblecontent_Sections_Hero_subnavigation {
                    link
                    label
                    iconnav {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_HistoricTimeline {
                fieldGroupName
                years {
                  ... on Post_Flexiblecontent_Sections_HistoricTimeline_years {
                    year
                    caption
                    image {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_OurMission {
                fieldGroupName
                logo {
                  altText
                  mediaItemUrl
                }
                headline
                animatableTexts {
                  title
                }
              }
              ... on Post_Flexiblecontent_Sections_RoomsSlider {
                fieldGroupName
                rooms {
                  ... on Room {
                    singleRooms {
                      roomshero {
                        mediaItemUrl
                        altText
                      }
                      slug
                    }
                    featuredImage {
                      node {
                        altText
                        mediaItemUrl
                      }
                    }
                    title
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_RoomsGrid {
                fieldGroupName
                roomsGridFilter {
                  ... on Category {
                    name
                  }
                }
                roomsgrid {
                  ... on Room {
                    roomAmenities {
                      nodes {
                        name
                      }
                    }
                    singleRooms {
                      amenities
                      includeVideoOnFindYourRoomTile
                      featuredVideoUrl
                      featuredVideoPoster {
                        mediaItemUrl
                      }
                      features {
                        label
                      }
                    }
                    title
                    slug
                    featuredImage {
                      node {
                        altText
                        mediaItemUrl
                      }
                    }
                    singleRooms {
                      sleeps
                      mewsRoomId
                      keyFeature
                      theme
                      description
                    }
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_SpotifyFeature {
                fieldGroupName
                headline
                ctaLink
                ctaText
                spotifyEmbed
              }
              ... on Post_Flexiblecontent_Sections_BookingIframe {
                fieldGroupName
                headline
                blurb
                embed
              }
              ... on Post_Flexiblecontent_Sections_Titlebar {
                fieldGroupName
                title
                showIcons
                anchor
                icon {
                  mediaItemUrl
                  altText
                }
              }
              ... on Post_Flexiblecontent_Sections_PressGrid {
                fieldGroupName
                posts {
                  ... on Post {
                    featuredImage {
                      node {
                        mediaItemUrl
                        altText
                      }
                    }
                    singlePress {
                      externalLink
                      publicationName
                    }
                    link
                    title
                  }  
                }
              }
              ... on Post_Flexiblecontent_Sections_OffersGrid {
                fieldGroupName
                heading
                offers {
                  ... on Offer {
                    featuredImage {
                      node {
                        mediaItemUrl
                        altText
                      }
                    }
                    singleOffers {
                      highlights
                      bookingLink
                      offerImage {
                        mediaItemUrl
                        altText
                      }
                      offerDescription
                      offerTermsConditions
                    }
                    slug
                    link
                    title
                  }  
                }
              }
              ... on Post_Flexiblecontent_Sections_BlogGrid {
                fieldGroupName
                posts {
                  ... on Post {
                    categories(first:13) {
                      nodes {
                        ... on Category {
                          link
                          name
                        }
                      }
                    }
                    featuredImage {
                      node {
                        mediaItemUrl
                        altText
                      }
                    }
                    link
                    slug
                    uri
                    title
                    blogPost {
                      featured
                    }
                  }  
                }
              }
              ... on Post_Flexiblecontent_Sections_GettingHere {
                fieldGroupName
                title
                blurb
                gettinghereimage {
                  altText
                  mediaItemUrl
                }
                gettinghereimagemobile {
                  altText
                  mediaItemUrl
                }
              }
              ... on Post_Flexiblecontent_Sections_TheLocalWay {
                fieldGroupName
                title
                iframe
                columns {
                  ... on Post_Flexiblecontent_Sections_TheLocalWay_columns {
                    sections {
                      ... on Post_Flexiblecontent_Sections_TheLocalWay_columns_sections {
                        title
                        list
                        locations {
                          ... on Post_Flexiblecontent_Sections_TheLocalWay_columns_sections_locations {
                            name
                            address
                            lat
                            long
                          }
                        }
                      }
                    }
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_EventFeed {
                fieldGroupName
                fullWidget
                events {
                  ... on Event {
                    title
                    featuredImage {
                      node {
                        altText
                        mediaItemUrl
                      }
                    }
                    categories (first: 1) {
                      ... on EventToCategoryConnection {
                        nodes {
                          name
                        }
                      }
                    }
                    singleEvent {
                      addToAppleCalendarLink
                      addToGoogleCalendarLink
                      date
                      rsvpLink
                      rsvpText
                      time
                      address
                      description
                      locationName
                    }
                  }
                }
              }
              ... on Post_Flexiblecontent_Sections_ContentBlock {
                fieldGroupName
                content
                anchor
              }
              ... on Post_Flexiblecontent_Sections_ContactBlock {
                fieldGroupName
                reservationsBlurb
                eventsBlurb
                mediaBlurb
                developmentBlurb
                backgroundImage {
                  mediaItemUrl
                  altText
                }
              }
              ... on Post_Flexiblecontent_Sections_ExploreMorePosts {
                fieldGroupName
                anchor
                title
                posts {
                  ... on Post {
                    categories(first: 1) {
                      nodes {
                        slug
                        name
                        uri
                      }
                    }
                    title
                    uri
                    featuredImage {
                      node {
                        mediaItemUrl
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`;

	// Get page sections and SEO data
	const res = await fetch(process.env.WP_GQL_API, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ query: pageQuery }),
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
}
