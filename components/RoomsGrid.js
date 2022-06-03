import { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';

import styled, { css } from 'styled-components';

import styles from '../styles/roomsGrid.module.css'

const filterList = ['Outdoor Spaces', 'Workstation', 'Seating Area', 'Kitchenette', 'Ocean View', 'Bathtub', 'ADA Accessible'];

const FilterContainer = styled.section`
    display: flex;    
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 10%;
    margin-inline: auto;

    background-color: var(--lt-grey);
`

export default function RoomsGrid(props) {

    const [filters, setFilters] = useState(filterList);
    const [currentRooms, setCurrentRooms] = useState(null);

    const newFilters = [];

    const { roomsgrid } = props

    useEffect(() => { 
        document.querySelectorAll('label.rooms-filter').forEach(label => { 
            label.addEventListener('click', handleFilterClick);
        })

        setCurrentRooms(roomsgrid);
    }, []);

    const handleFilterClick = (e) => { 
        e.preventDefault();

        e.target.classList.toggle('active');

        if (newFilters.includes(e.target.dataset.label_filter)) {
            newFilters.pop(e.target.dataset.label_filter);
        } else {
            newFilters.push(e.target.dataset.label_filter);
        }

        filterRooms();
    }

    const filterRooms = () => {
        console.log('new', newFilters);
        const newRooms = [];

        const filteredRooms = roomsgrid.filter(room => {
            console.log(room.singleRooms.amenities)
        });
    }
    console.log('roomsgrid', roomsgrid);
    return (
        <section className={styles.roomsGrid}>
            <FilterContainer>
                {
                    filters.map((filter, index) => { 
                        return (
                            <>
                                <label className="rooms-filter sans-serif" data-label_filter={filter}><span id="checkbox"></span>{filter}</label>
                            </>
                        )
                    })
                }
            </FilterContainer>
            <ul className={styles.gridList}>
            {
                    roomsgrid.map((room, index) => {
                        const roomFilters = room.singleRooms.amenities
                        return (
                            <li key={`room-${index}`} data-filter={roomFilters} >
                                <a href={`/rooms/${room.slug}`}>
                                    <div key={room.title} className={styles.room} style={{ backgroundImage: `url(${room.featuredImage.node.mediaItemUrl})` }}>
                                        <Image className={styles.roomimage} src={room.featuredImage.node.mediaItemUrl} alt={room.altText} width={430} height={436} layout="intrinsic"/>
                                    </div>
                                    <div className={styles.text}>
                                        <p className="xs-heading uppercase black">Sleeps {room.singleRooms.sleeps} <span className={styles.keyFt}>{room.singleRooms.keyFeature}</span> <span className={styles.theme}>{room.singleRooms.theme}</span></p>
                                        <p className={`${styles.roommobile} serif heading black`}>{room.title}</p>
                                    </div>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}