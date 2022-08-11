import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Gate from "../components/Gate";

export default function Layout(props) {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    return ( !isLoggedIn ? <Gate login={setisLoggedIn} /> : 
            <div className={`${props.topBar?.isAnnouncementBarActive === undefined ? 'tob-bar-not-active' : 'top-bar-active'}`}>
                <Header navItems={props.navItems} topBar={props.topBar} />
                <main>
                    {props.children}
                </main>
                <Footer footerImages={props.footerImages} />
            </div>
        )
}