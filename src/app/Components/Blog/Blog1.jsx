"use client"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import basecatagories, { base_url, resturantId } from "../../../../utility/config";

const Blog1 = () => {

    const [blog, setBlog] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchBlog();
    }, []);

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${base_url}/api/GetBlog`, { resturantId: resturantId, });
            setBlog(response.data?.data || []);
            console.log('blog', response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching menu details:", error);
        }
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 3,
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

    const blogItems = [
        { img: '/assets/img/blog/blogThumb1_1.jpg', title: 'Fast Food Frenzy a Taste of Convenience' },
        { img: '/assets/img/blog/blogThumb1_2.jpg', title: 'Benefits of health and safety measures' },
        { img: '/assets/img/blog/blogThumb1_3.jpg', title: 'Quick Cravings Unraveling Fast Food Delights' },
        { img: '/assets/img/blog/blogThumb1_1.jpg', title: 'Fast Food Frenzy a Taste of Convenience' },
        { img: '/assets/img/blog/blogThumb1_2.jpg', title: 'Benefits of health and safety measures' },
        { img: '/assets/img/blog/blogThumb1_3.jpg', title: 'Quick Cravings Unraveling Fast Food Delights' },
    ];

    return (
        <section className="blog-section section-padding fix">
            <div className="burger-shape">
                <Image src="/assets/img/blog/burger-shape.png" alt="img" width={183} height={154} />
            </div>
            <div className="pizza-shape">
                <Image src="/assets/img/blog/pizza-shape.png" alt="img" width={142} height={90} />
            </div>
            <div className="blog-wrapper style1">
                <div className="container">
                    <div className="blog-card-wrap style1">
                        <div className="title-area">
                            <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                                <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20} />
                                LATEST NEWS<Image className="ms-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20} />
                            </div>
                            <h2 className="title wow fadeInUp" data-wow-delay="0.7s">
                                Our Latest Foods News
                            </h2>
                        </div>
                        <div className="slider-area">
                            <div className="swiper blogSliderOne">
                                <div className="swiper-wrapper cs_slider_gap_301">

                                    <Slider ref={sliderRef} {...settings}>
                                        {blog.map((item, i) => (
                                            <div key={i} className="swiper-slide">
                                                <div className="blog-card style1 wow fadeInUp" data-wow-delay="0.2s">
                                                    <div className="blog-thumb">
                                                        <Image src={`${basecatagories}blog/${encodeURIComponent(item?.image)}`} alt="img" width={408} height={265} />
                                                    </div>
                                                    <div className="blog-content">
                                                        <div className="blog-meta">
                                                            <div className="item1">
                                                                <p>
                                                                    {new Date(item?.createdOn).toLocaleDateString("en-GB", {
                                                                        day: "2-digit",
                                                                        month: "short",
                                                                        year: "numeric",
                                                                    })}
                                                                </p>
                                                            </div>
                                                            <div className="item2">
                                                                <div className="icon"><Image src="/assets/img/icon/user.svg" alt="img" width={20} height={20} /><span>By Admin</span></div>
                                                            </div>
                                                            {/* <div className="item3">
                                                                <div className="icon"><Image src="/assets/img/icon/tag.svg" alt="img" width={20} height={20} /><span>Noodles</span></div>
                                                            </div> */}
                                                        </div>
                                                        <Link href="/blog/blog-details">
                                                            <h3>{item.title}</h3>
                                                        </Link>
                                                        <Link href="/blog/blog-details" className="link-btn">
                                                            <span>Read More</span> <i className="bi bi-arrow-up-right"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>

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
        </section>
    );
};

export default Blog1;