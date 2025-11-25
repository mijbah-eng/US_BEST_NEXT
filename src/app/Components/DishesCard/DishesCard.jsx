"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function DishesCard({item}) {
    const [modelShow, setModelShow] = useState(false)
    return ( 
        <div className="dishes-card style1">
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
                                <li><span className="" onClick={() => setModelShow(true)}><i class="bi bi-eye"></i></span></li>
                            </ul>
                        </div>

                        <div className="modal fade show" style={{display: modelShow ? "block" : ""}}  >
                            <div className="modal-dialog  modal-dialog-centered">
                                <div className="modal-content pb-3 pe-3">
                                    <div className="modal-header border-0">
                                        <button className="btn-close" type="button" dismiss="modal" onClick={() => setModelShow(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="container modal_data">
                                            <div className="row gy-5">
                                                <div className="col-xxl-5 col-md-12 col-sm-12">
                                                    <div className="modal-thumb">
                                                        <div className="product-big-img bg-color2">
                                                            <div className="dishes-thumb">
                                                                <Image width={200} height={200} src={"/public/assets/img/menu/menuThumb2_6.png"} alt="thumb" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-details">
                                                        <div className="product-about">
                                                            <div className="title-wrapper">
                                                                <h2 className="product-title">3 pcs Chicken Tender</h2>
                                                                <div className="price">$  7.99 - $ 7.99  </div>
                                                            </div>
                                                            <p className="text">Choose your spice level</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xxl-7 col-md-12 col-sm-12">
                                                    <h2>Item Options</h2>
                                                    <p>Required - Choose one.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className={`model-overlay ${modelShow ? "overlay-open" : ""}`} onClick={() => setModelShow(false)}></div> */}
        </div>
     );
}

export default DishesCard;