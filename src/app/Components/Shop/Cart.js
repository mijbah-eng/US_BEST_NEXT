import Image from "next/image";
import Link from "next/link";

const Cart = () => {
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
                        <tr className="cart_item">
                            <td data-title="Product">
                                <Link className="cartimage" href="/shop/shop-details"> <Image src="/assets/img/dishes/dishes4_1.png" alt="img" width={91} height={91}   /></Link>
                            </td>
                            <td data-title="Name">
                                <Link className="cartname" href="/shop/shop-details">Brick Oven Pepperoni</Link>
                            </td>
                            <td data-title="Price">
                                <span className="amount"><bdi><span>$</span>18</bdi></span>
                            </td>
                            <td data-title="Quantity">
                                <div className="quantity">
                                    <button className="quantity-minus qty-btn"><i className="bi bi-dash-lg"></i></button>
                                    <input type="number" className="qty-input" value="1" min="1" max="99" />
                                    <button className="quantity-plus qty-btn"><i className="bi bi-plus-lg"></i></button>
                                </div>
                            </td>
                            <td data-title="Total">
                                <span className="amount"><bdi><span>$</span>18</bdi></span>
                            </td>
                            <td data-title="Remove">
                                <a href="#" className="remove"><i className="bi bi-trash"></i></a>
                            </td>
                        </tr>
                        <tr className="cart_item">
                            <td data-title="Product">
                                <Link className="cartimage" href="/shop/shop-details"><Image src="/assets/img/dishes/dishes4_2.png" alt="img" width={91} height={91}   /></Link>
                            </td>
                            <td data-title="Name">
                                <Link className="cartname" href="/shop/shop-details">Cheese Hand-Pizza</Link>
                            </td>
                            <td data-title="Price">
                                <span className="amount"><bdi><span>$</span>18</bdi></span>
                            </td>
                            <td data-title="Quantity">
                                <div className="quantity">
                                <button className="quantity-minus qty-btn"><i className="bi bi-dash-lg"></i></button>
                                    <input type="number" className="qty-input" value="1" min="1" max="99" />
                                    <button className="quantity-plus qty-btn"><i className="bi bi-plus-lg"></i></button>
                                </div>
                            </td>
                            <td data-title="Total">
                                <span className="amount"><bdi><span>$</span>18</bdi></span>
                            </td>
                            <td data-title="Remove">
                                <a href="#" className="remove"><i className="bi bi-trash"></i></a>
                            </td>
                        </tr>
                        <tr className="cart_item">
                            <td data-title="Product">
                                <Link className="cartimage" href="/shop/shop-details"><Image src="/assets/img/dishes/dishes4_3.png" alt="img" width={91} height={91}   /></Link>
                            </td>
                            <td data-title="Name">
                                <Link className="cartname" href="/shop/shop-details">Over Loaded Vegan</Link>
                            </td>
                            <td data-title="Price">
                                <span className="amount"><bdi><span>$</span>18</bdi></span>
                            </td>
                            <td data-title="Quantity">
                                <div className="quantity">
                                <button className="quantity-minus qty-btn"><i className="bi bi-dash-lg"></i></button>
                                    <input type="number" className="qty-input" value="1" min="1" max="99" />
                                    <button className="quantity-plus qty-btn"><i className="bi bi-plus-lg"></i></button>
                                </div>
                            </td>
                            <td data-title="Total">
                                <span className="amount"><bdi><span>$</span>18</bdi></span>
                            </td>
                            <td data-title="Remove">
                                <a href="#" className="remove"><i className="bi bi-trash"></i></a>
                            </td>
                        </tr>
                        <tr className="cart_item">
                            <td data-title="Product">
                                <Link className="cartimage" href="/shop/shop-details"><Image src="/assets/img/dishes/dishes4_4.png" alt="img" width={91} height={91}   /></Link>
                            </td>
                            <td data-title="Name">
                                <Link className="cartname" href="/shop/shop-details">Chicken Leg Piece</Link>
                            </td>
                            <td data-title="Price">
                                <span className="amount"><bdi><span>$</span>18</bdi></span>
                            </td>
                            <td data-title="Quantity">
                                <div className="quantity">
                                <button className="quantity-minus qty-btn"><i className="bi bi-dash-lg"></i></button>
                                    <input type="number" className="qty-input" value="1" min="1" max="99" />
                                    <button className="quantity-plus qty-btn"><i className="bi bi-plus-lg"></i></button>
                                </div>
                            </td>
                            <td data-title="Total">
                                <span className="amount"><bdi><span>$</span>18</bdi></span>
                            </td>
                            <td data-title="Remove">
                                <a href="#" className="remove"><i className="bi bi-trash"></i></a>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="6" className="actions">
                                <div className="th-cart-coupon">
                                    <input type="text" className="form-control" placeholder="Coupon Code..." />
                                    <button type="submit" className="theme-btn">Apply Coupon</button>
                                </div>

                                <Link href="/shop/cart" className="theme-btn cart-btn0">Update cart</Link>
                                <Link href="/shop" className="theme-btn">Continue Shopping</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div className="row justify-content-end">
                <div className="col-md-8 col-lg-7 col-xl-6">
                    <h2 className="h4 summary-title">Cart Totals</h2>
                    <table className="cart_totals">
                        <tbody>
                            <tr>
                                <td>Subtotal</td>
                                <td data-title="Cart Subtotal">
                                    <span className="amount"><bdi><span>$</span>47</bdi></span>
                                </td>
                            </tr>
                            <tr>
                                <td>Tax</td>
                                <td data-title="Tax">
                                    <span className="amount"><bdi><span>$</span>1.06</bdi></span>
                                </td>
                            </tr>
                            
                        </tbody>
                        <tfoot>
                            <tr className="order-total">
                                <td>Order Total</td>
                                <td data-title="Total">
                                    <strong><span className="amount"><bdi><span>$</span>48.6</bdi></span></strong>
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