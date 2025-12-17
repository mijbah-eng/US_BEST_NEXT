"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { base_url, resturantId } from "../../../../utility/config";
import axios from "axios";

const Reservation = () => {
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
    return (
        <div className="reservation-section section-padding fix">
            <div className="reservation-wrapper">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8">
                            <div className="reservation-form">
                                <div className="contact-form style2">
                                    <h2 style={{marginBottom:"0px"}}>Order your <span className="text-theme-color">Catering</span> </h2>
                                    <p style={{marginBottom:"25px"}}>Let us cater your next gathering with fresh food, great taste, and reliable service.</p>
                                    <form className="row" onSubmit={handleSubmit}>
                                        <div className="col-md-6">
                                            <label className="mb-2" htmlFor="customerName">Customer Name*</label>
                                            <input id="customerName" name="customerName" type="text" value={reservationForm.customerName} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="mb-2" htmlFor="time">No of Person*</label>
                                            <input id="time" type="text" name="noOfPerson" value={reservationForm.noOfPerson} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="mb-2" htmlFor="phone">Phone Number*</label>
                                            <input id="phone" type="number" placeholder="Phone Number" name="phoneNumber" value={reservationForm.phoneNumber} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="mb-2" htmlFor="service">Date*</label>
                                            <input id="service" type="date" name="date" value={reservationForm.date} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="mb-2" htmlFor="email">Email Address*</label>
                                            <input id="email" type="email" placeholder="example@gmail.com" name="email" value={reservationForm.email} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="mb-2" htmlFor="pincode">Zip Code*</label>
                                            <input id="pincode" type="text" placeholder="123456" name="pincode" value={reservationForm.pincode} onChange={handleChange} />
                                        </div>
                                        <div className="col-12 mb-4">
                                            <textarea name="address" placeholder="Address" value={reservationForm.address} rows={5}
                                                className="custom-textarea" onChange={handleChange} />
                                        </div>
                                        <div className="col-12 mb-2">
                                            <textarea name="description" placeholder="Special Request / Message" value={reservationForm.description} rows={5}
                                                className="custom-textarea" onChange={handleChange} />
                                        </div>
                                        <div className="col-12 form-group mb-0">
                                            <button type="submit" className="theme-btn w-100">Send <i className="bi bi-arrow-right bg-transparent text-white"></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reservation;