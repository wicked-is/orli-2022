import Image from "next/image";
import Flickity from "react-flickity-component";
import styles from '../styles/roomSlider.module.css'
import "flickity/css/flickity.css";

export default function Hero(props) {

    const { images, pageDots } = props;

    return (
        <section className="room-slider">
            {
                images.length > 1 ? (
                    <Flickity
                        options={{
                            cellAlign: 'center',
                            pageDots: false,
                            draggable: true,
                            prevNextButtons: false,
                            fullscreen: true
                        }}
                        disableImagesLoaded={false} // default false
                        reloadOnUpdate // default false
                        static // default false
                    >
                        {
                            images.map((slide, index) => (
                                <div className="carousel-cell" key={`${slide.title}-${index}`} style={{ minHeight: '100vh', position: 'relative' }}>
                                    <div className="overlay" style={{ 
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        width: '100%',
                                        background: 'linear-gradient(rgba(0 0 0/25%),rgba(0 0 0/25%))',
                                        zIndex: 1
                                    }}></div>
                                   <Image
                                    src={slide.image.sourceUrl} layout="fill"
                                    objectFit="cover"
                                    objectPosition="center center"
                                    quality="100"
                                    />
                                    <div className="over-hero" style={{ zIndex: 4}}>
                                        <p className="sans-serif-regular heading white left">{slide.title}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </Flickity>
                ) : (
                        <div style={{ minHeight: '88vh', position: 'relative' }}>
                            <Image
                                src={images[0].image.sourceUrl} layout="fill"
                                objectFit="cover"
                                objectPosition="center center"
                                quality="100"
                            />
                        <div className="over-hero">
                            <p className="sans-serif heading white left">{images[0].title}</p>
                        </div>
                    </div> 
                )
            }
        </section>
    )
}