"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { base_url, resturantId } from '../../../../utility/config';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState(false);
    const [statusMessage, setStatusMessage] = useState("Processing your payment...");
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const sessionId = params.get("sessionId");
            const name = params.get("name") || "";
            const email = params.get("email") || "";
            const phoneNo = params.get("phoneNo") || "";
            const address = params.get("address") || "";
            const totalqty = params.get("totalqty") || "";
            const total = params.get("total") || "";
            const taxAmount = params.get("taxAmount") || "";
            const subtotal = params.get("subtotal") || "";
            const orderType = params.get("orderType") || "";
            if (sessionId) {
                orderCreateApi(name, email, phoneNo, address, sessionId, totalqty, total, taxAmount, subtotal, orderType);
            }
        }
    }, []);
    const orderCreateApi = async (
        name,
        email,
        phoneNo,
        address,
        sessionId,
        totalqty,
        total,
        taxAmount,
        subtotal,
        orderType
    ) => {
        try {
            // 1. Check session status
            setLoading(true);
            setStatusMessage("Verifying payment...");
            const sessionRes = await axios.post(`${base_url}/api/checkSessionStatus`,
                { sessionId,resturantId },
                {
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "application/json",
                    },
                }
            );

            if (sessionRes.data && sessionRes.data.payment_status === "paid") {
                setStatusMessage("Payment verified! Creating order...");
                const orderRes = await axios.post(
                    `${base_url}/api/OrderCreate`,
                    {
                        resturantId: resturantId,
                        name,
                        email,
                        phoneNo,
                        address,
                        totalqty,
                        total,
                        taxAmount,
                        subtotal,
                        user_uuid: Cookies.get("uuid"),
                        orderType,
                        idToken: localStorage.getItem("id_token")
                    },
                    {
                        headers: {
                            Accept: "*/*",
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (orderRes.data?.status) {
                    setLoading(false);
                    setRes(orderRes.data);
                } else {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                console.warn("Session is invalid or expired.");
            }
        } catch (error) {
            setLoading(false);
            console.error("Error during session check or order creation:", error);
        }
    };
    return (
        <div style={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            marginTop:"10%"
        }}>
            {/* {loading ? (
                <>
                    <div className="loader w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg font-medium text-gray-700">{statusMessage}</p>
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-gray-900">Order Confirmed!</h2>
                    <p className="text-gray-600 mt-2">{statusMessage}</p>
                    <p>{res?.message}</p>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                    >
                        Go Home
                    </button>
                </>
            )} */}
            {loading ? (
                <>
                    <div className="loader w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg font-medium text-gray-700">{statusMessage}</p>
                </>
            ) : (
                <>
                    {res?.status ? (
                        // SUCCESS SECTION
                        <>
                            <h2 className="text-2xl font-bold text-green-700">Order Confirmed!</h2>
                            {/* <p className="text-gray-600 mt-2">{statusMessage}</p> */}

                            <div className="mt-4 bg-green-50 p-4 rounded-md w-full">
                                <p className="text-green-700 font-medium">Order No: {res?.orderNo}</p>
                                <p className="text-gray-600 text-sm mt-1">{res?.message}</p>
                            </div>

                            <button
                                onClick={() => router.push("/")}
                                className="mt-6 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                            >
                                Go Home
                            </button>
                        </>
                    ) : (
                        // FAILURE SECTION
                        <>
                            <h2 className="text-2xl font-bold text-red-700">Order Failed!</h2>
                            <p className="text-gray-600 mt-2">{res?.message || "Something went wrong"}</p>

                            <button
                                onClick={() => router.push("/checkout")}
                                className="mt-3 border border-gray-500 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100"
                            >
                                Try Again
                            </button>

                            <button
                                onClick={() => router.push("/")}
                                className="mt-3 border border-gray-500 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100"
                            >
                                Go Home
                            </button>
                        </>
                    )}
                </>
            )}

            <style>{`
        .loader {
          border-top-color: #000;
        }
      `}</style>
        </div>
    )
}

export default page