"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import basecatagories, { base_url, resturantId } from "../../../../utility/config";
import AddToCartModal from "../DishesCard/AddToCartModal";
import Swal from "sweetalert2";

const ShopDetails = () => {
    const [menuId, setMenuId] = useState("");
    const [menu, setMenu] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [relatedMenu, setRelatedMenu] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [popupImage, setPopupImage] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const catId = params.get("menuId");
            setMenuId(catId);
        }
    }, []);

    useEffect(() => {
        if (menuId) {
            fetchMenuDetails();
        }
    }, [menuId, relatedMenu]);

    const fetchMenuDetails = async () => {
        try {
            const response = await axios.post(`${base_url}/api/getMenuDetails`, {
                resturantId: resturantId,
                menuId: menuId,
            });
            setMenu(response.data?.menu || {});
            setCurrentDate(response.data?.dateTime || null);
            const res = await axios.post(`${base_url}/api/GetMenubyCategory`, {
                resturantId: resturantId,
                categoryId: response.data?.menu.categoryId,
            });
            const filteredData = res.data?.data.filter(
                (item) => item.menuId != menuId
            );
            setRelatedMenu(filteredData);
        } catch (error) {
            console.error("Error fetching menu details:", error);
        }
    };

    const isTimeWithinRange = (startTime, endTime, currentDateTime) => {
        // ✅ If time restriction not set → allow
        if (!startTime || !endTime) {
            return true;
        }
        // extract HH:mm from times
        const toMinutes = (time) => {
            const [h, m] = time.split(":").map(Number);
            return h * 60 + m;
        };

        const currentTime = currentDateTime.split(" ")[1].slice(0, 5); // HH:mm

        const startMinutes = toMinutes(startTime);
        const endMinutes = toMinutes(endTime);
        const currentMinutes = toMinutes(currentTime);

        return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    };

    const handleaddcartvalidation = () => {

        /* ---------- Category Time VALIDATION ---------- */
        const iscatValid = isTimeWithinRange(
            menu.CatStart,
            menu.CatEnd,
            currentDate
        );

        if (!iscatValid) {
            Swal.fire({
                icon: "warning",
                title: `This Menu is available between ${menu.CatStart} and ${menu.CatEnd}`,
            });
            return;
        }

        /* ---------- DAY VALIDATION ---------- */

        // ✅ No day restriction → allow
        // Safe JSON parse
        const DAY_MAP = {
            sun: "Sunday",
            mon: "Monday",
            tue: "Tuesday",
            wed: "Wednesday",
            thu: "Thursday",
            fri: "Friday",
            sat: "Saturday",
        };
        let availableDays = [];
        try {
            availableDays = JSON.parse(menu?.available_days ?? "[]");
        } catch (e) {
            availableDays = [];
        }
        if (Array.isArray(availableDays) && availableDays.length > 0) {
            const date = new Date(
                currentDate.replace(" ", "T") + "-05:00" // America/New_York
            );

            const today = date
                .toLocaleDateString("en-US", {
                    weekday: "short",
                    timeZone: "America/New_York",
                })
                .toLowerCase();

            if (!availableDays.includes(today)) {
                const readableDays = availableDays
                    .map(day => DAY_MAP[day] || day)
                    .join(", ");
                Swal.fire({
                    icon: "warning",
                    title: `This item is available only on ${readableDays}`,
                });
                return false;
            }
        }
        /* ---------- Menu Time VALIDATION ---------- */
        const ismenuValid = isTimeWithinRange(
            menu.start_time,
            menu.end_time,
            currentDate
        );
        if (!ismenuValid) {
            Swal.fire({
                icon: "warning",
                title: `This Menu is available between ${menu.start_time} and ${menu.end_time}`,
            });
            return;
        }

        handleAddToCartClick(menu);
        setShowModal(true);
    }

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

    const imageUrl = `${basecatagories}menu/${encodeURIComponent(menu.image)}`;
    let priceDisplay = "";
    if (menu.price) {
        priceDisplay = `$${menu.price}`;
    } else {
        try {
            const priceArray = menu.customeType;
            if (priceArray?.length > 1) {
                priceDisplay = `$${priceArray[0].cprice} - $${priceArray[priceArray.length - 1].cprice}`;
            } else {
                priceDisplay = `$${priceArray?.[0]?.cprice}`;
            }
        } catch (err) {
            priceDisplay = "Price not available";
        }
    }
    return (
        <div className="shop-details-section section-padding pb-0 fix">
            <div className="shop-details-wrapper style1">
                <div className="container">
                    <div className="shop-details bg-white">
                        <div className="container">
                            <div className="row gx-60">
                                <div className="col-lg-6">
                                    <div className="product-big-img bg-color2">
                                        <div className="dishes-thumb">
                                            <Image src={imageUrl} alt="img" width={304} height={302} />
                                            {/* <div className="circle-shape d-none d-md-block"> <Image className="cir36"
                                                src="/assets/img/food-items/circleShape2.png" alt="img" width={324} height={324} /></div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="product-about">
                                        <div className="title-wrapper">
                                            <h2 className="product-title">{menu.menuName}</h2>
                                            <div className="price">{priceDisplay}</div>
                                        </div>
                                        <p className="text"></p>

                                        <div className="actions">
                                            {/* <div className="quantity">
                                                <p>Quantity</p>

                                                <div className="qty-wrapper">
                                                    <input type="number" className="qty-input" step="1" min="1" max="100"
                                                        name="quantity" value="1" title="Qty" />
                                                    <button className="quantity-plus qty-btn"><i className="bi bi-plus-lg"></i></button>
                                                    <button className="quantity-minus qty-btn"><i className="bi bi-dash-lg"></i></button>
                                                </div>
                                            </div> */}
                                            <span className="theme-btn cart-btn0"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleaddcartvalidation();
                                                }}>Add to Cart <i className="bi bi-basket3-fill bg-transparent text-white"></i></span>
                                        </div>
                                        <div className="share">
                                            <h6>share with friends</h6>
                                            <ul className="social-media">
                                                <li> <a href="https://www.facebook.com"> <i className="bi bi-facebook"></i> </a> </li>
                                                <li> <a href="https://www.youtube.com"><i className="bi bi-youtube"></i>
                                                </a> </li>
                                                <li> <a href="https://www.x.com"> <i className="bi bi-twitter-x"></i> </a>
                                                </li>
                                                <li> <a href="https://www.linkedin.com"> <i className="bi bi-linkedin"></i> </a> </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="product-description">
                                        <h3>product Description</h3>
                                        <div className="desc">
                                            <p>{menu.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <AddToCartModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    product={selectedProduct}
                />
            )}
        </div>

    );
};

export default ShopDetails;