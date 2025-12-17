"use client";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import Nav from "./Nav";
import { fetchMenu } from "../../../../utility/slice/GetcategorymenuSlice";
import { base_url, resturantId } from "../../../../utility/config";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button, Modal } from "react-bootstrap";
export default function Header1({ variant }) {
  const [isSticky, setIsSticky] = useState();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const handeltrack = async () => {
    const result = await dispatch(fetchMenu()).unwrap();
  }
  useEffect(() => {
    handeltrack();
    getCartData();
  }, []);

  const getCartData = async () => {
    try {
      let uuid = Cookies.get("uuid");
      let id_token = localStorage.getItem("id_token");
      const res = await axios.post(`${base_url}/api/GetCartItem`, {
        resturantId: resturantId,
        user_uuid: uuid,
        idToken: id_token,
      });

      const data = res?.data?.data;
      if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        setCartItems([]); // fallback if API returns weird data
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      setCartItems([]);
    }
  };
  const categories = useSelector((state) => state.menu.menuItems);
  const setCategoryId = (id) => {
    localStorage.setItem("categoryId", id);
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsSticky("cs-gescout_show cs-gescout_sticky");
      // if (currentScrollPos > prevScrollPos) {
      //   setIsSticky("cs-gescout_sticky"); // Scrolling down
      // } else if (currentScrollPos !== 0) {
      //   setIsSticky("cs-gescout_show cs-gescout_sticky"); // Scrolling up
      // } else {
      //   setIsSticky();
      // }
      setPrevScrollPos(currentScrollPos); // Update previous scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup the event listener
    };
  }, [prevScrollPos]);


  return (
    <Fragment>
      <div>
        <header
          className={`cs_site_header header_style_2 cs_style_1 header_sticky_style1 ${variant ? variant : ""
            } cs_sticky_header cs_site_header_full_width ${isSticky ? isSticky : ""
            }`}
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
                    <Image
                      src="/assets/img/header/open_late.png"
                      alt="img"
                      width={80}
                      height={80}
                    />
                  </Link>
                  <Link className="cs_site_branding" href="/">
                    <Image
                      src="/assets/img/logo/logo.png"
                      alt="img"
                      width={80}
                      height={80}
                    />
                  </Link>
                </div>
                <div className="cs_main_header_center">
                  <div className="cs_nav cs_primary_font fw-medium">
                    <Nav categories={categories} />
                  </div>
                </div>
                <div className="cs_main_header_right">
                  <div className="header-btn d-flex align-items-center">
                    <a href={'/shop/cart'}
                      className="cart-trigger cart-icon"
                    >
                      <i className="bi bi-cart"></i>
                      {/* {cartItems?.length > 0 && (
                        <span
                          style={{
                            position: "absolute",
                            top: "-7px",
                            right: "-8px",
                            width: "16px",
                            height: "16px",
                            lineHeight: "16px",
                            borderRadius: "50%",
                            backgroundColor: "var(--header)", // fallback to '#ff0000' or any color
                            color: "var(--white)", // fallback to '#ffffff'
                            fontSize: "12px",
                            textAlign: "center",
                            fontWeight: 500,
                          }}
                        >
                          {cartItems?.length !== undefined ? cartItems?.length : "0"}
                        </span>
                      )} */}
                    </a>
                    <a
                      onClick={() => setToggle(!toggle)}
                      className="menu-trigger menu-icon"
                    >
                      <i className="bi bi-list"></i>
                    </a>
                    <div className="main-button">
                      <Link href="/menu2" className="theme-btn">
                        ORDER NOW <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="cs_site_header_spacing_130"></div>
      </div>

      <Sidebar toggle={toggle} setToggle={setToggle} />
    </Fragment>

  );
}


