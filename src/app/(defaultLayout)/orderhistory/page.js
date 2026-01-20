"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import basecatagories, { resturantId } from "../../../../utility/config";
import { base_url } from "../../../../utility/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../../utility/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import Loader from "@/components/Loader";
export default function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            const auth = getAuth();
            const user = await new Promise((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                    unsubscribe();
                    resolve(firebaseUser);
                });
            });
            const id_token = await user.getIdToken();
            try {
                setLoading(true);
                const response = await axios.post(`${base_url}/api/OrderList`,
                    {
                        idToken: id_token,
                        resturantId : resturantId
                    }
                );
                setOrders(response.data?.data || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const statusMap = {
        "0": "New Order",
        "1": "Order Accepted",
        "2": "Order Inprocess",
        "3": "Order Ready",
        "4": "Order Delivered or Served"
    };

    return (
        <>
            <div className="container py-5">
                <h1 className="mb-4">Order History</h1>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map((order, orderIndex) => {
                        let items = [];
                        try {
                            items = JSON.parse(order.orderItemData);
                        } catch (e) {
                            console.error("Invalid orderItemData", e);
                        }

                        return (
                            <div
                                key={orderIndex}
                                className="order-item mb-5 p-3 border rounded"
                            >
                                <h5>Order #{order.orderNo || "N/A"}</h5>
                                <p>
                                    <strong>Date:</strong> {order.createdOn}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {statusMap[order.orderStatus] || "Unknown Status"}
                                </p>
                                <p>
                                    <strong>Total:</strong> ${order.total}
                                </p>

                                <div className="cart-items-wrapper mt-4">
                                    <table className="table table-bordered">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item, itemIndex) => {
                                                const details =
                                                    typeof item.details === "string"
                                                        ? JSON.parse(item.details)
                                                        : item.details;
                                                const size = details?.size || item.sizeDetails;
                                                const extraSoda = details?.Extrasoda?.map(
                                                    (e) => e.sodaName
                                                ).join(", ");
                                                const extraTopping = details?.Extratopping?.map(
                                                    (e) => e.toppingName
                                                ).join(", ");

                                                const imageUrl = `${basecatagories}menu/${encodeURIComponent(
                                                    item.image
                                                )}`;
                                                return (
                                                    <tr key={itemIndex}>
                                                        <td>
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    gap: "10px",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <img
                                                                    src={imageUrl}
                                                                    alt={item.menuName}
                                                                    width={90}
                                                                    height={90}
                                                                    style={{
                                                                        objectFit: "cover",
                                                                        borderRadius: "8px",
                                                                    }}
                                                                />
                                                                <div>
                                                                    <p
                                                                        style={{
                                                                            fontSize: "18px",
                                                                            fontWeight: "600",
                                                                            marginBottom: 5,
                                                                        }}
                                                                    >
                                                                        {item.menuName}
                                                                    </p>
                                                                    <p style={{ fontSize: "14px", margin: 0 }}>
                                                                        Size:{" "}
                                                                        <span style={{ color: "red" }}>{size}</span>
                                                                    </p>
                                                                    {extraSoda && (
                                                                        <p style={{ fontSize: "14px", margin: 0 }}>
                                                                            <b>Soda:</b> {extraSoda}
                                                                        </p>
                                                                    )}
                                                                    {extraTopping && (
                                                                        <p style={{ fontSize: "14px", margin: 0 }}>
                                                                            <b>Topping:</b> {extraTopping}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>${parseFloat(item.menuPrice).toFixed(2)}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>
                                                            $
                                                            {(
                                                                parseFloat(item.menuPrice) *
                                                                parseInt(item.quantity)
                                                            ).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
}
