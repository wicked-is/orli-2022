import Image from 'next/image';

import styles from '../styles/twoStaggeredImages.module.css';

export default function TwoStaggeredPhotos({ left, right }) {

    return (
        <section className={styles.photoContainer}>
            <div className={styles.left}>
                <Image src={left} width={561} height={370} layout="responsive" />
            </div>
            <div className={styles.right}>
                {/* <Image src={right} width={708} height={434} layout="responsive" /> */}
                <video poster={right} className={styles.videoBG} autoPlay playsInline muted loop>
                    <source src="https://stayorli.com/wp-content/uploads/2022/02/orlihero5-1.mp4" type="video/mp4" />
                    <source src="https://stayorli.com/wp-content/uploads/2022/02/orlihero5-1.webm" type="video/webm" />
                </video>
            </div>
        </section>
    )
}