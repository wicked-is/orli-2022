import exitIntent from "exit-intent";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ExitIntent from "../components/exitIntent";
import Footer from "../components/footer";
import Header from "../components/header";

import PerksShopFeatureSlider from "./PerksShopFeatureSlider";

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
					if (hasModalShown) {
						return;
					}
					setshowModal(true);
				},
			});
		}, 20_000);
	}

	function handleShopIconClick(e) {
		// prevent default
		e.preventDefault();
		// send gtag event click, offers_button
		window.gtag("event", "click", {
			event_category: "offers_button",
			event_label: "Shop Icon",
		});

		// sent window location to /offers
		window.location.href = "/offers";
	}

	return (
		<div
			data-page={`${props.currentPage}`}
			className={`${
				props.topBar?.isAnnouncementBarActive === undefined
					? "tob-bar-not-active"
					: "top-bar-active"
			}`}>
			<Header navItems={props.navItems} topBar={props.topBar} />
			<main id="main">
				{props.children}
				{/* <PerksShopFeatureSlider /> */}
			</main>
			{showModal && !hasModalShown && props.page !== "/email" && (
				<ExitIntent toggleModal={{ setshowModal, sethasModalShown }} />
			)}
			{/* <ExitIntent toggleModal={{ setshowModal, sethasModalShown }} /> */}
			<Footer page={props.footerImages} />
		</div>
	);
}
