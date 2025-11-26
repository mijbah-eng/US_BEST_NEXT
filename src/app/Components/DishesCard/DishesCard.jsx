"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddToCartModal from "./AddToCartModal";
import "./mode.css";

function DishesCard({ item, imageUrl, handleAddToCartClick, setSelectedProduct, handleClose, product }) {
  const [modelShow, setModelShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };
  return (
    <div className="dishes-card style1" key={item?.menuId}>
      <div className="dishes-thumb">
        <Image src={imageUrl} alt={item?.menuName} width={158} height={158} />
      </div>

      <Link href="/menu">
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
              if (priceArray?.length) {
                priceDisplay = `$${priceArray[0].cprice} - $${
                  priceArray[priceArray.length - 1].cprice
                }`;
              }
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
            <Link href="/shop/cart">
              <i className="bi bi-basket2"></i>
            </Link>
          </li>
          <li>
            <span
              className=""
              onClick={(e) => {
                e.preventDefault();
                handleAddToCartClick(item);
                setShowModal(true);
              }}
            >
              <i className="bi bi-eye"></i>
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
