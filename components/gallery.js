import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

export default function Gallery(props) {
    const {
        filter
    } = props

    return (
        <ResponsiveMasonry
                columnsCountBreakPoints={{416: 1, 800: 2, 900: 3}}
            >
                <Masonry>
                    <ChildA />
                    <ChildB />
                    {/* Children */}
                    <ChildY />
                    <ChildZ />
                </Masonry>
            </ResponsiveMasonry>
    )
}