const Sidebar = ({ toggle, setToggle }) => {

  // SideBar
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [routepath, setRoutepath] = useState("");

  const OrderHistory = async () => {
    setRoutepath("/orderhistory");
    const auth = getAuth();
    const user = await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        unsubscribe();
        resolve(firebaseUser);
      });
    });
    if (!user) {
      setShowLoginModal(true);
      return;
    } else {
      router.push("/orderhistory");
    }
  };

  const MyProfile = async () => {
    setRoutepath("/orderhistory");
    const auth = getAuth();
    const user = await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        unsubscribe();
        resolve(firebaseUser);
      });
    });
    if (!user) {
      setShowLoginModal(true);
      return;
    } else {
      router.push("/orderhistory");
    }
  };

  const handleFirebaseLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("userLog", "LoginUser");
      setUserMode("LoginUser");
      router.push(routepath);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <Fragment>
      <div className="fix-area">
        <div
          className={`offcanvas__info ${toggle ? "info-open" : ""}`}
        >
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

                <div
                  className="offcanvas__close"
                  onClick={() => setToggle(!toggle)}
                >
                  <button type="button">
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>

              <nav className="menu_ber">
                <ul className="main_menu">
                  <li className="subMenu_parent">
                    <Link className="singleMenu_link" href="/" onClick={() => setToggle(!toggle)}>
                      <div>Home</div>
                    </Link>
                  </li>

                  <li className="subMenu_parent">
                    <Link className="singleMenu_link" href="/menu2" onClick={() => setToggle(!toggle)}>
                      <div>Menu</div>
                      <i className="fa-solid fa-angle-down"></i>
                    </Link>
                  </li>

                  <li className="subMenu_parent">
                    <Link className="singleMenu_link" href="/delivery-partner" onClick={() => setToggle(!toggle)}>
                      <div>Delivery</div>
                    </Link>
                  </li>

                  <li className="subMenu_parent">
                    <Link className="singleMenu_link" href="/gallery" onClick={() => setToggle(!toggle)}>
                      <div>Gallery</div>
                    </Link>
                  </li>

                  <li className="subMenu_parent">
                    <Link className="singleMenu_link" href="/reservation" onClick={() => setToggle(!toggle)}>
                      <div>Catering</div>
                    </Link>
                  </li>

                  <li className="subMenu_parent">
                    <Link className="singleMenu_link" href="/contact2" onClick={() => setToggle(!toggle)}>
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
                      <i className="bi bi-geo-alt"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <a target="_blank" rel="noopener noreferrer" href="#">
                        7109 Martin Luther King Jr Hwy Unit A, North Englewood, <br />MD 20785
                      </a>
                    </div>
                  </li>

                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="mailto:info@fresheat.com">info@usbestchicken.com</a>
                    </div>
                  </li>

                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="bi bi-clock"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <a target="_blank" rel="noopener noreferrer" href="#">
                        Open 24 hours | Monday - Sunday
                      </a>
                    </div>
                  </li>

                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="bi bi-telephone"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="tel:+11002345909">+11002345909</a>
                    </div>
                  </li>
                </ul>


                <div className="header-button mt-4" style={{ cursor: "pointer" }}>
                  <div onClick={MyProfile} className="theme-btn">
                    <span className="button-content-wrapper d-flex align-items-center justify-content-center">
                      <span className="button-icon">
                        <i className="fa-sharp fa-regular fa-cart-shopping bg-transparent text-white me-2"></i>
                      </span>
                      <span className="button-text">My Profile</span>
                    </span>
                  </div>
                </div>

                <div className="header-button mt-4">
                  <Link href="/menu2" className="theme-btn">
                    <span className="button-content-wrapper d-flex align-items-center justify-content-center">
                      <span className="button-icon">
                        <i className="fa-sharp fa-regular fa-cart-shopping bg-transparent text-white me-2"></i>
                      </span>
                      <span className="button-text">ORDER NOW</span>
                    </span>
                  </Link>
                </div>



                <div className="header-button mt-4" style={{ cursor: "pointer" }}>
                  <div onClick={OrderHistory} className="theme-btn">
                    <span className="button-content-wrapper d-flex align-items-center justify-content-center">
                      <span className="button-icon">
                        <i className="fa-sharp fa-regular fa-cart-shopping bg-transparent text-white me-2"></i>
                      </span>
                      <span className="button-text">Order History</span>
                    </span>
                  </div>
                </div>

                <div className="social-icon d-flex align-items-center">
                  <a href="https://www.facebook.com/profile.php?id=61582703983853" target="_blank">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="https://x.com/usbestchicken" target="_blank">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="https://www.youtube.com/@USBestChickenBurger" target="_blank">
                    <i className="bi bi-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`offcanvas__overlay ${toggle ? "overlay-open" : ""
          }`}
        onClick={() => setToggle(!toggle)}
      ></div>

      {/* Modal */}
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
      >
        <Modal.Body className="login-modal-body text-center">
          <img
            src="https://i.ibb.co/mFPTyM16/Chat-GPT-Image-Jul-3-2025-01-29-11-PM-Photoroom.jpg"
            alt="Login Illustration"
            height={200}
            width={200}
          />
          <h5 className="modal-title-text">Do you want to login ?</h5>
          <p className="modal-subtext">
            If you log in, you will able to see your Transaction.
          </p>
          <div className="modal-button-group">
            {/* <Button variant="success" className="modal-btn guest" onClick={ContinueAsGuest}>
              Guest
            </Button> */}
            <Button
              variant="success"
              className="modal-btn login"
              onClick={handleFirebaseLogin}
            >
              Login
            </Button>
          </div>
        </Modal.Body>
      </Modal>

    </Fragment>
  )

}