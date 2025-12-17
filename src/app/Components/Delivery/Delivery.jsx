"use client";
import axios from "axios";
import Link from "next/link";
import basecatagories, { base_url, resturantId } from "../../../../utility/config";
import { useEffect, useState } from "react";

const Delivery = () => {
    const [deliveryData, setDeliveryData] = useState([]);
    useEffect(() => {
        getDeliveryPartner();
    }, []);
    const getDeliveryPartner = async () => {
        const res = await axios.post(`${base_url}/api/GetDeliveryPartner`, {
            resturantId: resturantId
        });

        if (res.data?.status) {
            setDeliveryData(res.data?.data);
        }
    }

    return (
        <>
            <div className="container">
                <div className="about-us section-padding" style={{padding:"50px 0px"}}>
                    <div className="row">
                        <div className="col-12">
                            <div className="title-area">
                                <h2 className="title wow fadeInUp" data-wow-delay="0.7s" style={{fontSize:"30px !important",marginBottom:"0px"}}>
                                    Order From Your Favorite Apps
                                </h2>
                                <div className="text wow fadeInUp" data-wow-delay="0.8s" style={{marginBottom:"0px"}}>
                                    Enjoy Flavor United through Uber Eats, DoorDash, and other trusted delivery partners.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gallery-section section-padding fix">
                <div className="container">
                    <div className="row gy-4 mb-4">
                        {deliveryData.map((item, i) => (
                            <div key={i} className="col-lg-4" >
                                <div className="gallery-thumb style2">
                                    <Link href={item?.link} target="_blank">
                                        <img src={`${basecatagories}deleverypartner/${item?.image}`} alt="thumb" />
                                        <div className="icon"><img src="/assets/img/icon/arrow_icon.png" alt="icon" /></div>
                                    </Link>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    );
};

export default Delivery;