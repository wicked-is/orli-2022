import Footer from "../components/footer";
import Header from "../components/header";

export default function Layout(props) {
    return (
        <>
            <Header navItems={props.navItems} topBar={props.topBar} />
            <main>
                {props.children}
            </main>
            <Footer />
        </>
    )
}