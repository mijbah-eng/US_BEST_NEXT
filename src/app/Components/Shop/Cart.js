"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import basecatagories, { base_url, resturantId } from "../../../../utility/config";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getCartData();
    }, []);
    const calculateCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.menuPrice || item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            return total + price * quantity;
        }, 0);
    };

    const calculateTaxTotal = () => {
        let subtotal = cartItems.reduce((total, item) => {
            const price = parseFloat(item.menuPrice || item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            return total + price * quantity;
        }, 0);
        let taxAmount = (6 / 100) * subtotal;
        // let total = subtotal + taxAmount;
        return taxAmount;
    };

    const incrementQuantity = (index) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity = parseInt(newCartItems[index].quantity) + 1;
        setCartItems(newCartItems);
        UpdateCartData(newCartItems[index].quantity, newCartItems[index].cartId);
    };

    const decrementQuantity = (index) => {
        const newCartItems = [...cartItems];
        const currentQty = parseInt(newCartItems[index].quantity);
        if (currentQty > 1) {
            newCartItems[index].quantity = currentQty - 1;
            setCartItems(newCartItems);
            UpdateCartData(newCartItems[index].quantity, newCartItems[index].cartId);
        }
    };

    const removeItem = async (index) => {
        const newCartItems = [...cartItems];
        let uuid = Cookies.get("uuid");
        let cartId = newCartItems[index].cartId;
        let id_token = localStorage.getItem("id_token");

        Swal.fire({
            icon: "question",
            title: "Are you Sure?",
            text: "You want to remove this item from Cart.",
            confirmButtonText: "Ok.",
            cancelButtonText: "Cancel.",
        }).then(async (result) => {   // 👈 make this async
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const res = await axios.post(`${base_url}/api/deleteCartItem`, {
                        resturantId: resturantId,
                        user_uuid: uuid,
                        idToken: id_token,
                        cartId,
                    });
                    setLoading(false);
                    if (res.data?.status) {
                        Swal.fire({
                            icon: "success",
                            title: "Item Removed.",
                            text: res.data?.message,
                            confirmButtonText: "Ok.",
                        }).then(() => getCartData());
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Failed",
                            text: "Something went wrong. Please try again.",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.message || "Request failed",
                    });
                }
            }
        });
    };

    const getCartData = async () => {
        try {
            let uuid = Cookies.get("uuid");
            let id_token = localStorage.getItem("id_token");
            // setLoading(true);
            const res = await axios.post(`${base_url}/api/GetCartItem`, {
                resturantId: resturantId,
                user_uuid: uuid,
                idToken: id_token,
            });

            const data = res?.data?.data;
            // setLoading(false);
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
    const UpdateCartData = async (quantity, cartId) => {
        try {
            let uuid = Cookies.get("uuid");
            let id_token = localStorage.getItem("id_token");
            const res = await axios.post(`${base_url}/api/updateCartItemQuantity`, {
                resturantId: resturantId,
                user_uuid: uuid,
                idToken: id_token,
                quantity,
                cartId,
            });
            if (res.data?.status) {
                getCartData();
                // Swal.fire({
                //   icon: "success",
                //   title: "Cart Updated.",
                //   text: "Cart Item updated successfully.",
                //   confirmButtonText: "Ok.",
                // }).then((result) => {
                //   if (result.isConfirmed) {
                //     getCartData();
                //   }
                // });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: "Something went wrong. Please try again.",
                });
            }
        } catch (error) {
            console.error("Add to cart failed:", error);
            setCartItems([]);
        }
    };

    const getNonEmptyDetails = (details, key = "normal") => {
        const output = [];
        details = JSON.parse(details);
        // Define categories
        const normalCategories = [
            "fish",
            "side",
            "soda",
            "sauce",
            "style",
            "chrust",
            "topping",
            "ingredient",
            "meatpreparation",
            "Extracombotag",
        ];

        const extraCategories = [
            "Extrafish",
            "Extraside",
            "Extrasoda",
            "Extrasauce",
            "Extrastyle",
            "Extrachrust",
            "Extratopping",
            "Extraingredient",
            "Extrameatpreparation",
            "Extraextra",
        ];

        // Choose categories based on 'key' (normal or extra)
        const categories = key === "normal" ? normalCategories : extraCategories;

        // Loop through the categories
        categories.forEach((category) => {
            const categoryData = details[category];
            // Check if data exists and is a non-empty array
            if (Array.isArray(categoryData) && categoryData.length > 0) {
                const categoryItems = categoryData.map((item) => {
                    // Default item data
                    const name = item.toppingName || item.chrustName || item.ingredientName || item.styleName || item.fishName || item.meatpreparationName || item.sideName || item.extraName || item.sodaName || item.sauceName || item.combotagName || "Unnamed";
                    const type = item.type || "";
                    const price = item.price || "";
                    let description = `${name}`;

                    // Add type and price information if available
                    if (type) description += ` - ${type}`;
                    // if (key != "normal" && price) description += ` + $${price}`;
                    if ((key !== "normal" || category === "Extracombotag") && price) {
                        description += ` + $${price}`;
                    }
                    return description;
                });

                if (key != "normal") {
                    category = category.replace("Extra", "");
                }
                if (key === "normal") {
                    category = category.replace("Extra", "");
                    category = category.replace("tag", "");
                }
                // Join category data into output with category name
                output.push(`${capitalize(category)} - ${categoryItems.join(", ")}`);
            }
        });
        return output;
    };
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    return (
        <div className="th-cart-wrapper  section-padding fix bg-white">
            <div className="container">
                <form action="#" className="woocommerce-cart-form">
                    <table className="cart_table">
                        <thead>
                            <tr>
                                <th className="cart-col-image">Menu Image</th>
                                <th className="cart-colname">Menu Name</th>
                                <th className="cart-col-price">Price</th>
                                <th className="cart-col-quantity">Quantity</th>
                                <th className="cart-col-total">Total</th>
                                <th className="cart-col-remove">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(cartItems) && cartItems.length > 0 ? (
                                cartItems.map((item, index) => {
                                    const details =
                                        typeof item.details === "string"
                                            ? JSON.parse(item.details)
                                            : item.details;

                                    const normalDetails = getNonEmptyDetails(
                                        details,
                                        "normal"
                                    );
                                    const extraDetails = getNonEmptyDetails(
                                        details,
                                        "extra"
                                    );

                                    return (
                                        <tr className="cart_item">
                                            <td data-title="Product">
                                                <Link className="cartimage" href={`/shop/shop-details/${item?.menuId}`}>
                                                    <Image src={`${basecatagories}menu/${encodeURIComponent(item.image)}`} alt="img" width={91} height={91} />
                                                </Link>
                                            </td>
                                            <td data-title="Name">
                                                <Link className="cartname" href={`/shop/shop-details/${item?.menuId}`}>
                                                    {item.menuName}{" "}
                                                    <p style={{ fontSize: "15px" }}>
                                                        Size:{" "}
                                                        <sapn
                                                            style={{
                                                                fontSize: "15px",
                                                                color: "red",
                                                                fontWeight: "700",
                                                            }}
                                                        >
                                                            {item.sizeDetails}
                                                        </sapn>{" "}
                                                    </p>
                                                    <div>
                                                        {normalDetails.length > 0 && (
                                                            <p style={{ fontSize: "15px" }}>
                                                                {normalDetails.join(", ")}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        {extraDetails.length > 0 && (
                                                            <p style={{ fontSize: "15px" }}>
                                                                <b>Extra:</b> {extraDetails.join(", ")}
                                                            </p>
                                                        )}
                                                    </div>
                                                </Link>
                                            </td>
                                            <td data-title="Price">
                                                <span className="amount"><bdi><span>$</span>
                                                    {(parseFloat(item.menuPrice) || 0).toFixed(2)}
                                                </bdi></span>
                                            </td>
                                            <td data-title="Quantity">
                                                <div className="quantity">
                                                    <button className="quantity-minus qty-btn"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            decrementQuantity(index);
                                                        }}>
                                                        <i className="bi bi-dash-lg"></i>
                                                    </button>
                                                    <input type="number" className="qty-input" value={item?.quantity} min="1" max="99" readOnly />
                                                    <button className="quantity-plus qty-btn"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            incrementQuantity(index);
                                                        }}>
                                                        <i className="bi bi-plus-lg"></i>
                                                    </button>
                                                </div>
                                            </td>
                                            <td data-title="Total">
                                                <span className="amount"><bdi><span>$</span>
                                                    {((parseFloat(item.menuPrice) || 0) * (parseInt(item.quantity) || 0)).toFixed(2)}
                                                </bdi></span>
                                            </td>
                                            <td data-title="Remove">
                                                <a href="#" className="remove"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        removeItem(index);
                                                    }}>
                                                    <i className="bi bi-trash"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>
                                        Your cart is empty.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </form>
                <div className="wc-proceed-to-checkout">
                    <Link href="/menu2" className="theme-btn btn-addmore" style={{ marginTop: "0px" }}>Add More Item</Link>
                </div>
                <div className="row justify-content-end">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <h2 className="h4 summary-title">Cart Totals</h2>
                        <table className="cart_totals">
                            <tbody>
                                <tr>
                                    <td>Subtotal</td>
                                    <td data-title="Cart Subtotal">
                                        <span className="amount"><bdi><span>$</span>{calculateCartTotal().toFixed(2)}</bdi></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tax</td>
                                    <td data-title="Tax">
                                        <span className="amount"><bdi><span>$</span>{calculateTaxTotal().toFixed(2)}</bdi></span>
                                    </td>
                                </tr>

                            </tbody>
                            <tfoot>
                                <tr className="order-total">
                                    <td style={{ fontSize: "18px" }}>Order Total</td>
                                    <td data-title="Total">
                                        <strong><span className="amount" style={{ fontSize: "18px" }}><bdi><span>$</span>
                                            {(calculateCartTotal() + calculateTaxTotal()).toFixed(2)}
                                        </bdi></span></strong>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="wc-proceed-to-checkout mt-3">
                            <Link href="/shop/checkout" className="theme-btn btn-fw">Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;