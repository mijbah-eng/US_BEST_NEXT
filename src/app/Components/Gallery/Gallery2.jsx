"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import basecatagories, { base_url, resturantId } from "../../../../utility/config";
import axios from "axios";

const Gallery2 = () => {
    const [galleryData, setGalleryData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [activeImage, setActiveImage] = useState("");

    useEffect(() => {
        GetGallery();
    }, []);

    const GetGallery = async () => {
        const res = await axios.post(`${base_url}/api/GetGallery`, {
            resturantId: resturantId
        });

        if (res.data?.status) {
            setGalleryData(res.data?.data);
        }
    };

    const brandContent = [
        { addclass: 'col-lg-5' }, { addclass: 'col-lg-4' }, { addclass: 'col-lg-3' },
        { addclass: 'col-lg-4' }, { addclass: 'col-lg-4' }, { addclass: 'col-lg-4' },
        { addclass: 'col-lg-5' }, { addclass: 'col-lg-4' }, { addclass: 'col-lg-3' },
        { addclass: 'col-lg-5' }, { addclass: 'col-lg-4' }, { addclass: 'col-lg-3' },
        { addclass: 'col-lg-4' }, { addclass: 'col-lg-4' }, { addclass: 'col-lg-4' },
        { addclass: 'col-lg-5' }, { addclass: 'col-lg-4' }, { addclass: 'col-lg-3' },
        { addclass: 'col-lg-5' }, { addclass: 'col-lg-4' }, { addclass: 'col-lg-3' },
        { addclass: 'col-lg-4' }, { addclass: 'col-lg-4' }, { addclass: 'col-lg-4' },
        { addclass: 'col-lg-5' }, { addclass: 'col-lg-4' }, { addclass: 'col-lg-3' },
        { addclass: 'col-lg-5' }, { addclass: 'col-lg-4' }, { addclass: 'col-lg-3' },
        { addclass: 'col-lg-4' }, { addclass: 'col-lg-4' }, { addclass: 'col-lg-4' },
        { addclass: 'col-lg-5' }, { addclass: 'col-lg-4' }, { addclass: 'col-lg-3' },
    ];

    const openPopup = (img) => {
        setActiveImage(img);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setActiveImage("");
    };

    return (
        <>
            <div className="gallery-section section-padding fix">
                <div className="container">
                    <div className="row gy-4 mb-4">
                        {galleryData.map((item, i) => (
                            <div key={i} className={brandContent[i]?.addclass || "col-lg-4"}>
                                <div className="gallery-thumb style2" onClick={() => openPopup(`${basecatagories}gallery/${item?.image}`)} style={{ cursor: "pointer" }}>
                                    <img src={`${basecatagories}gallery/${item?.image}`} alt="thumb" />
                                    <div className="icon">
                                        <img src="/assets/img/icon/arrow_icon.png" alt="icon" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===================== POPUP ===================== */}
            {showPopup && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closePopup}>✕</button>
                        <img src={activeImage} className="popup-image" alt="Large" />
                    </div>

                    <style jsx>{`
                        .popup-overlay {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(0,0,0,0.85);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            z-index: 9999;
                        }

                        .popup-box {
                            position: relative;
                            max-width: 90%;
                            max-height: 90%;
                            background: #000;
                            padding: 10px;
                            border-radius: 10px;
                        }

                        .popup-image {
                            width: 100%;
                            height: auto;
                            border-radius: 10px;
                        }

                        .close-btn {
                            position: absolute;
                            top: -10px;
                            right: -10px;
                            background: white;
                            border: none;
                            border-radius: 50%;
                            width: 35px;
                            height: 35px;
                            font-size: 20px;
                            cursor: pointer;
                            box-shadow: 0 2px 10px rgba(0,0,0,0.5);
                        }
                    `}</style>
                </div>
            )}
        </>
    );
};

export default Gallery2;
