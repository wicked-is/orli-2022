import Footer from "../components/footer";
import Header from "../components/header";

export default function Layout(props) {
    return (
        <>
            <Header />
            <main>
                {props.children}
            </main>
            <Footer />
        </>
    )
}