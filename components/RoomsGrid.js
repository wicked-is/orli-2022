import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styled, { css } from "styled-components";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import styles from "../styles/roomsGrid.module.css";
import BookingForm from "../components/bookingForm";

const filterList = [
    "Outdoor Spaces",
    "Workstation",
    "Seating Area",
    "Kitchenette",
    "Ocean View",
    "Historic",
    "ADA Accessible",
];

const FilterContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    align-items: center;
    padding: 2rem 10% 1rem 10%;
    margin-inline: auto;
    width: 100%;
    background-color: var(--lt-grey);
    z-index: 97;

    /* @media screen and (max-width: 820px) {
        & {display: none;}
    } */
`;
const QuickViewContainer = styled.dialog`
    width: 100%;
    height: 100%;
    border: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 9999999999;
    display: grid;
    place-items: center;
`;
const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 80%;
    height: 70vh;
    margin: 15vh auto;
    > div:first-child {
        background-size: cover;
    }
    > div:last-child {
        background-color: var(--lt-grey);
        display: flex;
        flex-direction: column;
    }

    @media screen and (max-width: 768px) {
        margin: 5vh auto;
        grid-template-columns: 1fr;

        > div:first-child {
            min-height: 20vh;
        }

        > div:last-child {
            padding: 3rem 0 0;
        }
    }
`;
const LeftHalf = styled.div`
    @media screen and (max-width: 768px) {
        padding-top: 3rem;
    }
`;
const FilterLabel = styled.label``;

const QuickViewButton = styled.div`
    position: absolute;
    bottom: -100%;

    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: auto;
    padding: 1rem 1rem;

    text-align: center;
    color: #fff;
    text-decoration: underline;
    background-color: rgba(0, 0, 0, 0.3);

    transition: all 0.3s ease-in-out;
`;
const RoomTile = styled.a`
    &:hover .quickview-btn {
        bottom: 0;
    }
`;
const VideoContainer = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: auto;
    display: inline-block;
    height: auto;
    min-width: 100%;
    min-height: 100%;
    filter: brightness(0.5);

    @media screen and (max-width: 600px) {
        display: none;
        pointer-events: none;
    }
`;
const TileMedia = styled.div`
    background-image: ${props => props.bg && `url(${props.bg})`};
    position: relative;
    overflow: hidden;
    @media screen and (max-width: 600px) {
        background-image: ${props => props.bg && `url(${props.bg})`};
        position: relative;
        overflow: hidden;
    }
