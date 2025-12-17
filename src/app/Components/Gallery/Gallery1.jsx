"use client"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import basecatagories, { base_url, resturantId } from "../../../../utility/config";

const Gallery1 = () => {

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
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 6,
        }
      }, {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

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
      <div className="gallery-section">
        <div className="gallery-wrapper style1">
          <div className="container1">
            <div className="slider-area">
              <div className="swiper gallerySliderOne">
                <div className="swiper-wrapper cs_slider_gap_301 gallery-slider-area">
                  <Slider {...settings}>
                    {galleryData.map((item, i) => (
                      <div key={i} className="swiper-slide" onClick={() => openPopup(`${basecatagories}gallery/${item?.image}`)} style={{ cursor: "pointer" }}>
                        <div className="gallery-thumb">
                          <Link href="/#">
                            <Image src={`${basecatagories}gallery/${item?.image}`} alt="img" width={295} height={292} />
                            <div className="icon"><Image src="/assets/img/icon/camera.svg" alt="img" width={32} height={33} /></div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </Slider>

                </div>
              </div>
            </div>
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

export default Gallery1;