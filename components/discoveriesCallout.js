import BlurbLeft from '../components/blurbLeft';
import TwoStaggeredPhotos from '../components/twoStaggeredImages';

export default function DiscoveriesCallout(props) {
    /**
     * TODO: Update TwoStaggeredPhotos to take media/video from props
     */

    const { 
        blurb,
        ctaLink,
        ctaText,
        icon,
        media,
        title
    } = props;

    return (
        <section className="bg-lt-grey" style={{ padding: '6rem 0' }}>
            <div className="max-80">
                <BlurbLeft
                    title={title}
                    content={blurb}
                    ctaText={ctaText}
                    ctaLink={ctaLink}
                    icon={icon}
                />
                <TwoStaggeredPhotos left="https://orlidev.wpengine.com/wp-content/uploads/2022/03/Orli_TheJournal_01-scaled.jpg" right="https://orlidev.wpengine.com/wp-content/uploads/2022/01/Orli_Interior-1Web.jpg" />
            </div>
        </section>
    )
}