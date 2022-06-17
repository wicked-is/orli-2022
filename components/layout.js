import Footer from "../components/footer";
import Header from "../components/header";

export default function Layout(props) {
    console.log("Layout props: ", props.topBar.isAnnouncementBarActive);
    return (
        <div className={`${props.topBar.isAnnouncementBarActive !== true ? 'tob-bar-not-active': 'top-bar-active'}`}>
            <Header navItems={props.navItems} topBar={props.topBar} />
            <main>
                {props.children}
            </main>
            <Footer />
        </div>
    )
}