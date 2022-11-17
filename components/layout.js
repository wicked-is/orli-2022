import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Gate from "../components/Gate";
import exitIntent from "exit-intent";
import ExitIntent from "../components/exitIntent";

export default function Layout(props) {
    const [showModal, setshowModal] = useState(false);

    if (typeof document !== "undefined") {
        const removeExitIntent = exitIntent({
            threshold: 50,
            maxDisplays: 2,
            eventThrottle: 100,
            onExitIntent: () => {
                console.log("exit-intent triggered");
                setshowModal(true);
            },
        });
    }

    return (
        <div
            className={`${
                props.topBar?.isAnnouncementBarActive === undefined
                    ? "tob-bar-not-active"
                    : "top-bar-active"
            }`}>
            <Header navItems={props.navItems} topBar={props.topBar} />
            <main>{props.children}</main>
            <Footer footerImages={props.footerImages} />
        </div>
    );
}
