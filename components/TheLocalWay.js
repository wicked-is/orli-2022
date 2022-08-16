import { useEffect, useState } from 'react';
import Script from "next/script";
import styled from "styled-components"

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

import TitleBar from "./TitleBar"

const MainMap = styled.div`
    width: 100%;
    height: 400px;
`
const TheLocalWayContainer = styled.section`
    display: flex;
    flex-direction: column;
    padding: 2rem 10% 6rem;
    background-color: var(--lt-grey);

    p[data-address] {
        margin: 0;
    }

    iframe + div { border: 0 !important; }
`
const ColumnsContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;

    /* padding-top: 1rem; */

    @media (max-width: 1100px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 676px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 425px) {
        grid-template-columns: 1fr;
    }
`
const Column = styled.div``
const ListContainer = styled.div`
    line-height: 32px;
    font-size: var(--body-copy);
    font-family: 'GT Walsheim Light';
    line-height: 150%;

    p:hover {
        font-weight: bold;
        text-decoration: underline;
    }
`
const ColumnSection = styled.div`
    margin-bottom: 2rem;
`

export default function TheLocalWay(props) {
    const { title, iframe, columns } = props

    const [currentMarker, setCurrentMarker] = useState(null);

    let map;
    let mainMarker;
    let infowindow = null;

    const markers = [];

    useEffect(() => { 

        let the_window = window

        function initMap() {
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 32.845857, lng: -117.268310, },
                zoom: 14.7,
                mapTypeControl: false,
                streetViewControl: false,
                styles: [
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#444444"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#0C2B1C"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.province",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#0C2B1C"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#022543"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.neighborhood",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#022543"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#F30202"
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#F5F5F5"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#022543"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.natural.landcover",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#F2F2F2"
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.attraction",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#022543"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.attraction",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.attraction",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#022543"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.attraction",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.attraction",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.business",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.government",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.medical",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#FFFFFF"
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#FF0000"
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.place_of_worship",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.school",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.sports_complex",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 45
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#DCE5E9"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#E1EAEE"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#022543"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }
                ]
            });
            infowindow = new google.maps.InfoWindow();

            mainMarker = new google.maps.Marker({
                position: { lat: 32.843764, lng: -117.277141},
                icon: "https://orlidev.wpengine.com/wp-content/uploads/2022/07/navy-pin.png"
            });

            markers.push(mainMarker)
            makeMarkersVisible(mainMarker)

            columns.map((column, index) => {
                column.sections.map((section, index) => {
                    section.locations.map((location, index) => {
                        
                        let aNewMarker = new google.maps.Marker({
                            position: { lat: Number(location.lat), lng: Number(location.long)},
                            icon: "https://orlidev.wpengine.com/wp-content/uploads/2022/07/picker.svg",
                            map: map
                        });

                        infowindow.setContent(`<div id="map-tip">${location.name}</div>`);
                        infowindow.setPosition({ lat: Number(location.lat), lng: Number(location.long)})

                        markers.push(aNewMarker)
                        
                    })
                })
            })
        }

        // Hide irrelevant markers
        const makeMarkersInvisible = (items) => {
            items.forEach((item, index) => {
                if (index == 0) return;
                item.setMap(null)
            })
        }

        // Set map for individual marker
        const makeMarkersVisible = (marker) => {
            marker.setMap(map)   
        }

        window.initMap = initMap;
        
        document.querySelectorAll('p[data-address]').forEach((item, index) => {
            item.addEventListener('click', function (e) {

                if (infowindow !== null) {
                    infowindow.close()
                    infowindow.setContent(`<div id="map-tip">${item.dataset.name}</div>`);
                    infowindow.setPosition({ lat: Number(item.dataset.lat), lng: Number(item.dataset.long)})
                    infowindow.open({
                        map,
                        shouldFocus: false,
                    });
                }
                

                map.panTo({ lat: Number(item.dataset.lat), lng: Number(item.dataset.long)})
            })
        })

    }, [])

    return (
        <TheLocalWayContainer>
            <Script id="google-mmaps" src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAV1WnDACFeekncT34JftC0V8ZvS9P4J4U&callback=initMap&v=weekly`} strategy="afterInteractive" />
            <TitleBar title="The Local Way" left="true" />
            { iframe && <div dangerouslySetInnerHTML={{ __html: iframe }} ></div> }
            <MainMap id="map"></MainMap>
            <p>{markers}</p>
            <ColumnsContainer>
                {
                    columns.map((column, index) => {
                        return (
                            <Column key={index}>
                                {
                                    column.sections.map((section, index) => {
                                        return (
                                            <ColumnSection key={index}>
                                                <h2 className="sans-serif sub-heading-bold black">{section.title}</h2>
                                                <ListContainer>
                                                    {
                                                        section.locations && section.locations.map((location, index) => (
                                                            <p key={location.name} data-address={location.address} data-name={location.name} data-lat={location.lat} data-long={location.long}>{location.name}</p>
                                                        ))
                                                    }
                                                </ListContainer>
                                            </ColumnSection>
                                        )
                                    })
                                }
                            </Column>
                        )
                    })
                }
            </ColumnsContainer>
        </TheLocalWayContainer>
    )
}