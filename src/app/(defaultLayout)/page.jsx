"use client"
import React, { Suspense, useEffect, useRef, useState } from 'react';
import HeroBanner1 from '../Components/HeroBanner/HeroBanner1';
import FoodItems1 from '../Components/FoodItems/FoodItems1';
import Offer1 from '../Components/Offer/Offer1';
import About1 from '../Components/About/About1';
import BestSelling1 from '../Components/BestSelling/BestSelling1';
import CtaBanner1 from '../Components/CtaBanner/CtaBanner1';
import FoodItem1 from '../Components/FoodItem/FoodItem1';
import Timer1 from '../Components/Timer/Timer1';
import Team1 from '../Components/Team/Team1';
import Testimonial1 from '../Components/Testimonial/Testimonial1';
import Blog1 from '../Components/Blog/Blog1';
import Gallery1 from '../Components/Gallery/Gallery1';
import Order from '../Components/Order/Order';
import axios from 'axios';
import basecatagories, { base_url, resturantId } from '../../../utility/config';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { mainmenu } from '../../../utility/slice/GetCategoryMenumain';
import DishesCard from '../Components/DishesCard/DishesCard';
import CategoryTab from '../Components/BestSelling/CategoryTab';
import VideoModal from '../Components/VideoModal/VideoModal';
import Cookies from 'js-cookie';
import dynamic from "next/dynamic";

