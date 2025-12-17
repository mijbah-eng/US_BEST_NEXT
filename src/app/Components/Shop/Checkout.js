"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { base_url, resturantId } from "../../../../utility/config";
import axios from "axios";
import Swal from "sweetalert2";
import { auth } from "../../../../utility/firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button, Modal } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie";


const Checkout = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [billingType, setBillingType] = useState("Pickup");
    const [loading, setLoading] = useState(false);

    const [userMode, setUserMode] = useState(null); // Guest or LoginUser
    const [user, setUser] = useState(null); // Guest or LoginUser


    // ✅ Check login mode from localStorage
    useEffect(() => {
        const mode = localStorage.getItem("userLog");
        setUserMode(mode);

        if (mode === "LoginUser") {
            fetchUserDetails();
        }
    }, []);

    useEffect(() => {
        getCartData();
    }, []);

    const getCartData = async () => {
        try {
            const uuid = Cookies.get("uuid");
            const id_token = localStorage.getItem("id_token");
            const res = await axios.post(`${base_url}/api/GetCartItem`, {
                resturantId: resturantId,
                user_uuid: uuid,
                idToken: id_token,
            });

            const data = res?.data?.data;
            if (Array.isArray(data)) {
                setCartItems(data);
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error("Add to cart failed:", error);
            setCartItems([]);
        }
    };

    const calculateQuantity = () => {
        let count = 0;
        cartItems.forEach((element) => {
            count = count + parseInt(element.quantity);
        });
        return count;
    };

    const calculateCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.menuPrice) || 0;
            const quantity = parseInt(item.quantity) || 0;
            return total + price * quantity;
        }, 0);
    };

    const calculateTaxTotal = () => {
        const subtotal = calculateCartTotal();
        return (8.88 / 100) * subtotal;
    };

    // ✅ Fetch user details if logged in
    const fetchUserDetails = async () => {
        try {
            setLoading(true);
            const auth = getAuth();
            const user = await new Promise((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                    unsubscribe();
                    resolve(firebaseUser);
                });
            });
            const id_token = await user.getIdToken();
            localStorage.setItem('id_token', id_token)
            const res = await axios.post(`${base_url}/api/LoginUserDetails`, {
                idToken: id_token,
            });
            if (res.data?.status) {
                setUser(res.data?.data)
            }
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch user details", err);
        }
    };


    const handleBillingChange = (e) => {
        const value = e.target.value;
        setBillingType(value);

        if (value === "Delivery") {
            router.push("/delivery-partner");
        }
    };

    const handleCheckout = async () => {
        const f = firstName.trim();
        const l = lastName.trim();
        const e = email.trim();
        const p = phone.trim();
        const a = address.trim();

        // validation
        if (!f) {
            Swal.fire("Required", "First name is required", "warning");
            return;
        }

        if (!l) {
            Swal.fire("Required", "Last name is required", "warning");
            return;
        }

        if (!e) {
            Swal.fire("Required", "Email is required", "warning");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(e)) {
            Swal.fire("Invalid Email", "Please enter a valid email address", "error");
            return;
        }

        if (!p) {
            Swal.fire("Required", "Phone number is required", "warning");
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(p)) {
            Swal.fire("Invalid Phone", "Phone number must be 10 digits", "error");
            return;
        }

        if (!a) {
            Swal.fire("Required", "Address is required", "warning");
            return;
        }

        // ✔ All validations passed
        Swal.fire({
            title: "Processing...",
            text: "Please wait while we complete the checkout",
            allowOutsideClick: true,
            allowEscapeKey: true,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        const res = await axios.get(`${base_url}/api/checkKDSOnline/${resturantId}`);
        if (res?.data?.status) {
            const auth = getAuth();
            const user = await new Promise((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                    unsubscribe();
                    resolve(firebaseUser);
                });
            });
            if (!user && userMode !== "LoginUser") {
                setShowLoginModal(true);
                return;
            }
            await makeCheckout();
        } else {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: res.data?.message,
            });
        }
    };

    const handleFirebaseLogin = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            localStorage.setItem("userLog", "LoginUser");
            setUserMode("LoginUser");
            fetchUserDetails();
            await makeCheckout();
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const ContinueAsGuest = async () => {
        localStorage.setItem("userLog", "Guest");
        setUserMode("Guest");
        await makeCheckout();
        setShowLoginModal(false);
    };

    const stripePromise = loadStripe("pk_live_51SbE95RodsC9ysiwfShNg0wzUqlQy0YeEiPeatkDvkmUtGoEBs5IjvLBWO9XaJ0PkW15mRRJ4UnhIOcCAPCIE1Ag00TQnwKlO1");
    const makeCheckout = async () => {
        const Total_amount = parseFloat(calculateCartTotal() + calculateTaxTotal());
        const stripe = await stripePromise;
        const res = await fetch(`${base_url}/api/createSession`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                unit_amount: Total_amount.toFixed(2),
                quantity: 1,
                name: `${firstName} ${lastName}`,
                email,
                phoneNo: phone,
                address,
                orderType: billingType,
                totalqty: calculateQuantity(),
                total: calculateCartTotal().toFixed(2),
                taxAmount: calculateTaxTotal().toFixed(2),
                subtotal: parseFloat(calculateCartTotal().toFixed(2)) + parseFloat(calculateTaxTotal().toFixed(2)),
                resturantId: resturantId
            }),
        });

        const data = await res.json();
        if (!data.id) {
            alert("Failed to create Stripe session");
            return;
        }

        const result = await stripe.redirectToCheckout({
            sessionId: data.id,
        });

        if (result.error) {
            alert(result.error.message);
        }
    };
    return (
        <>
            <div className="th-checkout-wrapper section-padding fix">
                <div className="container">
                    <form action="#" className="woocommerce-checkout mt-5">
                        <div className="row ">
                            <div className="col-lg-12">
                                <div className="head-content d-flex justify-content-between">
                                    <h2 className="h4">
                                        {user ? (
                                            <p>Welcome, {user.customerName} ({user.customerEmail})</p>
                                        ) : 'Login as Guest'}
                                        <br />
                                        Billing Details
                                    </h2>
                                    <span>
                                        <label>
                                            <input
                                                type="radio"
                                                name="billingType"
                                                id="Pickup"
                                                value="Pickup"
                                                label="Pickup"
                                                checked={billingType === "Pickup"}
                                                onChange={handleBillingChange}
                                            />{" "}
                                            Pickup
                                        </label>
                                        <label style={{ marginRight: "15px" }}>
                                            <input
                                                type="radio"
                                                name="billingType"
                                                value="Delivery"
                                                id="Delivery"
                                                checked={billingType === "Delivery"}
                                                onChange={handleBillingChange}
                                            />{" "}
                                            Delivery
                                        </label>
                                    </span>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <input type="text" className="form-control" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <input type="text" className="form-control" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    <div className="col-12 form-group">
                                        <textarea className="form-control" placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className="wc-proceed-to-checkout mt-3">
                                        <Link href="#" className="theme-btn btn-fw" onClick={handleCheckout}>Checkout</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* Modal */}
            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
                <Modal.Body className="login-modal-body text-center">
                    <img
                        src="https://i.ibb.co/mFPTyM16/Chat-GPT-Image-Jul-3-2025-01-29-11-PM-Photoroom.jpg"
                        alt="Login Illustration"
                        height={200}
                        width={200}
                    />
                    <h5 className="modal-title-text">Do you want to proceed you next process as a guest or Email Login?</h5>
                    <p className="modal-subtext">

                    </p>
                    <div className="modal-button-group">
                        <Button variant="success" className="modal-btn guest" onClick={ContinueAsGuest}>
                            Guest
                        </Button>
                        <Button variant="outline-secondary" className="modal-btn login" onClick={handleFirebaseLogin}>
                            Login
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Checkout;