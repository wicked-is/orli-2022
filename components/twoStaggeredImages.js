import Image from 'next/image';

import styles from '../styles/twoStaggeredImages.module.css';

export default function TwoStaggeredPhotos({ left, right }) {

    return (
        <section className={styles.photoContainer}>
            <div className="container">
                <Image src={left} width={561} height={370} layout="intrinsic" />
                <Image src={right} width={708} height={434} layout="intrinsic" />
            </div>
        </section>
    )
}