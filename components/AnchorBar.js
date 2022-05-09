import styles from '../styles/hero.module.css'

export default function AnchorBar(props) {
    console.log(props);
    return (
        <ul className={styles.subnavigationContainer}>               
            {/* {
                // This was the incorrect bit. You were calling parameters
                // on the item without having the item defined. 
                // When you're back we can huddle if you'd like.
                subnavigation.map((item, index) => {
                    return (
                        <li key={`ni-${index}`} >
                            <a href={item.link}>
                            <img src={item.iconnav !== null ? item.iconnav.mediaItemUrl : 'https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_agave-1.svg'} className={styles.iconnav} alt={item.iconnav?.altText} />
                            <p className="black xs-copy uppercase center">{item.label}</p>
                            </a>
                        </li>
                        )
                })
            } */}
        </ul>
    )
}