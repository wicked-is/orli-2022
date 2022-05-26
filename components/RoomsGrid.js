import { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';

import styled, { css } from 'styled-components';

import styles from '../styles/roomsGrid.module.css'

const filters = ['Outdoor Spaces', 'Workstation', 'Seating Area', 'Kitchenette', 'Ocean View', 'Bathtub', 'ADA Accessible'];

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

    const { roomsgrid } = props
    
    return (
        <section className={styles.roomsGrid}>
            <FilterContainer>
                {
                    filters.map((filter, index) => { 
                        return (
                            <>
                                <label className="rooms-filter"><span id="checkbox"></span><input type="checkbox" name="checkbox" value="value" />{filter}</label>
                            </>
                        )
                    })
                }
            </FilterContainer>
            <ul className={styles.gridList}>
            {/* map over images */} 
            {
                    roomsgrid.map((room, index) => {
                        return (
                            <li>
                            <div key={room.title} className={styles.room} style={{ backgroundImage: `url(${room.featuredImage.node.mediaItemUrl})` }}>
                                <Image className={styles.roomimage} src={room.featuredImage.node.mediaItemUrl} alt={room.altText} width={430} height={436} layout="intrinsic"/>
                            </div>
                            <div className={styles.text}>
                                <p class="xs-heading uppercase black">Sleeps {room.singleRooms.sleeps} <span className={styles.keyFt}>{room.singleRooms.keyFeature}</span> <span className={styles.theme}>{room.singleRooms.theme}</span></p>
                                <p className={`${styles.roommobile} serif heading black`}>{room.title}</p>
                            </div>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}