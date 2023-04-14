import Script from "next/script";

export default function Analytics(props) {
	// const EXAMPLE_UA_CODE = "UA-130029095-1"
	const UA_CODE = "UA-234602062-1";

	return (
		!props.siteNotLive && (
			<>
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=${UA_CODE}`}
					strategy="afterInteractive"
				/>
				{/* <Script id="google-analytics" strategy="afterInteractive">
					{`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', '${UA_CODE}');
                    `}
				</Script> */}

				<Script
					strategy="afterInteractive"
					id="tag-manager"
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PMRKR2L');`,
					}}
				/>
				<Script
					strategy="afterInteractive"
					id="tag-manager-2"
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-N3Z8NP4');`,
					}}
				/>
				<Script
					strategy="afterInteractive"
					id="tag-manager-3"
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TG8CZ4V');`,
					}}
				/>
				<Script
					strategy="afterInteractive"
					id="fb pixel"
					dangerouslySetInnerHTML={{
						__html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '676429500584234');fbq('track', 'PageView');`,
					}}
				/>
				<Script
					strategy="afterInteractive"
					id="ClickCease"
					dangerouslySetInnerHTML={{
						__html: `var script = document.createElement('script');
                            script.async = true; script.type = 'text/javascript';
                            var target = 'https://www.clickcease.com/monitor/stat.js';
                            script.src = target;var elem = document.head;elem.appendChild(script);`,
					}}
				/>
			</>
		)
	);
}
