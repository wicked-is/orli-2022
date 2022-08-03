import Footer from "../components/footer";
import Header from "../components/header";

export default function Layout(props) {
    return (
        <div className={`${props.topBar?.isAnnouncementBarActive === undefined ? 'tob-bar-not-active': 'top-bar-active'}`}>
        {/* <div className={`top-bar-active`}> */}
            <Header navItems={props.navItems} topBar={props.topBar} />
            <main>
                {props.children}
            </main>
            <Footer footerImages={props.footerImages} />
        </div>
    )
}