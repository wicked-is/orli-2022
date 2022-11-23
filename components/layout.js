import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Gate from "../components/Gate";
import exitIntent from "exit-intent";
import ExitIntent from "../components/exitIntent";

export default function Layout(props) {
    const [showModal, setshowModal] = useState(false);
    const [hasModalShown, sethasModalShown] = useState(false);

    if (typeof document !== "undefined") {
        setTimeout(() => {
            const removeExitIntent = exitIntent({
                threshold: 10,
                maxDisplays: 1,
                eventThrottle: 200,
                onExitIntent: () => {
                    setshowModal(true);
                },
            });
        }, 60_000);
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
            {showModal && !hasModalShown && props.page !== "/email" && (
                <ExitIntent toggleModal={{ setshowModal, sethasModalShown }} />
            )}
            <Footer page={props.page} />
        </div>
    );
}
