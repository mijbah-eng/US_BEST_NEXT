"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const BestSelling4 = () => {
    const [isActive, setIsActive] = useState('FastFood');
    const foodItems = [
        {img:'/assets/img/dishes/dishes1_1.png', title:'Chicken Fried Rice', content:'The registration fee', price:'$100.99'},    
        {img:'/assets/img/dishes/dishes1_2.png', title:'Chinese Pasta', content:'The registration fee', price:'$15.99'},    
        {img:'/assets/img/dishes/dishes1_3.png', title:'Chicken Pizza', content:'The registration fee', price:'$26.99'},    
        {img:'/assets/img/dishes/dishes1_4.png', title:'Chicken Noodles', content:'The registration fee', price:'$39.00'},    
        {img:'/assets/img/dishes/dishes1_5.png', title:'Grilled Chicken', content:'The registration fee', price:'$20.99'},   
        {img:'/assets/img/dishes/dishes1_1.png', title:'Chicken Fried Rice', content:'The registration fee', price:'$100.99'},    
        {img:'/assets/img/dishes/dishes1_2.png', title:'Chinese Pasta', content:'The registration fee', price:'$15.99'},    
        {img:'/assets/img/dishes/dishes1_3.png', title:'Chicken Pizza', content:'The registration fee', price:'$26.99'},    
        {img:'/assets/img/dishes/dishes1_4.png', title:'Chicken Noodles', content:'The registration fee', price:'$39.00'},    
        {img:'/assets/img/dishes/dishes1_5.png', title:'Grilled Chicken', content:'The registration fee', price:'$20.99'},           
      ]; 

    return (
        <section className="popular-dishes-section fix section-padding">
        <div className="popular-dishes-wrapper style1">
            <div className="shape1 d-none d-xxl-block"><Image src="/assets/img/shape/popularDishesShape1_1.png" alt="img" width={164} height={183}   />
            </div>
            <div className="shape2 float-bob-y d-none d-xxl-block"><Image src="/assets/img/shape/popularDishesShape1_2.png" alt="img" width={239} height={149}   /></div>
            <div className="container">
                <div className="title-area best-selling-title">
                    <div className="sub-title text-center wow fadeInUp" data-wow-delay="0.5s">
                    <Image className="me-1" src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                        Foods Cetagory<Image className="ms-1"
                            src="/assets/img/icon/titleIcon.svg" alt="img" width={20} height={20}   />
                    </div>
                    {/* <h2 className="title wow fadeInUp" data-wow-delay="0.7s">
                        Best selling Dishes
                    </h2> */}
                </div>
                <div className="food-menu-tab">
                     <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                <li className={`nav-item ${isActive === 'FastFood' ? 'active' : ''}`} onClick={() => setIsActive('FastFood')} role="presentation">
                                                    <button className="nav-link" id="pills-FastFood-tab" data-bs-toggle="pill"
                                                        data-bs-target="#pills-FastFood" type="button" role="tab"
                                                        aria-controls="pills-FastFood" aria-selected="true"><Image src="/assets/img/menu/menuIcon1_1.png" alt="img" width={36} height={36}   />Fast Food</button>
                                                </li>
                                                <li className={`nav-item ${isActive === 'DrinkJuice' ? 'active' : ''}`} onClick={() => setIsActive('DrinkJuice')} role="presentation">
                                                    <button className="nav-link" id="pills-drinkJuice-tab" data-bs-toggle="pill"
                                                        data-bs-target="#pills-drinkJuice" type="button" role="tab"
                                                        aria-controls="pills-drinkJuice" aria-selected="false"><Image src="/assets/img/menu/menuIcon1_2.png" alt="img" width={36} height={36}   />Drink & Juice</button>
                                                </li>
                                                <li className={`nav-item ${isActive === 'ChickenPizza' ? 'active' : ''}`} onClick={() => setIsActive('ChickenPizza')} role="presentation">
                                                    <button className="nav-link" id="pills-chickenPizza-tab" data-bs-toggle="pill"
                                                        data-bs-target="#pills-chickenPizza" type="button" role="tab"
                                                        aria-controls="pills-chickenPizza" aria-selected="false"><Image src="/assets/img/menu/menuIcon1_3.png" alt="img" width={36} height={36}   />Chicken Pizza</button>
                                                </li>
                                                <li className={`nav-item ${isActive === 'FreshPasta' ? 'active' : ''}`} onClick={() => setIsActive('FreshPasta')}  role="presentation">
                                                    <button className="nav-link" id="pills-freshPasta-tab" data-bs-toggle="pill"
                                                        data-bs-target="#pills-freshPasta" type="button" role="tab"
                                                        aria-controls="pills-freshPasta" aria-selected="false"><Image src="/assets/img/menu/menuIcon1_4.png" alt="img" width={36} height={36}   />Fresh Pasta</button>
                                                </li>
                                            </ul>
                                            <div className="tab-content" id="pills-tabContent">
                                        <div className={`tab-pane ${isActive === 'FastFood' ? 'active' : ''}`} id="pills-FastFood" role="tabpanel"
                                                aria-labelledby="pills-FastFood-tab" tabIndex="0">

                                                <div className="food-title"><h2>FastFood</h2></div>

                                                <div className="dishes-card-wrap style1">
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

                                                </div>
                                    
                                                </div>
                                        <div className={`tab-pane ${isActive === 'DrinkJuice' ? 'active' : ''}`} id="pills-drinkJuice" role="tabpanel" aria-labelledby="pills-drinkJuice-tab" tabIndex="0">
                                            <div className="food-title"><h2>DrinkJuice</h2></div>
                                                <div className="dishes-card-wrap style1">
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
                                                    </div>
                                                </div>
                                        <div className={`tab-pane ${isActive === 'ChickenPizza' ? 'active' : ''}`}  id="pills-chickenPizza" role="tabpanel"
                                aria-labelledby="pills-chickenPizza-tab" tabIndex="0">
                                    <div className="food-title"><h2>ChickenPizza</h2></div>
                                <div className="dishes-card-wrap style1">
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
                </div>
                            </div>
                                            </div>
                </div>
                {/* <div className="dishes-card-wrap style1 best-selling-area">
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
                            <span className="plus-btn"> <Link href="#"> <i className="bi bi-heart"></i></Link></span>
                            <ul>
                                <li><Link href="/cart"><i className="bi bi-basket2"></i></Link></li>
                                <li><Link href="/cart"><i className="bi bi-eye"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                    ))}
                </div> */}
            </div>
        </div>

    </section>

    );
};

export default BestSelling4;