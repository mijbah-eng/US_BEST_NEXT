"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { base_url, resturantId } from "../../../../utility/config";
import Swal from "sweetalert2";

const Contact4 = () => {
    const [loading, setLoading] = useState(false);
    const handleContactSubmit = async (e) => {
        e.preventDefault();

        // Get form values
        const formData = {
            name: e.target.name.value.trim(),
            email: e.target.email.value.trim(),
            message: e.target.message.value.trim(),
        };

        // --- Validation ---
        const errors = [];
        if (!formData.name) errors.push("Name is required.");
        if (!formData.email) errors.push("Email is required.");
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.push("Enter a valid email.");
        if (!formData.message) errors.push("Message is required.");

        if (errors.length > 0) {
            Swal.fire({
                icon: "warning",
                title: "Validation Error",
                html: errors.join("<br/>"),
            });
            return;
        }

        try {
            setLoading(true);
            formData['resturantId'] = resturantId;
            const response = await axios.post(`${base_url}/api/SendContact`, formData);
            setLoading(false);
            if (response.data?.status) {
                Swal.fire({
                    icon: "success",
                    title: "Message Sent",
                    text: response.data?.message ?? "Your message has been sent successfully!",
                });
                e.target.reset(); // clear form after success
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data?.message ?? "Something went wrong.",
                });
            }
        } catch (error) {
            setLoading(false);
            console.error("Error sending contact form:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to send your message. Try again later.",
            });
        }
    };
    return (
        <div>
            <div className="contact-us-section section-padding fix">
                <div className="contact-box-wrapper style2">
                    <div className="container">
                        <div className="row gy-4">
                            <div className="col-md-6 col-xl-3">
                                <div className="contact-box style1 border-0">
                                    <div className="contact-icon"> <Image className="rounded-circle" src="/assets/img/icon/phone2.png" alt="img" width={80} height={80} /></div>
                                    <h3 className="title">Phone Number</h3>
                                    <p>240-667-2223</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3">
                                <div className="contact-box style1 border-0">
                                    <div className="contact-icon"><Image className="rounded-circle" src="/assets/img/icon/gmail2.png" alt="img" width={80} height={80} /></div>
                                    <h3 className="title">Email Address</h3>
                                    <p>info@usbestchicken.com</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3">
                                <div className="contact-box style1 border-0">
                                    <div className="contact-icon"><Image className="rounded-circle" src="/assets/img/icon/location2.png" alt="img" width={80} height={80} /></div>
                                    <h3 className="title">Our Address</h3>
                                    <p>7109 Martin Luther King Jr Hwy Unit A, North Englewood, MD 20785</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3">
                                <div className="contact-box style1 border-0">
                                    <div className="contact-icon"><Image className="rounded-circle" src="/assets/img/icon/clock2.png" alt="img" width={80} height={80} /></div>
                                    <h3 className="title">Opening Time</h3>
                                    <p>6AM - 2AM <br />Monday – Sunday</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-form-section style2 section-padding pt-0 fix">
                <div className="contact-form-wrapper style2">
                    <div className="container">
                        <div className="row gx-60 gy-5">
                            <div className="col-12">
                                <div className="contact-form style2">
                                    <h2>Get in Touch</h2>
                                    <form className="row" onSubmit={handleContactSubmit}>
                                        <div className="col-md-6">
                                            <input className="bg-color2" type="text" name="name" placeholder="Full Name" />
                                        </div>
                                        <div className="col-md-6">
                                            <input className="bg-color2" type="email" name="email" placeholder="Email Address" />
                                        </div>
                                        <div className="col-12">
                                            <textarea className="form-control bg-color2"
                                                name="message"
                                                id="message"
                                                placeholder="Enter Your Messege here"
                                                defaultValue={""}
                                            />
                                        </div>
                                        <div className="col-12 form-group">
                                            <input id="reviewcheck" name="reviewcheck" type="checkbox" />
                                            <label htmlFor="reviewcheck">Collaboratively formulate principle capital. Progressively
                                                evolve user<span className="checkmark"></span></label>
                                        </div>
                                        <div className="col-12 form-group mb-0">
                                            <button className="theme-btn w-100">SUBMIT NOW <i
                                                className="fa-sharp fa-regular fa-arrow-right-long bg-transparent text-white"></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="map-wrapper contact-area-map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.3551930690132!2d-76.88286049999999!3d38.91585829999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c1b741d21a3d%3A0x2f326fe7738945e3!2sUS%20BEST%20Chicken%20%26%20Burger!5e0!3m2!1sen!2sin!4v1765478548773!5m2!1sen!2sin"
                    height="550" loading="lazy"
                ></iframe>
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.3551930690132!2d-76.88286049999999!3d38.91585829999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c1b741d21a3d%3A0x2f326fe7738945e3!2sUS%20BEST%20Chicken%20%26%20Burger!5e0!3m2!1sen!2sin!4v1765478548773!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
            </div>
        </div>
    );
};

export default Contact4;