const page = () => {
    const dispatch = useDispatch();
    const [bannerData, setBannerData] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    const [isActive, setIsActive] = useState("FastFood");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [item, setItem] = useState([]); // now stores categories with menu
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const menuRef = useRef(null);
    useEffect(() => {
        window.dispatchEvent(new Event("resize"));   // Re-render fix
    }, []);
    useEffect(() => {
        getBannerData();
        generateUUID();
        displaymeny();
    }, []);

    const getBannerData = async () => {
        try {
            const res = await axios.post(`${base_url}/api/GetBanner`, {
                resturantId: resturantId,
                page: "Home",
            });
            setBannerData(res.data?.data ?? []);
        } catch (error) {
            console.error("Failed to fetch banner:", error);
        }
    };
    const generateUUID = async () => {
        const existingUUID = Cookies.get('uuid');

        if (!existingUUID) {
            try {
                const response = await axios.get("https://admin.foodstek.com/api/generateUUID");
                if (response?.data) {
                    // Set the cookie if not already present
                    Cookies.set('uuid', response.data, {
                        expires: 30, // expires in 30 days
                        secure: true,
                        sameSite: 'Strict',
                    });
                }
            } catch (error) {
                console.error("UUID generation failed:", error);
            }
        } else {
        }
    };
    const bannersettings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                }
            }, {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    const heroContent = [
        {
            img: `${basecatagories}slider/${encodeURIComponent(bannerData[0]?.image)}`,
            subtitle: "You get fresh food. You get fast service. You get real flavor",
            title: "WELCOME TO US BEST CHICKEN",
            btnname: "ORDER NOW",
            url: "/menu2"
        },
        {
            img: `${basecatagories}slider/${encodeURIComponent(bannerData[0]?.image2)}`,
            subtitle: "Hot meals. Fresh ingredients. Fresh Breakfast to Serve.",
            title: "START YOUR DAY WITH OUS BREAKFAST",
            btnname: "ORDER NOW",
            url: "/menu2?categoryId=60"
        },
        {
            img: `${basecatagories}slider/${encodeURIComponent(bannerData[0]?.image3)}`,
            subtitle: "NASHVILLE STYLE SIGNATURE BURGER",
            title: "Try our Crispy. Juicy house burger",
            btnname: "ORDER NOW",
            url: "/menu2?categoryId=61"
        },
        {
            img: `${basecatagories}slider/${encodeURIComponent(bannerData[0]?.image4)}`,
            subtitle: "You get crispy wings and crispy chicken sandwiches in one place",
            title: "CHICKEN WINGS AND SANDWICHES",
            btnname: "ORDER NOW",
            url: "/menu2?categoryId=56"
        },
    ];

    const displaymeny = () => {
        axios.get(`${base_url}/api/getDisplayMenu/${resturantId}`)
            .then((res) => {
                setMenuItems(res.data.data || []);
            })
            .catch((err) => console.error("API Error:", err));
    };

    const popularfoodsettings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    // get categoryId from localStorage
    useEffect(() => {
        const handleUpdate = () => {
            const catId = localStorage.getItem("categoryId");
            setCategoryId(catId);
        };

        window.addEventListener("storageUpdate", handleUpdate);
        handleUpdate(); // run once on mount

        return () => {
            window.removeEventListener("storageUpdate", handleUpdate);
        };
    }, []);

    // Get query params from URL safely on client
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const catId = params.get("categoryId");
            setCategoryId(catId);
        }
    }, []);

    useEffect(() => {
        dispatch(mainmenu());
    }, [dispatch]);

    const { itemCategorymenu, loading } = useSelector((state) => state.itemCategorymenu);

    useEffect(() => {
        if (categoryId && itemCategorymenu.length > 0) {
            handleCategorySelect(categoryId);
        } else if (itemCategorymenu.length > 0) {
            allProductShow();
        }
    }, [categoryId, itemCategorymenu]);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategoryId(categoryId);
        const menudata = itemCategorymenu.find(
            (item) => item.categoryId == categoryId
        );
        if (menudata) {
            setSelectedCategory(menudata);
            setItem([
                {
                    categoryName: menudata.categoryName,
                    menu: menudata.menu || [],
                },
            ]);
        }
        scrollToMenu();
    };

    const scrollToMenu = () => {
        if (menuRef.current) {
            const offset = 120; // adjust based on header height
            const y = menuRef.current.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    const allProductShow = () => {
        setSelectedCategory(null);
        const allCategories = itemCategorymenu.map((cat) => ({
            categoryName: cat.categoryName,
            menu: cat.menu || [],
        }));
        setItem(allCategories);
    };
    const handleAddToCartClick = (product) => {
        const imageUrl = `${basecatagories}menu/${encodeURIComponent(
            product.image
        )}`;
        setSelectedProduct({ ...product, image: imageUrl });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const testimonialsettings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        autoplay: false,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                }
            }, {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    const sliderRef = useRef(null);
    const next = () => {
        sliderRef.current.slickNext();
    };
    const previous = () => {
        sliderRef.current.slickPrev();
    };
    const [iframeSrc, setIframeSrc] = useState('about:blank');
    const [toggle, setToggle] = useState(false);
    const handelClick = () => {
        setIframeSrc("https://www.youtube.com/embed/rRid6GCJtgc");
        setToggle(!toggle);
    };
    const handelClose = () => {
        setIframeSrc('about:blank');
        setToggle(!toggle);
    };
    const tesItems = [
        { img: '/assets/img/testimonial/testmonial_3.png', title: 'payam kazmi', designation: 'Web Designer', content: 'Love the design, the food, the people, everything.' },
        { img: '/assets/img/testimonial/testmonial_1.png', title: 'Charlie Jam', designation: 'Web Designer', content: 'Great soul food and the staff were very nice and professional.' },
        { img: '/assets/img/testimonial/testmonial_2.png', title: 'Muhammad Hossain', designation: 'Web Designer', content: 'We felt very homely atmosphere when dine in.' },
    ];
    return (
        <div className='bg-color2'>
            {/* <HeroBanner1></HeroBanner1> */}
            <section className="banner-section fix">
                <div className="slider-area">
                    <div className="swiper banner-slider">
                        <div className="swiper-wrapper">

                            <Slider {...bannersettings}>
                                {heroContent.map((item, i) => (
                                    <div key={i} className="swiper-slide">
                                        <div className="banner-wrapper style1 bg-img">
                                            <div className="shape1_1 d-none d-xxl-block" data-animation="slideInLeft" data-duration="2s"
                                                data-delay=".3s"><Image src="/assets/img/shape/bannerShape1_1.svg" alt="img" width={189} height={103} /></div>
                                            <div className="shape1_2 d-none d-xxl-block" data-animation="slideInLeft" data-duration="2s"
                                                data-delay=".3s"><Image src="/assets/img/shape/bannerShape1_2.svg" alt="img" width={189} height={209} /></div>
                                            <div className="shape1_3 d-none d-xxl-block" data-animation="slideInLeft" data-duration="3s"
                                                data-delay="2s"><Image src="/assets/img/shape/bannerShape1_3.svg" alt="img" width={182} height={137} /></div>
                                            <div className="shape1_4 d-none d-xxl-block" data-animation="slideInLeft" data-duration="2s"
                                                data-delay=".3s"><Image src="/assets/img/shape/bannerShape1_4.svg" alt="img" width={160} height={152} /></div>
                                            <div className="shape1_5 d-none d-xxl-block" data-animation="slideInLeft" data-duration="2s"
                                                data-delay=".3s"><Image src="/assets/img/shape/bannerShape1_5.svg" alt="img" width={115} height={137} /></div>
                                            <div className="shape1_6 d-none d-xxl-block cir36"><Image src="/assets/img/shape/bannerShape1_6.svg" alt="img" width={75} height={75} /></div>
                                            <div className="overlay"></div>
                                            <div className="banner-container">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-12 col-xxl-6">
                                                            <div className="banner-title-area">
                                                                <div className="banner-style1">
                                                                    <div className="section-title">
                                                                        <h1 className="title" data-animation="slideInRight"
                                                                            data-duration="2s" data-delay=".5s">
                                                                            {item.title}
                                                                        </h1>
                                                                        <h6 className="sub-title" data-animation="slideInRight"
                                                                            data-duration="2s" data-delay=".3s"> {item.subtitle} </h6>
                                                                        <Link className="theme-btn" href={item.url}
                                                                            data-animation="slideInRight" data-duration="2s"
                                                                            data-delay=".7s">{item.btnname} <i className="bi bi-arrow-right"></i></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-xl-6 d-none d-xxl-block">
                                                            <div className="banner-thumb-area" data-tilt data-animation="slideInRight"
                                                                data-duration="2s" data-delay=".9s">
                                                                <img src={item.img} alt="shape" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>

                        </div>

                        <div className="arrow-prev"><Image src="/assets/img/icon/arrowPrev.svg" alt="img" width={40} height={40} /></div>
                        <div className="arrow-next"><Image src="/assets/img/icon/arrowNext.svg" alt="img" width={40} height={40} /></div>
                        <div className="pagination-className swiper-pagination"></div>
                    </div>
                </div>
            </section>
            {/* <FoodItems1></FoodItems1> */}
            <section className="best-food-items-section fix section-padding bg-color2" style={{ padding: "50px 0px" }}>
                <div className="best-food-wrapper">
                    <div className="shape1 float-bob-y d-none d-xxl-block"><img src="/assets/img/shape/bestFoodItemsShape1_1.png"
                        alt="shape" /></div>
                    <div className="shape2 float-bob-x d-none d-xxl-block"><img src="/assets/img/shape/bestFoodItemsShape1_2.png"
                        alt="shape" /></div>
                    <div className="container">
                        <div className="title-area">
                            <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                                <img className="me-1" src="/assets/img/icon/titleIcon.svg" alt="icon" /> US Best <img
                                    src="/assets/img/icon/titleIcon.svg" alt="icon" />
                            </div>
                            <h2 className="title wow fadeInUp" data-wow-delay="0.7s">
                                Popular Food Items
                            </h2>
                        </div>
                        <div className="slider-area mb-n40">
                            <div className="swiper bestFoodItems-slider">
                                <div className="swiper-wrapper cs_slider_gap_301 food-slider-item">
                                    <Slider {...popularfoodsettings}>
                                        {menuItems?.map((item, i) => (
                                            <div key={i} className="swiper-slide">
                                                <div className="single-food-items">
                                                    <div className="item-thumb">
                                                        <img src={`${basecatagories}menu/${encodeURIComponent(item.image)}`} alt="thumb" height={163} width={162} />
                                                        {/* <div className="circle-shape"><img className="cir36"
                                                            src="/assets/img/food-items/circleShape.png" alt="shape" /></div> */}
                                                    </div>
                                                    <div className="item-content">
                                                        <Link href={{
                                                            pathname: "/shop/shop-details",
                                                            query: { menuId: item.menuId },
                                                        }}>
                                                            <h3>{item.menuName}</h3>
                                                        </Link>
                                                        <div className="text">{item.description}</div>
                                                        {/* <h6>{item.price}</h6> */}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                            <div className="bestFoodItems-pagination"></div>
                        </div>
                    </div>
                </div>
            </section>
            <Offer1></Offer1>
            <About1></About1>
            {/* <Suspense fallback={<div>Loading...</div>}>
                <BestSelling1></BestSelling1>
            </Suspense> */}
            <section className="popular-dishes-section fix section-padding">
                <div className="popular-dishes-wrapper style1">
                    <div className="shape1 d-none d-xxl-block">
                        <Image
                            src="/assets/img/shape/popularDishesShape1_1.png"
                            alt="img"
                            width={164}
                            height={183}
                        />
                    </div>
                    <div className="shape2 float-bob-y d-none d-xxl-block">
                        <Image
                            src="/assets/img/shape/popularDishesShape1_2.png"
                            alt="img"
                            width={239}
                            height={149}
                        />
                    </div>
                    <div className="container">
                        <div className="title-area">
                            <div
                                className="sub-title text-center wow fadeInUp"
                                data-wow-delay="0.5s"
                            >
                                <Image
                                    className="me-1"
                                    src="/assets/img/icon/titleIcon.svg"
                                    alt="img"
                                    width={20}
                                    height={20}
                                />
                                FOOD MENU
                                <Image
                                    className="ms-1"
                                    src="/assets/img/icon/titleIcon.svg"
                                    alt="img"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <h2 className="title wow fadeInUp" data-wow-delay="0.7s">
                                Fresheat Foods Menu
                            </h2>
                        </div>
                        <div className="food-menu-tab">
                            {/* tab */}
                            <CategoryTab
                                isActive={isActive}
                                setIsActive={setIsActive}
                                data={itemCategorymenu}
                                onCategorySelect={handleCategorySelect}
                                selectedCategoryId={selectedCategoryId}
                            />
                            {/* content */}
                            <div className="tab-content" ref={menuRef}>
                                {/* FAST FOOD */}
                                {item?.length > 0
                                    ? item.map((cat, catIndex) => (
                                        <div className={`tab-pane ${catIndex === 0 ? 'active' : ''}`} key={cat.categoryName}>
                                            <div className="food-title">
                                                <h2>{cat.categoryName}</h2>
                                            </div>

                                            <div className="dishes-card-wrap style1">
                                                {cat?.menu?.length > 0
                                                    ? cat.menu.map((item, index) => {
                                                        const imageUrl = `${basecatagories}menu/${encodeURIComponent(
                                                            item.image
                                                        )}`;

                                                        return (
                                                            <DishesCard
                                                                show={showModal}
                                                                handleClose={handleCloseModal}
                                                                product={selectedProduct}
                                                                item={item}
                                                                imageUrl={imageUrl}
                                                                key={index}
                                                                handleAddToCartClick={handleAddToCartClick}
                                                                setSelectedProduct={setSelectedProduct}
                                                            />
                                                        );
                                                    })
                                                    : "Data Not Found"}
                                            </div>
                                        </div>
                                    ))
                                    : "Category Not Found"}
                            </div>
                        </div>
                        {/* <div className="btn-wrapper  wow fadeInUp" data-wow-delay="0.9s">
                            <Link className="theme-btn" href="/menu2">
                                VIEW ALL ITEM <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div> */}
                    </div>
                </div>
            </section>
            <CtaBanner1></CtaBanner1>
            {/* <FoodItem1></FoodItem1> */}
            <Order></Order>
            {/* <Testimonial1></Testimonial1> */}
            <section className="testimonial-section fix bg-color3">
                <div className="testimonial-wrapper style1 section-padding ">
                    <div className="shape"><Image src="/assets/img/testimonial/what-client-says.png" alt="img" width={885} height={747} /></div>
                    <div className="shape2"><Image src="/assets/img/shape/testimonialShape1_1.png" alt="img" width={224} height={401} /></div>
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 d-flex align-items-center justify-content-center">
                                <div className="video-wrap cir36 ">
                                    <a onClick={handelClick} className="play-btn popup-video"><Image src="/assets/img/shape/player.svg" alt="img" width={152} height={152} /></a>
                                </div>
                            </div>
                            <div className="col-xl-7">
                                <div className="title-area">
                                    <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                                        <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20} />
                                        Testimonials<Image className="ms-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20} />
                                    </div>
                                    <h2 className="title text-white wow fadeInUp" data-wow-delay="0.7s">
                                        What our Clients Say
                                    </h2>
                                </div>
                                <div className="slider-area">
                                    <div className="swiper testmonialSliderOne">
                                        <div className="swiper-wrapper">
                                            <Slider ref={sliderRef} {...testimonialsettings}>
                                                {tesItems.map((item, i) => (
                                                    <div key={i} className="swiper-slide">
                                                        <div className="testimonial-card style1">
                                                            <div className="testimonial-header">
                                                                <div className="fancy-box">
                                                                    <div className="item1"><Image src={item.img} alt="img" width={100} height={100} /></div>
                                                                    <div className="item2">
                                                                        <h6>{item.title}</h6>
                                                                        {/* <p>{item.designation}</p> */}
                                                                        <div className="icon"><Image src="/assets/img/icon/star.svg" alt="img" width={108} height={20} /></div>
                                                                    </div>
                                                                    <div className="quote"><Image src="/assets/img/icon/quote.svg" alt="img" width={50} height={37} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <p>{item.content}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btn-wrap">
                        <div onClick={previous} className="arrow-prev"><i className="bi bi-arrow-left"></i></div>
                        <div onClick={next} className="arrow-next"><i className="bi bi-arrow-right"></i></div>
                    </div>
                </div>

                <div className="marquee-wrapper style-2 text-slider section-padding">
                    <div className="marquee-inner to-left">
                        <ul className="marqee-list d-flex">
                            <li className="marquee-item style-2">
                                <span className="text-slider"></span><span className="text-slider text-style">chicken pizza</span>
                                <span className="text-slider"></span><span className="text-slider text-style">GRILLED CHICKEN</span>
                                <span className="text-slider"></span><span className="text-slider text-style">BURGER</span>
                                <span className="text-slider"></span><span className="text-slider text-style">CHICKEN PIZZA</span>
                                <span className="text-slider"></span><span className="text-slider text-style">FRESH PASTA</span>
                                <span className="text-slider"></span><span className="text-slider text-style">ITALIANO FRENCH FRY</span>
                                <span className="text-slider"></span><span className="text-slider text-style">CHICKEN FRY</span>
                                <span className="text-slider"></span><span className="text-slider text-style">chicken pizza</span>
                                <span className="text-slider"></span><span className="text-slider text-style">GRILLED CHICKEN</span>
                                <span className="text-slider"></span><span className="text-slider text-style">BURGER</span>
                                <span className="text-slider"></span><span className="text-slider text-style">CHICKEN PIZZA</span>
                                <span className="text-slider"></span><span className="text-slider text-style">FRESH PASTA</span>
                                <span className="text-slider"></span><span className="text-slider text-style">ITALIANO FRENCH FRY</span>
                                <span className="text-slider"></span><span className="text-slider text-style">CHICKEN FRY</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <VideoModal
                    isTrue={toggle}
                    iframeSrc={iframeSrc}
                    handelClose={handelClose}
                ></VideoModal>
            </section>
            <Blog1></Blog1>
            <Gallery1></Gallery1>
        </div>
    );
};

export default page;