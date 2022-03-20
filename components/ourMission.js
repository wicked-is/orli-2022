import Image from 'next/image';
import styles from '../styles/ourMission.module.css';

export default function OurMission({ title, logo, text }) {
    return (
        <section className={styles.missionContainer}>
            {title}
            <>
                <Image src={logo} width={167} height={108} />{text}
            </>
        </section>
    )
}