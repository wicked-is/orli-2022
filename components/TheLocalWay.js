import { useEffect } from 'react';
import styled from "styled-components"

import TitleBar from "./TitleBar"

const MainMap = styled.div`
    width: 100%;
    height: 500px;
`

const TheLocalWayContainer = styled.section`
    display: flex;
    flex-direction: column;
    padding: 2rem 10% 6rem;
    background-color: var(--lt-grey);
`

const ColumnsContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.6rem;

    padding-top: 5rem;

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

const ListContainer = styled.p`
    line-height: 32px;
    font-size: var(--body-copy);
    font-family: 'GT Walsheim Light';
    line-height: 150%;
`

const ColumnSection = styled.div`
    margin-bottom: 2rem;
`

export default function TheLocalWay(props) {
    const { title, iframe, columns } = props

    useEffect(() => { 
        let map;
        
        function initMap() {
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 32.583944, lng: -117.113085, },
                zoom: 7,
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
                                "color": "#F2F2F2"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.natural.landcover",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#F2F2F2"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.attraction",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#022543"
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
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#FF0000"
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
            console.log('m1',map);
        }

        window.initMap = initMap;

        console.log('m2',map);
    }, [])

    return (
        <TheLocalWayContainer>
            <TitleBar title="The Local Way" left="true" />
            <div dangerouslySetInnerHTML={{ __html: iframe }} ></div>
            <MainMap id="map"></MainMap>
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
                                                <ListContainer dangerouslySetInnerHTML={{ __html: section.list }}></ListContainer>
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