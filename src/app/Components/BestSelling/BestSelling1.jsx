"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Slider from "react-slick";
import DishesCard from "../DishesCard/DishesCard";

const BestSelling1 = () => {
    const [isActive, setIsActive] = useState('FastFood');
    const tabs = [
    { key: "FastFood", title: "Fast Food", img: "/assets/img/menu/menuIcon1_1.png" },
    { key: "DrinkJuice", title: "Drink & Juice", img: "/assets/img/menu/menuIcon1_2.png" },
    { key: "ChickenPizza", title: "Chicken Pizza", img: "/assets/img/menu/menuIcon1_3.png" },
    { key: "FreshPasta", title: "Fresh Pasta", img: "/assets/img/menu/menuIcon1_4.png" },
  ];
    const foodItems = [
        {img:'/assets/img/dishes/dishes1_1.png', title:'Chicken Fried Rice', content:'The registration fee', price:'$100.99'},    
        {img:'/assets/img/dishes/dishes1_2.png', title:'Chinese Pasta', content:'The registration fee', price:'$15.99'},    
        {img:'/assets/img/dishes/dishes1_3.png', title:'Chicken Pizza', content:'The registration fee', price:'$26.99'},    
        {img:'/assets/img/dishes/dishes1_4.png', title:'Chicken Noodles', content:'The registration fee', price:'$39.00'},    
        {img:'/assets/img/dishes/dishes1_5.png', title:'Grilled Chicken', content:'The registration fee', price:'$20.99'},    
      ]; 
const settings = {
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
              slidesToShow: 4,
            }
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 2,
            }
          },{
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      }; 
    return (
        <section className="popular-dishes-section fix section-padding">
        <div className="popular-dishes-wrapper style1">
            <div className="shape1 d-none d-xxl-block"><Image src="/assets/img/shape/popularDishesShape1_1.png" alt="img" width={164} height={183}   />
            </div>
            <div className="shape2 float-bob-y d-none d-xxl-block"><Image src="/assets/img/shape/popularDishesShape1_2.png" alt="img" width={239} height={149}   /></div>
            <div className="container">
                <div className="title-area">
                    <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                    <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                        FOOD MENU<Image className="ms-1"
                            src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                    </div>
                    <h2 className="title wow fadeInUp" data-wow-delay="0.7s">
                        Fresheat Foods Menu 
                    </h2>
                </div>
                <div className="food-menu-tab">
                    {/* tab */}
    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">

        <li
          className={`nav-item ${isActive === "FastFood" ? "active" : ""}`}
          onClick={() => setIsActive("FastFood")}
        >
          <button className="nav-link">
            <Image src="/assets/img/menu/menuIcon1_1.png" alt="img" width={36} height={36} />
            Fast Food
          </button>
        </li>

        <li
          className={`nav-item ${isActive === "DrinkJuice" ? "active" : ""}`}
          onClick={() => setIsActive("DrinkJuice")}
        >
          <button className="nav-link">
            <Image src="/assets/img/menu/menuIcon1_2.png" alt="img" width={36} height={36} />
            Drink & Juice
          </button>
        </li>

        <li
          className={`nav-item ${isActive === "ChickenPizza" ? "active" : ""}`}
          onClick={() => setIsActive("ChickenPizza")}
        >
          <button className="nav-link">
            <Image src="/assets/img/menu/menuIcon1_3.png" alt="img" width={36} height={36} />
            Chicken Pizza
          </button>
        </li>

        <li
          className={`nav-item ${isActive === "FreshPasta" ? "active" : ""}`}
          onClick={() => setIsActive("FreshPasta")}
        >
          <button className="nav-link">
            <Image src="/assets/img/menu/menuIcon1_4.png" alt="img" width={36} height={36} />
            Fresh Pasta
          </button>
        </li>
        {/* <Slider {...settings}>
                        {tabs.map((tab, i) => (
                            <li
                            className={`nav-item ${isActive === tab.key ? "active" : ""}`}
                            onClick={() => setIsActive(tab.key)}
                            role="presentation" key={i}
                            >
                            <button className="nav-link">
                                <Image src={tab.img} alt="icon" width={36} height={36} />
                                {tab.label}
                            </button>
                            </li>
                        ))}
      </Slider> */}
      {/* <Slider {...settings}>
        {tabs.map((tab, i) => (
            <li
              className={`nav-item ${isActive === tab.key ? "active" : ""}`}
              onClick={() => setIsActive(tab.key)}
              role="presentation" key={i}
            >
              <button className="nav-link">
                <Image src={tab.icon} alt="icon" width={36} height={36} />
                {tab.label}
              </button>
            </li>
        ))}
      </Slider> */}

      </ul>
                    {/* content */}
                                           <div className="tab-content">

    {/* FAST FOOD */}
    {isActive === 'FastFood' && (
        <div className="tab-pane active">
            <div className="food-title"><h2>FastFood</h2></div>

            <div className="dishes-card-wrap style1">
                {foodItems.map((item, index) => (
                    <DishesCard item={item} key={index} />
                ))}
            </div>
        </div>
    )}

    {/* DRINK JUICE */}
    {isActive === 'DrinkJuice' && (
        <div className="tab-pane active">
            <div className="food-title"><h2>Drink & Juice</h2></div>

            <div className="dishes-card-wrap style1">
                {foodItems.map((item, i) => (
                    <div key={i} className="dishes-card style1">
                        <div className="dishes-thumb">
                            <Image src={item.img} alt="img" width={158} height={158} />
                        </div>

                        <Link href="/menu"><h3>{item.title}</h3></Link>
                        <p>{item.content}</p>
                        <h6>{item.price}</h6>

                        <div className="social-profile">
                            <span className="plus-btn">
                                <Link href="/shop/wishlist"><i className="bi bi-heart"></i></Link>
                            </span>
                            <ul>
                                <li><Link href="/shop/cart"><i className="bi bi-basket2"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )}

    {/* CHICKEN PIZZA */}
    {isActive === 'ChickenPizza' && (
        <div className="tab-pane active">
            <div className="food-title"><h2>Chicken Pizza</h2></div>

            <div className="dishes-card-wrap style1">
                {foodItems.map((item, i) => (
                    <div key={i} className="dishes-card style1">
                        <div className="dishes-thumb">
                            <Image src={item.img} alt="img" width={158} height={158} />
                        </div>

                        <Link href="/menu"><h3>{item.title}</h3></Link>
                        <p>{item.content}</p>
                        <h6>{item.price}</h6>

                        <div className="social-profile">
                            <span className="plus-btn">
                                <Link href="/shop/wishlist"><i className="bi bi-heart"></i></Link>
                            </span>
                            <ul>
                                <li><Link href="/shop/cart"><i className="bi bi-basket2"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )}

</div>

                </div>
                {/* <div className="dishes-card-wrap style1">

                {foodItems.map((item, i) => (
                    <div key={i} className="dishes-card style1 wow fadeInUp" data-wow-delay="0.2s">
                        <div className="dishes-thumb">
                        <Image src={item.img} alt="img" width={158} height={158}   />
                        </div>
                        <Link href="/menu">
                            <h3>{item.title}</h3>
                        </Link>
                        <p>{item.content}</p>
                        <h6>{item.price}</h6>
                        <div className="social-profile">
                            <span className="plus-btn"> <Link href="/shop/wishlist"> <i className="bi bi-heart"></i></Link></span>
                            <ul>
                                <li><Link href="/shop/cart"><i className="bi bi-basket2"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                    ))}
                </div> */}
                <div className="btn-wrapper  wow fadeInUp" data-wow-delay="0.9s">
                    <Link className="theme-btn" href="/menu2">VIEW ALL ITEM <i className="bi bi-arrow-right"></i></Link>
                </div>
            </div>
        </div>

    </section>

    );
};

export default BestSelling1;