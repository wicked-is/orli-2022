import Script from "next/script"

export default function Analytics(props) {

    // const EXAMPLE_UA_CODE = "UA-130029095-1"
    const UA_CODE = "UA-234602062-1"

    return (
        !props.siteNotLive && (
            <>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${UA_CODE}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', '${UA_CODE}');
                    `}
                </Script>
            </>
        )
    )
}