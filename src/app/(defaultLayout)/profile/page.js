"use client"
import React, { useState } from "react";
import BreadCumb from "@/app/Components/Common/BreadCumb";
import "./profile.css";
const Profilepage = () => {
    const [isEdit, setIsEdit] = useState(false);

    const [profile, setProfile] = useState({
        name: "User name",
        email: "mi@xpaytech.co",
        phone: "+20-01274318900",
        address: "285 N Broad St, Elizabeth, NJ 07208, USA",
    });

    const handleChange = (e) => {
        console.log('>>>>',profileImg);
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    return (
        <>
            <BreadCumb
                bgimg="/assets/img/bg/breadcumb.jpg"
                Title="Profile"
            ></BreadCumb>
            <div className="profile-wrapper">
                <div className="profile-card">

                    {/* LEFT */}
                    <div className="profile-left">
                        <div className="avatar-box">
                            <img src="/assets/img/profile.png" alt="profile" />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="profile-right">
                        <div className="profile-row">
                            <label>Name:</label>
                            {isEdit ? (
                                <input
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profile.name}</p>
                            )}
                        </div>

                        <div className="profile-row">
                            <label>Email:</label>
                            {isEdit ? (
                                <input
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profile.email}</p>
                            )}
                        </div>

                        <div className="profile-row">
                            <label>Phone Number:</label>
                            {isEdit ? (
                                <input
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profile.phone}</p>
                            )}
                        </div>

                        <div className="profile-row">
                            <label>Address:</label>
                            {isEdit ? (
                                <textarea
                                    name="address"
                                    value={profile.address}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profile.address}</p>
                            )}
                        </div>

                        <button
                            className="theme-btn style-one"
                            onClick={() => setIsEdit(!isEdit)}
                        >
                            {isEdit ? "Save Profile" : "Edit Profile"}
                        </button>
                    </div>
                </div>
            </div>
            {/* <Footer1 /> */}
        </>
    );
};

export default Profilepage;