`;
export default function RoomsGrid(props) {
    const [filters, setFilters] = useState(props.filters);
    // const [filters, setFilters] = useState(filterList);
    const [currentRooms, setCurrentRooms] = useState(props.roomsgrid);
    const [dialogContent, setDialogContent] = useState({
        sleeps: "",
        title: "",
        description: "",
        image: "",
        slug: "",
    });

    const [modalStatus, setModalStatus] = useState(false);

    const newFilters = [];

    const { roomsgrid } = props;

    useEffect(() => {
        let isMobileDevice = window.matchMedia(
            "screen and (max-width: 768px)"
        ).matches;

        if (!isMobileDevice) {
            const quickview = document.querySelector(".quickview-btn");
            const modal = document.querySelector("dialog");
            const closeButton = document.querySelector("#closeBtn");

            document.querySelectorAll(".quickview-btn").forEach(room => {
                room.addEventListener("click", handleClick);
            });

            closeButton.addEventListener("click", () => {
                document.querySelector("#roomdialog").close();
            });

            document.querySelector("input").blur();
            document.querySelector("dialog").close();
        }

        document.querySelectorAll("label.rooms-filter").forEach(label => {
            label.addEventListener("click", handleFilterClick);
            label.addEventListener("touchend", handleFilterClick);
        });

        const maincontent = gsap.utils.toArray("main");
        const filterContainerTBA = gsap.utils.toArray(
            ".top-bar-active .filter-container"
        );
        const filterContainerTBNA = gsap.utils.toArray(
            ".tob-bar-not-active .filter-container"
        );

        // gsap.to(filterContainerTBNA, {
        //     scrollTrigger: {
        //         trigger: filterContainerTBNA,
        //         start: "top-=0 63px",
        //         endTrigger: maincontent,
        //         end: "bottom-=0 bottom-=150",
        //         pin: filterContainerTBNA,
        //         markers: false,
        //         pinSpacing: false,
        //         scrub: true
        //     }, y: 0
        // })

        var wideScreen = window.matchMedia("(min-width: 800px)");
        var narrowScreen = window.matchMedia("(max-width: 799px)");

        if (narrowScreen.matches) {
            document.querySelector("#video-container").style.display = "none";
        }
        // console.log(narrowScreen.matches);

        // if (narrowScreen.matches) {
        //     gsap.to(filterContainerTBA, {
        //         scrollTrigger: {
        //             trigger: filterContainerTBA,
        //             start: "top-=0 -1px",
        //             endTrigger: maincontent,
        //             end: "bottom-=0 bottom-=150",
        //             pin: filterContainerTBA,
        //             markers: false,
        //             pinSpacing: false,
        //             scrub: true,
        //         },
        //         y: 0,
        //     });
        // }

        // if (wideScreen.matches) {
        //     gsap.to(filterContainerTBA, {
        //         scrollTrigger: {
        //             trigger: filterContainerTBA,
        //             start: "top-=0 64px",
        //             endTrigger: maincontent,
        //             end: "bottom-=0 bottom-=150",
        //             pin: filterContainerTBA,
        //             markers: false,
        //             pinSpacing: false,
        //             scrub: true,
        //         },
        //         y: 0,
        //     });
        // }

        document.querySelector("#roomdialog").close();
    }, []);

    const handleFilterClick = e => {
        e.preventDefault();

        if (
            e?.target?.parentElement?.nodeName
                ?.toString()
                ?.toLowerCase()
                ?.includes("label")
        ) {
            e.target.parentElement.classList.toggle("active");
        } else {
            e.target.classList.toggle("active");
        }

        if (
            newFilters.includes(
                e.target.dataset.label_filter ||
                    e.target.parentElement.dataset.label_filter
            )
        ) {
            newFilters.pop(
                e.target.dataset.label_filter ||
                    e.target.parentElement.dataset.label_filter
            );
        } else {
            newFilters.push(
                e.target.dataset.label_filter ||
                    e.target.parentElement.dataset.label_filter
            );
        }

        if (newFilters.length == 0) {
            return setCurrentRooms(roomsgrid);
        }

        filterRooms();
    };

    const filterRooms = () => {
        let newRooms = [];

        if (newFilters.length < 1) {
            return setCurrentRooms(roomsgrid);
        }

        newFilters.some(filter => {
            roomsgrid.forEach((room, index) => {
                console.log({ currentRooms, room });
                room.roomAmenities.nodes.map(amenity => {
                    if (
                        amenity.name.includes(filter) &&
                        !newRooms.includes(room)
                    ) {
                        newRooms.push(room);
                    }
                });
            });
        });

        setCurrentRooms(newRooms);
    };

    const handleClick = e => {
        e.preventDefault();
        const { sleeps, roomtitle, description, image, slug } =
            e.target.parentElement.closest("li").dataset;

        setDialogContent({
            sleeps,
            roomtitle,
            description,
            image,
            slug,
        });

        document.querySelector("dialog").show();
        document.querySelector("input").blur();
        document.querySelector("input").blur();
    };

    return (
        <section className={styles.roomsGrid}>
            <dialog
                id="roomdialog"
                style={{
                    width: "100%",
                    height: "100%",
                    border: "0px",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    position: "fixed",
                    top: "0",
                    zIndex: "9999999999",
                }}>
                <ContentContainer>
                    <div
                        style={{
                            backgroundImage: `url(${dialogContent.image})`,
                        }}></div>
                    <LeftHalf className="relative">
                        <div>
                            <p
                                id="closeBtn"
                                className="heading"
                                style={{
                                    fontSize: "2rem",
                                    margin: 0,
                                    position: "absolute",
                                    right: "2rem",
                                    top: "2rem",
                                }}>
                                &#10005;
                            </p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                margin: "auto 10% 1rem",
                            }}>
                            <p className="sans-serif-bold sub-heading">
                                Sleeps {dialogContent.sleeps}
                            </p>
                            <h2 className="heading">
                                {dialogContent.roomtitle}
                            </h2>
                            <p className="sans-serif body-copy black">
                                {dialogContent.description}
                            </p>
                            <a
                                className="sans-serif xs-copy underline text-link"
                                href={`/rooms/${dialogContent.slug}`}>
                                Learn More
                            </a>
                        </div>
                        <div
                            style={{
                                marginTop: "auto",
                                width: "100%",
                                backgroundColor: "white",
                            }}>
                            <BookingForm />
                        </div>
                    </LeftHalf>
                </ContentContainer>
            </dialog>
            <FilterContainer className="filter-container">
                {filters.map((filter, index) => {
                    return (
                        <FilterLabel
                            key={`filter-${index}`}
                            className="rooms-filter sans-serif"
                            data-label_filter={filter.name}>
                            <div
                                className="checkbox"
                                data-label_filter={filter.name}></div>
                            {filter.name}
                        </FilterLabel>
                    );
                })}
            </FilterContainer>
            <ul className={styles.gridList}>
                {currentRooms.length != 0 ? (
                    currentRooms.map((room, index) => {
                        let filterList = [];
                        let filterName = room.roomAmenities.nodes.map(item =>
                            filterList.push(item.name)
                        );
                        let filters = filterList.join(",");

                        return (
                            <li
                                style={{ overflow: "hidden" }}
                                className="room-tile"
                                key={`room-${index}`}
                                data-filter={filters}
                                data-sleeps={room.singleRooms.sleeps}
                                data-roomtitle={room.title}
                                data-description={room.singleRooms.description}
                                data-slug={room.slug}
                                data-image={
                                    room.featuredImage.node.mediaItemUrl
                                }>
                                <RoomTile href={`/rooms/${room.slug}`}>
                                    <TileMedia
                                        key={room.title}
                                        className={styles.room}
                                        bg={
                                            room.featuredImage.node.mediaItemUrl
                                        }>
                                         {room.singleRooms
                                            .includeVideoOnFindYourRoomTile && (
                                            <VideoContainer
                                                id="video-container"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                poster={
                                                    room.singleRooms.featuredVideoPoster.mediaItemUrl ? room.singleRooms.featuredVideoPoster.mediaItemUrl : room.singleRooms.node
                                                        .mediaItemUrl
                                                }>
                                                <source
                                                    src={`${room.singleRooms.featuredVideoUrl}.mp4`}
                                                    type="video/mp4"
                                                />
                                                <source
                                                    src={`${room.singleRooms.featuredVideoUrl.replace(".mp4", ".webm")}`}
                                                    type="video/webm"
                                                />
                                            </VideoContainer>
                                        )}
                                        <Image
                                            className={styles.roomimage}
                                            src={
                                                room.featuredImage.node
                                                    .mediaItemUrl
                                            }
                                            alt={room.featuredImage.node.altText}
                                            width={430}
                                            height={436}
                                            layout="intrinsic"
                                        />
                                        <QuickViewButton className="quickview-btn">
                                            Quick View
                                        </QuickViewButton>
                                    </TileMedia>
                                    <div className={styles.text}>
                                        <p className="xs-heading uppercase letterSpacing black">
                                            Sleeps {room.singleRooms.sleeps}
                                            <span className={styles.keyFt}>
                                                {room.singleRooms.keyFeature}
                                            </span>
                                            <span className={styles.theme}>
                                                {room.singleRooms.theme}
                                            </span>
                                        </p>
                                        <p
                                            className={`${styles.roommobile} serif heading black`}>
                                            {room.title}
                                        </p>
                                    </div>
                                </RoomTile>
                            </li>
                        );
                    })
                ) : (
                    <p
                        className="heading"
                        style={{
                            minHeight: "50vh",
                            display: "grid",
                            placeItems: "center",
                            textAlign: "center",
                            width: "100%",
                        }}>
                        No rooms match this filter!
                    </p>
                )}
            </ul>
        </section>
    );
}
