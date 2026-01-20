import Image from "next/image";
import Link from "next/link";

const Footer1 = () => {
    return (
        <footer className="footer-section bg-title fix">
            <div className="footer-widgets-wrapper">
                <div className="shape1 float-bob-y d-none d-xxl-block"> <Image src="/assets/img/shape/footerShape1_1.png" alt="img" width={161} height={253} /></div>
                <div className="shape2 d-none d-xxl-block"><Image src="/assets/img/shape/footerShape1_2.png" alt="img" width={492} height={608} /></div>
                <div className="shape3 d-none d-xxl-block"><Image src="/assets/img/shape/footerShape1_3.png" alt="img" width={471} height={742} /></div>
                <div className="shape4  d-none d-xxl-block"><Image src="/assets/img/shape/footerShape1_4.png" alt="img" width={212} height={279} /></div>
                <div className="container">
                    <div className="footer-top">
                        <div className="row gy-4">
                            <div className="col-lg-4">
                                <div className="fancy-box">
                                    <div className="item1"><i className="bi bi-geo-alt-fill"></i></div>
                                    <div className="item2">
                                        <h6>address</h6>
                                        <p style={{lineHeight:"28px"}}>7109 Martin Luther King Jr Hwy Unit A, North Englewood, <br/>MD 20785</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex justify-content-start justify-content-lg-end">
                                <div className="fancy-box">
                                    <div className="item1"><i className="bi bi-envelope-fill"></i></div>
                                    <div className="item2">
                                        <h6>send email</h6>
                                        <p>info@usbestchicken.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex justify-content-start justify-content-lg-end">
                                <div className="fancy-box">
                                    <div className="item1"><i className="bi bi-telephone-fill"></i></div>
                                    <div className="item2">
                                        <h6>call for Order</h6>
                                        <p>240-667-2223</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <Link href="/">
                                        <Image src="/assets/img/logo/logo_new.png" alt="img" width={80} height={80} />
                                    </Link>
                                </div>
                                <div className="footer-content">
                                    <p>
                                        US Best Chicken & Burger serves freshly made chicken, burgers, and seafood around the clock. We are open 24/7 and offer breakfast, lunch, and dinner made to order.
                                    </p>
                                    <div className="social-icon d-flex align-items-center">
                                        <a href="https://www.facebook.com/profile.php?id=61582703983853" target="_blank"><i className="bi bi-facebook"></i></a>
                                        <a href="https://x.com/usbestchicken" target="_blank"><i className="bi bi-twitter-x"></i></a>
                                        {/* <a href="#" target="_blank"><i className="bi bi-linkedin"></i></a> */}
                                        <a href="https://www.youtube.com/@USBestChickenBurger" target="_blank"><i className="bi bi-youtube"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 ps-xl-5 wow fadeInUp" data-wow-delay=".4s">
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <h3>Quick Links</h3>
                                </div>
                                <ul className="list-area">
                                    <li>
                                        <Link href="/about">
                                            <i className="bi bi-chevron-double-right"></i>
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/gallery">
                                            <i className="bi bi-chevron-double-right"></i>
                                            Our Gallery
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog">
                                            <i className="bi bi-chevron-double-right"></i>
                                            Our Blogs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/faq">
                                            <i className="bi bi-chevron-double-right"></i>
                                            FAQ’S
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact2">
                                            <i className="bi bi-chevron-double-right"></i>
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 ps-xl-5 wow fadeInUp" data-wow-delay=".4s">
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <h3>Our Menu</h3>
                                </div>
                                <ul className="list-area">
                                    <li>
                                        <Link href="/menu2?categoryId=60">
                                            <i className="bi bi-chevron-double-right"></i>
                                            BreakFast
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/menu2?categoryId=63">
                                            <i className="bi bi-chevron-double-right"></i>
                                            Chicken Wings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/menu2?categoryId=56">
                                            <i className="bi bi-chevron-double-right"></i>
                                            SandWiches
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/menu2?categoryId=62">
                                            <i className="bi bi-chevron-double-right"></i>
                                            Soul Food
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/menu2?categoryId=59">
                                            <i className="bi bi-chevron-double-right"></i>
                                            Rice Bowl
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 ps-xl-5 wow fadeInUp" data-wow-delay=".4s">
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <h3>Contact Us</h3>
                                </div>
                                <ul className="list-area">
                                    <li>
                                        <span className="text-theme-color2"> Monday – Sunday </span>
                                    </li>
                                    <li className="mb-2">
                                        <span className="text-theme-color2"> 6AM - 2AM </span>
                                    </li>
                                </ul>
                                <form className="mt-4">
                                    <div className="form-control">
                                        <input className="email" type="email" placeholder="Email for Subscription" />
                                        <button type="submit" className="submit-btn"><i className="bi bi-arrow-right"></i></button>
                                    </div>
                                    <div className="form-control style2 mt-3">
                                        <input id="checkbox" name="checkbox" type="checkbox" />
                                        <label htmlFor="checkbox">I agree to the <a href="#">Privacy Policy.
                                        </a></label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="footer-bottom">
            <div className="container">
                <div className="footer-wrapper d-flex align-items-center justify-content-between">
                    <p className="wow fadeInLeft" data-wow-delay=".3s">
                        © All Copyright 2024 by <a href="#">FreshEat</a>
                    </p>
                    <ul className="brand-logo wow fadeInRight" data-wow-delay=".5s">
                        <li>
                            <a className="text-white" href="#">
                                Terms & Condition
                            </a>
                        </li>
                        <li>
                            <a className="text-white" href="#">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div> */}
        </footer>
    );
};

export default Footer1;