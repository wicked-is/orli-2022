import styles from '../styles/twoStaggeredImages.module.css';

export default function TwoStaggeredPhotos({ photosOne, photosTwo }) {

    return (
        <article className={ styles.photosContainer}>
            <Image src={photosOne} width={561} height={370} layout="response" />
            <Image src={photosTwo} width={561} height={370} layout="response" />
        </article>
    )
}