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
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', '${UA_CODE}');
                    `}
                </Script>

                <Script
                    strategy="afterInteractive"
                    id="tag-manager"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PMRKR2L');`,
                    }}></Script>
            </>
        )
    );
}
