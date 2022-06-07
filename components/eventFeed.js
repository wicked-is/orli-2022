import styles from '../styles/eventFeed.module.css'
import Link from 'next/link'
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const EventFeedContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 3rem;

    @media (max-width: 768px) {
        flex-direction: column;
        max-width: 80vw;
        margin-inline: auto;
    }
`
const Left = styled.div`    
    flex: 1.2;
    overflow: scroll;
    margin-right: ${props => props.fullWidget ? '10%' : '0'}; }

    @media (max-width: 768px) {
        margin-right: 0;
    }
`
const Right = styled.div`
    flex: 2;
`
const HeadContainer = styled.div`
    min-height: 325px;
`
const ContentContainer = styled.div`
    margin-right: 10%;
`

export default function EventFeed(props) {
    const { events } = props;

    const [currentEvent, setCurrentEvent] = useState({});
    
    // useEffect(() => {
    //     document.querySelectorAll('#article-container').forEach(el => {
    //         el.addEventListener('hover', () => {
    //             setCurrentEvent({
    //                 category:
    //             })
    //         })
    //     });
    // }, []);
    
    console.log(events);
    
    return (
        <EventFeedContainer>
            <Left id="article-container" style={{ marginLeft: props.fullWidget ? '10%' : '' }}>
                <p>Upcoming</p>
                {
                    events.map((event, index) => {
                        
                        const date = new Date(event.date);
                        let day = date.getDate();
                        let month = months[date.getMonth()];
                        let year = date.getFullYear();
                        
                        return (
                            <article key={`event-${index}`} className={index == 0 ? styles.first : ''} style={{ borderTop: '1px solid black', width: '100%' }}>
                                <a href="#">
                                    <p className="sans-serif xs-copy left">{event.categories.nodes[0].name} | {day} {month} {year}</p>
                                    <div className="flexcenter">
                                        <div className="col-1-90">
                                            <h3 className="heading" style={{ margin: '0 0 1rem' }}>{event.title}<span className={styles.arrow}></span></h3>
                                        </div>
                                        {
                                            !props.fullWidget && (
                                                <div className="col-1-10">
                                                    <img className={styles.arrow} src="https://orlidev.wpengine.com/wp-content/uploads/2022/03/orange-arrow.svg" alt="arrow"/>
                                                </div>
                                            )
                                        }
                                    </div>
                                </a>
                            </article>
                        )
                    })
                }
            </Left>
            {props.fullWidget && (
                <Right>
                    <HeadContainer>
                        <p>Event Category</p>
                        <p className="heading serif">Orli Grand Opening</p>
                    </HeadContainer>
                    <ContentContainer>
                        <div>
                            <p dangerouslySetInnerHTML={{ __html: "Monday, 01 January 2022 at 5 PM - 9 PM" }}></p>
                            <p dangerouslySetInnerHTML={{ __html: "Orli La Jolla 7753 Draper Ave, La Jolla" }}></p>
                        </div>
                        <p>Come celebrate our Grand Opening in true Orli style. We'll be welcoming good company with tunes, craft spirits, light bites, and favors filled with founder favorites.</p>
                    </ContentContainer>
                    <Link href="/">
                        RSVP
                    </Link>
                </Right>
            )}
        </EventFeedContainer>
    )
}