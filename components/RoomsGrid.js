import { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';

import styles from '../styles/roomsGrid.module.css'

export default function RoomsGrid(props) {

    const { roomsgrid } = props
    
    return (
        <section className={styles.roomsGrid}>
            <ul className={styles.gridList}>
            {/* map over images */} 
            {
                    roomsgrid.map((room, index) => {
                        return (
                            <li>
                            <div key={room.title} className={styles.room} style={{ backgroundImage: `url(${room.featuredImage.node.mediaItemUrl})` }}>
                                <Image src={room.featuredImage.node.mediaItemUrl} alt={room.altText} width={430} height={436} layout="intrinsic" />
                            </div>
                            <p className={`${styles.roommobile} serif heading black`}>{room.title}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}