import exitIntent from "exit-intent";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ExitIntent from "../components/exitIntent";
import Footer from "../components/footer";
import Header from "../components/header";
import OrliWebSticker from "../public/assets/images/OfferWebSticker.png";
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

	return (
		<div
			data-page={`${props.currentPage}`}
			className={`${
				props.topBar?.isAnnouncementBarActive === undefined
					? "tob-bar-not-active"
					: "top-bar-active"
			}`}>
			<Header navItems={props.navItems} topBar={props.topBar} />
			<main>
				<Link href="/offers" passHref>
					<a
						style={{
							position: "fixed",
							bottom: "1rem",
							right: "1rem",
							zIndex: 99,
						}}>
						<Image src={OrliWebSticker} width={75} height={75} />
					</a>
				</Link>
				{props.children}
				<PerksShopFeatureSlider />
			</main>
			{showModal && !hasModalShown && props.page !== "/email" && (
				<ExitIntent toggleModal={{ setshowModal, sethasModalShown }} />
			)}
			{/* <ExitIntent toggleModal={{ setshowModal, sethasModalShown }} /> */}
			<Footer page={props.page} />
		</div>
	);
}
