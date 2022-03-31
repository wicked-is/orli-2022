import Image from 'next/image';
import styles from '../styles/ourMission.module.css';

export default function OurMission({ title, logo, text1, text2, text3}) {
    return (
        <section className={`${styles.missionContainer} center bg-lt-grey`}>
            <p className="serif sub-heading center brown">{title}</p>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '7rem 0' }}>
                <Image src={logo} width={167} height={108} /><span className="heading" style={{
                    alignSelf: 'center', marginLeft: '2rem'
                }}>
                    <span className="textAnimation"></span> 
                    <span className="textAnimation2"></span>
                    <span className="textAnimation3"></span>
                    <span className="cursor"></span>
                    </span>
            </div>
        </section>
    )
}