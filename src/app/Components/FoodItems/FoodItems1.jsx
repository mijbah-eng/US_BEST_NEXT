"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import basecatagories, { base_url, resturantId } from "../../../../utility/config";

const FoodItems1 = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${base_url}/api/getDisplayMenu/${resturantId}`)
      .then((res) => {
        setMenuItems(res.data.data || []);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  const settings = {
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

  return (
    <section className="best-food-items-section fix section-padding bg-color2">
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
                <Slider {...settings}>
                  {menuItems?.map((item, i) => (
                    <div key={i} className="swiper-slide">
                      <div className="single-food-items">
                        <div className="item-thumb">
                          <img src={`${basecatagories}menu/${encodeURIComponent(item.image)}`} alt="thumb" height={163} width={162} />
                          <div className="circle-shape"><img className="cir36"
                            src="/assets/img/food-items/circleShape.png" alt="shape" /></div>
                        </div>
                        <div className="item-content">
                          <Link href="/menu">
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
  );
};

export default FoodItems1;