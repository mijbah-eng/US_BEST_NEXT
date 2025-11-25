"use client"
import { useEffect, useState } from 'react';
import Nav from './Nav';
import Link from 'next/link';
import Image from 'next/image';
export default function Header1({ variant }) {
  const [mobileToggle, setMobileToggle] = useState(false);
  const [isSticky, setIsSticky] = useState();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [searchToggle, setSearchToggle] = useState(false);
  const [offcanvasToggle, setoffcanvasToggle] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > prevScrollPos) {
        setIsSticky('cs-gescout_sticky'); // Scrolling down
      } else if (currentScrollPos !== 0) {
        setIsSticky('cs-gescout_show cs-gescout_sticky'); // Scrolling up
      } else {
        setIsSticky();
      }
      setPrevScrollPos(currentScrollPos); // Update previous scroll position
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup the event listener
    };
  }, [prevScrollPos]);
console.log(offcanvasToggle);

  return (
    <div>

      <div className="fix-area">
                    <div className={`offcanvas__info ${offcanvasToggle ? 'info-open' : ''}`}>
                      <div className="offcanvas__wrapper">
                        <div className="offcanvas__content">
                          <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                            
                            <div className="offcanvas__logo">
                              <Link href="/">
                                <Image
                                  src="/assets/img/logo/logo.png"
                                  alt="logo-img"
                                  width={80}
                                  height={80}
                                />
                              </Link>
                            </div>

                            <div className="offcanvas__close" onClick={() => setoffcanvasToggle(!offcanvasToggle)}>
                              <button type="button">
                                <i className="bi bi-x-lg"></i>
                              </button>
                            </div>
                          </div>

                          <nav className="menu_ber">
                            <ul className="main_menu">

                              <li className="subMenu_parent">
                                <Link className="singleMenu_link" href="/">
                                  <div>Home</div>
                                </Link>
                              </li>

                              <li className="subMenu_parent">
                                <Link className="singleMenu_link" href="/menu">
                                  <div>Menu</div>
                                  <i className="fa-solid fa-angle-down"></i>
                                </Link>

                                <ul className="subMenu">
                                  <li className="singleMenu">
                                    <Link className="singleMenu_link" href="#">
                                      <div>Menu 1</div>
                                      <i className="fa-solid fa-angle-down"></i>
                                    </Link>
                                  </li>
                                </ul>
                              </li>

                              <li className="subMenu_parent">
                                <Link className="singleMenu_link" href="/delivery">
                                  <div>Delivery</div>
                                </Link>
                              </li>

                              <li className="subMenu_parent">
                                <Link className="singleMenu_link" href="/gallery">
                                  <div>Gallery</div>
                                </Link>
                              </li>

                              <li className="subMenu_parent">
                                <Link className="singleMenu_link" href="/contact">
                                  <div>Contact Us</div>
                                </Link>
                              </li>

                            </ul>
                          </nav>

                          <div className="mobile-menu fix mb-3"></div>

                          <div className="offcanvas__contact">
                            <h4>Contact Info</h4>
                            <ul>
                              <li className="d-flex align-items-center">
                                <div className="offcanvas__contact-icon">
                                  <i className="fal fa-map-marker-alt"></i>
                                </div>
                                <div className="offcanvas__contact-text">
                                  <a target="_blank" rel="noopener noreferrer" href="#">
                                    Main Street, Melbourne, Australia
                                  </a>
                                </div>
                              </li>

                              <li className="d-flex align-items-center">
                                <div className="offcanvas__contact-icon mr-15">
                                  <i className="fal fa-envelope"></i>
                                </div>
                                <div className="offcanvas__contact-text">
                                  <a href="mailto:info@fresheat.com">
                                    info@fresheat.com
                                  </a>
                                </div>
                              </li>

                              <li className="d-flex align-items-center">
                                <div className="offcanvas__contact-icon mr-15">
                                  <i className="fal fa-clock"></i>
                                </div>
                                <div className="offcanvas__contact-text">
                                  <a target="_blank" rel="noopener noreferrer" href="#">
                                    Mon-Friday, 09am - 05pm
                                  </a>
                                </div>
                              </li>

                              <li className="d-flex align-items-center">
                                <div className="offcanvas__contact-icon mr-15">
                                  <i className="far fa-phone"></i>
                                </div>
                                <div className="offcanvas__contact-text">
                                  <a href="tel:+11002345909">+11002345909</a>
                                </div>
                              </li>
                            </ul>

                            <div className="header-button mt-4">
                              <Link href="/menu" className="theme-btn">
                                <span className="button-content-wrapper d-flex align-items-center justify-content-center">
                                  <span className="button-icon">
                                    <i className="fa-sharp fa-regular fa-cart-shopping bg-transparent text-white me-2"></i>
                                  </span>
                                  <span className="button-text">ORDER NOW</span>
                                </span>
                              </Link>
                            </div>

                            <div className="header-button mt-4">
                              <Link href="/login" className="theme-btn">
                                <span className="button-content-wrapper d-flex align-items-center justify-content-center">
                                  <span className="button-icon">
                                    <i className="fa-sharp fa-regular fa-cart-shopping bg-transparent text-white me-2"></i>
                                  </span>
                                  <span className="button-text">Login</span>
                                </span>
                              </Link>
                            </div>

                            <div className="social-icon d-flex align-items-center">
                              <a href="#"><i className="fab fa-facebook-f"></i></a>
                              <a href="#"><i className="fab fa-twitter"></i></a>
                              <a href="#"><i className="fab fa-youtube"></i></a>
                              <a href="#"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
      </div>

      <div className={`offcanvas__overlay ${offcanvasToggle ?'overlay-open':''}`} onClick={() => setoffcanvasToggle(!offcanvasToggle)}></div>

    <header
      className={`cs_site_header header_style_2 cs_style_1 header_sticky_style1 ${
        variant ? variant : ''
      } cs_sticky_header cs_site_header_full_width ${
        mobileToggle ? 'cs_mobile_toggle_active' : ''
      } ${isSticky ? isSticky : ''}`}
    >
      {/* <div className="cs_top_header">
        <div className="container">
          <div className="cs_top_header_in">
            <div className="cs_top_header_left header-info">
              <ul className="cs_top_nav d-flex flex-wrap align-items-center cs_fs_12 text-white m-0 p-0">
                <li><i className="bi bi-geo-alt-fill"></i>New market Sandigo - California</li>
                <li><i className="bi bi-alarm"></i>9.00 am - 5.00 pm</li>
              </ul>
            </div>
            <div className="cs_top_header_right">
            <div className="cs_header_social_links_wrap">
                <div className="cs_header_social_links top-header-social-icon">
                Follow Us:
                  <ul>
                    <li><a href="#"><i className="bi bi-facebook"></i></a></li>
                    <li><a href="#"><i className="bi bi-twitter"></i></a></li>
                    <li><a href="#"><i className="bi bi-linkedin"></i></a></li>
                    <li><a href="#"><i className="bi bi-instagram"></i></a></li>
                </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>       */}

      <div className="cs_main_header">
        <div className="container">
          <div className="cs_main_header_in">
            <div className="cs_main_header_left">
              <Link className="cs_site_branding" href="/">
                <Image src="/assets/img/logo/logoWhite.svg" alt="img" width={167} height={58}   />
              </Link>
              </div>
              <div className="cs_main_header_center">
                <div className="cs_nav cs_primary_font fw-medium">
                  <span
                    className={
                      mobileToggle
                        ? 'cs-munu_toggle cs_teggle_active'
                        : 'cs-munu_toggle'
                    }
                    onClick={() => setMobileToggle(!mobileToggle)}
                  >
                    <span></span>
                  </span>
                  <Nav setMobileToggle={setMobileToggle} />
                </div>
            </div>
            <div className="cs_main_header_right">
              <div className="header-btn d-flex align-items-center">

              <a onClick={() => setSearchToggle(!searchToggle)} className="search-trigger search-icon"><i className="bi bi-search"></i></a>
              <a onClick={() => setoffcanvasToggle(!offcanvasToggle)} className="menu-trigger menu-icon"><i className="bi bi-list"></i></a>
                <div className="main-button">
                <Link href="/contact" className="theme-btn" >ORDER NOW <i className="bi bi-arrow-right"></i></Link>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div className={`search-wrap ${searchToggle ? 'active' : ''}`} >
            <div className="search-inner">
                <i onClick={() => setSearchToggle(!searchToggle)} className="bi bi-x-lg search-close" id="search-close"></i>
                <div className="search-cell">
                    <form method="get">
                        <div className="search-field-holder">
                            <input type="search" className="main-search-input" placeholder="Search..." />
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div className="cs_site_header_spacing_130"></div>

    </div>

  );
}
