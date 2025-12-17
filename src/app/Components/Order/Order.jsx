"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";
import { base_url, resturantId } from "../../../../utility/config";
import { useRouter } from "next/navigation";

function Order() {
    const router = useRouter();
    const [reservationForm, setReservationForm] = useState({
        customerName: "",
        noOfPerson: "",
        phoneNumber: "",
        date: "",
        email: "",
        pincode:"",
        address:"",
        description: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservationForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // stop page reload
        // --- Validation ---
        const errors = [];
        if (!reservationForm.customerName?.trim()) errors.push("Customer name is required.");
        if (!reservationForm.noOfPerson || isNaN(reservationForm.noOfPerson)) errors.push("Number of persons must be a number.");
        if (!reservationForm.phoneNumber?.trim()) errors.push("Phone number is required.");
        else if (!/^[0-9]{10}$/.test(reservationForm.phoneNumber)) errors.push("Phone number must be 10 digits.");
        if (!reservationForm.date) errors.push("Date is required.");
        if (!reservationForm.email?.trim()) errors.push("Email is required.");
        else if (!/\S+@\S+\.\S+/.test(reservationForm.email)) errors.push("Enter a valid email address.");

        if (errors.length > 0) {
            Swal.fire({
                icon: "warning",
                title: "Validation Error",
                html: errors.join("<br/>"), // show multiple errors in alert
            });
            return; // ❌ stop API call if validation fails
        }
        reservationForm['resturantId'] = resturantId;
        console.log("Reservation Data:", reservationForm);
        // 👉 here you can call API with reservationForm
        try {
            setLoading(true);
            const response = await axios.post(`${base_url}/api/reservation`, reservationForm);
            setLoading(false);
            if (response.data?.status) {
                Swal.fire({
                    icon: "success",
                    title: "Confirmed",
                    text: response.data?.message ?? "Somthing Went Wrong.",
                    confirmButtonText: "Ok.",
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/");
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Opps...",
                    text: "Somthing Went Wrong.",
                    confirmButtonText: "Ok.",
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/");
                    }
                });
            }
        } catch (error) {
            setLoading(false);
            console.error("Error fetching Blog details:", error);
            Swal.fire({
                icon: "error",
                title: "Opps...",
                text: "Somthing Went Wrong.",
                confirmButtonText: "Ok.",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/");
                }
            });
        }
    }
    return (<>
        <div className="order-section section-padding fix">
            <div className="container">
                <div className="order-wrapper bg-white p-1 p-sm-4">
                    <div className="row gx-40 gy-5 gy-md-0">
                        <div className="d-none col-lg-6 d-md-flex justify-content-around flex-column align-items-center justify-content-center">
                            <div className="">
                                <p style={{textTransform:"uppercase"}}>crispy, every bite taste</p>
                                <h3 className="order-thumb-title">
                                    Book your event Catering?
                                    Lets us know your next event menu.
                                </h3>
                            </div>
                            <div className="order-thumb">
                                <div className="order-thumb-bg"></div>
                                <Image width={1000} height={1000} src={'/assets/img/offer/crispy_bite.png'} />
                            </div>
                        </div>
                        <div className="col-lg-6 order-center">
                            <div className="order-card bg-color2 p-3 p-sm-5">
                                <h3>Order A Catering</h3>
                                <p>Please Enter Your Details</p>
                                <div className="contact-form style2 bg-color2 p-0">
                                    <form className="row" onSubmit={handleSubmit}>
                                        <div className="col-6">
                                            <input type="text" placeholder="Customer Name" name="customerName" value={reservationForm.customerName} onChange={handleChange} />
                                        </div>
                                        <div className="col-6">
                                            <input type="text" placeholder="No of Person" name="noOfPerson" value={reservationForm.noOfPerson} onChange={handleChange} />
                                        </div>
                                        <div className="col-6">
                                            <input type="text" placeholder="Phone Number" name="phoneNumber" value={reservationForm.phoneNumber} onChange={handleChange} />
                                        </div>
                                        <div className="col-6">
                                            <input type="date" name="date" value={reservationForm.date} onChange={handleChange} />
                                        </div>
                                        <div className="col-6">
                                            <input type="email" placeholder="Email Address" name="email" value={reservationForm.email} onChange={handleChange} />
                                        </div>
                                        <div className="col-6">
                                            <input type="text" placeholder="ZipCode" name="pincode" value={reservationForm.pincode} onChange={handleChange} />
                                        </div>
                                        <div className="col-12 mb-4">
                                            <div className="form-clt">
                                                <textarea name="address" placeholder="Address" value={reservationForm.address} rows={5}
                                                    className="custom-textarea" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-12 mb-2">
                                            <div className="form-clt">
                                                <textarea name="description" placeholder="Special Request / Message" value={reservationForm.description} rows={5}
                                                    className="custom-textarea" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="theme-btn rounded-5 w-100 mb-3">SEND</button>
                                        </div>


                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Order;