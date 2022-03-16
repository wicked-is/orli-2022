import Image from "next/image"

export default function Footer() {
    return (
        <footer className="green-bg">
            <div className="footer-container">
                <div className="col-flex">
                    <div className="col-1-25 footer-logo">
                        <h3 className="sans-serif-regular sub-heading white"></h3>
                        <Image src="https://orlidev.wpengine.com/wp-content/uploads/2022/01/logo-orli.svg" width={380} height={75} layout="responsive" />
                    </div>
                    <div className="col-1-25 address-container">
                        <h3 className="sans-serif-regular sub-heading white"></h3>
                        <address className="sans-serif-light white">
                        Sand Hill Property Company<br/>
                        2600 El Camino Real Suite 410<br/>
                        Palo Alto, California 94306
                        </address>
                    </div>
                    <div className="stay-connected col-1-50 relative">
                        <h3 className="sans-serif-regular sub-heading green">Stay Connected</h3>
                        <div className="col-flex">
                            <div className="col-1-3">
                                <div className="sans-serif-light social">
                                <a className="white footer-link">LinkedIn</a>
                                <a className="white footer-link">info@shpco.com</a>
                                </div>
                            </div>
                            <div className="col-1-3">
                                <div className="terms-privacy">
                                    <a className="sans-serif-light white footer-link">Privacy Policy</a>
                                    <a className="sans-serif-light white footer-link">Cookie Policy</a>
                                </div>
                            </div>
                        </div>
                        <p className="sans-serif-light copyright green">Copyright &copy; {new Date().getFullYear()} Orli La Jolla<br />
                    All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}