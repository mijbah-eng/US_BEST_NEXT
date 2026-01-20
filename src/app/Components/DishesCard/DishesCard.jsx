"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddToCartModal from "./AddToCartModal";
import "./mode.css";
import Swal from "sweetalert2";

function DishesCard({ item, imageUrl, handleAddToCartClick, setSelectedProduct, handleClose, product, catValidation, currentDate }) {
  const [modelShow, setModelShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const isTimeWithinRange = (startTime, endTime, currentDateTime) => {
    // ✅ If time restriction not set → allow
    if (!startTime || !endTime) {
      return true;
    }
    // extract HH:mm from times
    const toMinutes = (time) => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };

    const currentTime = currentDateTime.split(" ")[1].slice(0, 5); // HH:mm

    const startMinutes = toMinutes(startTime);
    const endMinutes = toMinutes(endTime);
    const currentMinutes = toMinutes(currentTime);

    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  };

  const handleaddcartvalidation = () => {
    console.log(catValidation,currentDate,item);
    
    /* ---------- Category Time VALIDATION ---------- */
    const iscatValid = isTimeWithinRange(
      catValidation.start_time,
      catValidation.end_time,
      currentDate
    );

    if (!iscatValid) {
      Swal.fire({
        icon: "warning",
        title: `This Menu is available between ${catValidation.start_time} and ${catValidation.end_time}`,
      });
      return;
    }

    /* ---------- DAY VALIDATION ---------- */

    // ✅ No day restriction → allow
    // Safe JSON parse
    const DAY_MAP = {
      sun: "Sunday",
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
      sat: "Saturday",
    };
    let availableDays = [];
    try {
      availableDays = JSON.parse(item?.available_days ?? "[]");
    } catch (e) {
      availableDays = [];
    }
    if (Array.isArray(availableDays) && availableDays.length > 0) {
      const date = new Date(
        currentDate.replace(" ", "T") + "-05:00" // America/New_York
      );

      const today = date
        .toLocaleDateString("en-US", {
          weekday: "short",
          timeZone: "America/New_York",
        })
        .toLowerCase();

      if (!availableDays.includes(today)) {
        const readableDays = availableDays
          .map(day => DAY_MAP[day] || day)
          .join(", ");
        Swal.fire({
          icon: "warning",
          title: `This item is available only on ${readableDays}`,
        });
        return false;
      }
    }
    /* ---------- Menu Time VALIDATION ---------- */
    const ismenuValid = isTimeWithinRange(
      item.start_time,
      item.end_time,
      currentDate
    );
    if (!ismenuValid) {
      Swal.fire({
        icon: "warning",
        title: `This Menu is available between ${item.start_time} and ${item.end_time}`,
      });
      return;
    }

    handleAddToCartClick(item);
    setShowModal(true);
  }
  return (
    <div className="dishes-card style1" key={item?.menuId}>
      <div className="dishes-thumb">
        <Image src={imageUrl} alt={item?.menuName} width={158} height={158} />
      </div>

      <Link href={{
        pathname: "/shop/shop-details",
        query: { menuId: item.menuId },
      }}>
        <h3>{item?.menuName}</h3>
      </Link>
      <p>{item?.description}</p>
      {item.offer ? (
        <>
          <p>-{item.offer}%</p>
          <h6>${parseFloat(item.price).toFixed(2)}</h6>
          <span>
            $
            {(
              parseFloat(item.price) -
              (parseFloat(item.price) * item.offer) / 100
            ).toFixed(2)}
          </span>
        </>
      ) : (
        (() => {
          let priceDisplay = "Price not available";
          if (item.price) {
            priceDisplay = `$${item.price}`;
          } else {
            try {
              const priceArray = item.customeType;
              if (priceArray?.length > 1) {
                priceDisplay = `$${priceArray[0].cprice} - $${priceArray[priceArray.length - 1].cprice
                  }`;
              } else {
                priceDisplay = `$${priceArray?.[0]?.cprice}`;
              }
              // priceDisplay = menu.price
              //   ? `$${menu.price}`
              //   : priceArray?.length > 1
              //     ? `$${priceArray[0].cprice} - $${priceArray[priceArray.length - 1].cprice
              //     }`
              //     : `$${priceArray?.[0]?.cprice}`;
            } catch (err) {
              priceDisplay = "Price not available";
            }
          }
          return <h6 style={{ fontSize: "22px" }}>{priceDisplay}</h6>;
        })()
      )}

      <div className="social-profile">
        <ul>
          <li>
            <span
              className=""
              onClick={(e) => {
                e.preventDefault();
                handleaddcartvalidation();
              }}
            >
              <i className="bi bi-basket2"></i>
            </span>
          </li>
        </ul>
      </div>

      {showModal && (
        <AddToCartModal show={showModal} handleClose={handleCloseModal} product={product} />
      )}
      {/* <div className={`model-overlay ${modelShow ? "overlay-open" : ""}`} onClick={() => setModelShow(false)}></div> */}
    </div>
  );
}

export default DishesCard;
