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
            threshold: 30,
            maxDisplays: 2,
            eventThrottle: 100,
            onExitIntent: () => {
                console.log("exit-intent triggered");
                setshowModal(true);
            },
        });
    }

    return (
        <>
            <noscript>
                <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-PMRKR2L"
                    height="0"
                    width="0"
                    style="display:none;visibility:hidden"></iframe>
            </noscript>

            <div
                className={`${
                    props.topBar?.isAnnouncementBarActive === undefined
                        ? "tob-bar-not-active"
                        : "top-bar-active"
                }`}>
                <Header navItems={props.navItems} topBar={props.topBar} />
                <main>{props.children}</main>
                {showModal && <ExitIntent toggleModal={setshowModal} />}
                <Footer footerImages={props.footerImages} />
            </div>
        </>
    );
}
