"use client";
import { useState } from "react";
import "./mode.css"
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import basecatagories from "../../../../utility/config";
import { auth } from "../../../../utility/firebase/firebase";

function AddToCartModal({show, handleClose, product}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState({});
  const [menudetails, setMenudetails] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedExtraToppings, setSelectedExtraToppings] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedExtraSauces, setSelectedextraSauces] = useState([]);
  const [selectedExtrasoda, setSelectedExtrasoda] = useState([]);
  const [selectedsoda, setSelectedsoda] = useState([]);
  const [selectedstyle, setSelectedstyle] = useState([]);
  const [selectedexrastyle, setSelectedextrastyle] = useState([]);
  const [selectedfish, setSelectedfish] = useState([]);
  const [selectedextrafish, setSelectedextrafish] = useState([]);
  const [selectedchrust, setSelectedchrust] = useState([]);
  const [selectedextraChrust, setSelectedextraChrust] = useState([]);
  const [selectedside, setSelectedside] = useState([]);
  const [selectedextraside, setSelectedextraside] = useState([]);
  const [selectedingredient, setSelectedingredient] = useState([]);
  const [selectedextraingredient, setSelectedextraingredient] = useState([]);
  const [selectedmeatpreparation, setSelectedmeatpreparation] = useState([]);
  const [selectedextrameatpreparation, setSelectedextrameatpreparation] =
    useState([]);
  const [selectedcombotag, setSelectedcombotag] = useState([]);
  const [selectedextra, setSelectedextra] = useState([]);
  const [quantity, setquantity] = useState(1);
  const [totalPrice, setTotalprice] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingCartPayload, setPendingCartPayload] = useState(null);
  const [itemsizeIndex, setitemsizeindex] = useState(1);

   useEffect(() => {
    if (product?.menuId) {
      fetchMenuDetails();
    }
  }, [product]);

  const fetchMenuDetails = async () => {
    try {
      const response = await axios.post(`${base_url}/api/getMenuDetails`, {
        resturantId: resturantId,
        menuId: product.menuId,
      });
      setMenu(response.data?.menu || {});
      setMenudetails(response.data?.details || {});
      if (response.data?.menu.type !== "custom") {
        handleSizeSelection({
          customtype: "Regular",
          cprice: response.data?.menu.price,
        });
      }
    } catch (error) {
      console.error("Error fetching menu details:", error);
    }
  };

   const handleSizeSelection = (size) => {
    setSelectedSize(size);
    setSelectedSauces([]);
  };

   const toggleTopping = (
    toppingName,
    toppingList,
    selectedList,
    setSelectedList
  ) => {
    const exists = selectedList.find((t) => t.name === toppingName);
    const item = toppingList.find((t) => t.toppingName === toppingName);

    if (exists) {
      setSelectedList((prev) => prev.filter((t) => t.name !== toppingName));
    } else {
      setSelectedList((prev) => [
        ...prev,
        {
          name: toppingName,
          type: "Whole",
          id: item?.toppingId,
          price: item?.price || "0",
        },
      ]);
    }
  };

  const updatePlacement = (
    toppingName,
    placementValue,
    placementPrice,
    selectedList,
    setSelectedList
  ) => {
    setSelectedList((prev) =>
      prev.map((t) =>
        t.name === toppingName
          ? { ...t, type: placementValue, price: placementPrice }
          : t
      )
    );
  };

  const isChecked = (name, selectedList) =>
    selectedList.some((t) => t.name === name);

    const getPlacement = (name, selectedList) =>
    selectedList.find((t) => t.name === name)?.type || "Whole";


      const toggleSauce = (sauce) => {
    const sauceLimit = Number(selectedSize?.saucecount);
    const exists = selectedSauces.find((s) => s.sauceId === sauce.sauceId);
    if (exists) {
      // If already selected, unselect it
      setSelectedSauces((prev) =>
        prev.filter((s) => s.sauceId !== sauce.sauceId)
      );
    } else {
      // If not selected, validate limit (only if sauceLimit is a valid number)
      if (
        !isNaN(sauceLimit) &&
        sauceLimit > 0 &&
        selectedSauces.length >= sauceLimit
      ) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: `You can select a maximum of ${sauceLimit} Sauce.`,
        });
        return;
      }
      // Add new sauce
      setSelectedSauces((prev) => [
        ...prev,
        {
          price: sauce.price || "0",
          sauceId: sauce.sauceId,
          sauceName: sauce.sauce,
        },
      ]);
    }
  };
  // sause handel
    const toggleExtraSauce = (sauce) => {
    const exists = selectedExtraSauces.find((s) => s.sauceId === sauce.sauceId);
    if (exists) {
      setSelectedextraSauces((prev) =>
        prev.filter((s) => s.sauceId !== sauce.sauceId)
      );
    } else {
      setSelectedextraSauces((prev) => [
        ...prev,
        {
          price: sauce.price || "0",
          sauceId: sauce.sauceId,
          sauceName: sauce.sauce,
        },
      ]);
    }
  };
    // extrasoda handel
    const toggleExtraSoda = (soda) => {
    const exists = selectedExtrasoda.find((s) => s.sodaId === soda.sodaId);
    if (exists) {
      setSelectedExtrasoda((prev) =>
        prev.filter((s) => s.sodaId !== soda.sodaId)
      );
    } else {
      setSelectedExtrasoda((prev) => [
        ...prev,
        {
          price: soda.price || "0",
          sodaId: soda.sodaId,
          sodaName: soda.sodaName,
        },
      ]);
    }
  };

  // soda handel
  const toggleSoda = (soda) => {
    const exists = selectedsoda.find((s) => s.sodaId === soda.sodaId);
    if (exists) {
      setSelectedsoda((prev) => prev.filter((s) => s.sodaId !== soda.sodaId));
    } else {
      setSelectedsoda((prev) => [
        ...prev,
        {
          price: soda.price || "0",
          sodaId: soda.sodaId,
          sodaName: soda.sodaName,
        },
      ]);
    }
  };

    // style handel
  const toggleStyle = (style) => {
    const exists = selectedstyle.find((s) => s.styleId === style.styleId);
    if (exists) {
      setSelectedstyle((prev) =>
        prev.filter((s) => s.styleId !== style.styleId)
      );
    } else {
      setSelectedstyle((prev) => [
        ...prev,
        {
          price: style.price || "0",
          styleId: style.styleId,
          styleName: style.styleName,
        },
      ]);
    }
  };

    //Extrastyle handel
  const toggleExtraStyle = (style) => {
    const exists = selectedexrastyle.find((s) => s.styleId === style.styleId);
    if (exists) {
      setSelectedextrastyle((prev) =>
        prev.filter((s) => s.styleId !== style.styleId)
      );
    } else {
      setSelectedextrastyle((prev) => [
        ...prev,
        {
          price: style.price || "0",
          styleId: style.styleId,
          styleName: style.styleName,
        },
      ]);
    }
  };

    // Fish handel
  const toggleFish = (fish) => {
    const exists = selectedfish.find((s) => s.fishId === fish.fishId);
    if (exists) {
      setSelectedfish((prev) => prev.filter((s) => s.fishId !== fish.fishId));
    } else {
      setSelectedfish((prev) => [
        ...prev,
        {
          price: fish.price || "0",
          fishId: fish.fishId,
          fishName: fish.fishName,
        },
      ]);
    }
  };


    // ExtraFish handel
  const toggleExtraFish = (fish) => {
    const exists = selectedextrafish.find((s) => s.fishId === fish.fishId);
    if (exists) {
      setSelectedextrafish((prev) =>
        prev.filter((s) => s.fishId !== fish.fishId)
      );
    } else {
      setSelectedextrafish((prev) => [
        ...prev,
        {
          price: fish.price || "0",
          fishId: fish.fishId,
          fishName: fish.fishName,
        },
      ]);
    }
  };


    // chrust handel
  const toggleChrust = (chrust) => {
    const exists = selectedchrust.find((s) => s.chrustId === chrust.chrustId);
    if (exists) {
      setSelectedchrust((prev) =>
        prev.filter((s) => s.chrustId !== chrust.chrustId)
      );
    } else {
      setSelectedchrust((prev) => [
        ...prev,
        {
          price: chrust.price || "0",
          chrustId: chrust.chrustId,
          chrustName: chrust.chrustName,
        },
      ]);
    }
  };


    // Extrachrust handel
  const toggleExtraChrust = (chrust) => {
    const exists = selectedextraChrust.find(
      (s) => s.chrustId === chrust.chrustId
    );
    if (exists) {
      setSelectedextraChrust((prev) =>
        prev.filter((s) => s.chrustId !== chrust.chrustId)
      );
    } else {
      setSelectedextraChrust((prev) => [
        ...prev,
        {
          price: chrust.price || "0",
          chrustId: chrust.chrustId,
          chrustName: chrust.chrustName,
        },
      ]);
    }
  };

  

     const increase = () => {
    setquantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity == 0) {
      setquantity(0);
    } else {
      setquantity(quantity - 1);
    }
  };
    return ( <>
    <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header>
            <Modal.Title>
                <button className="btn-close" type="button" dismiss="modal" onClick={handleClose}></button>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6}>
                <div className="modal-thumb">
                    <div className="product-big-img bg-color2">
                        <div className="dishes-modal-thumb">
                    <img src="/assets/img/dishes/dishes1_2.png" alt="" />

                        </div>
                    </div>
                </div>
                <div className="modal-details">
                    <div className="product-about">
                        <div className="title-wrapper">
                            <h2 className="product-title">3 pcs Chicken Tender</h2>
                            <p className="price">$7.99 - $7.99</p>
                        </div>
                    </div>
                </div>
                </Col>
                <Col md={6}>
                <h2>Item Options</h2>
                <p>Required - Choose one.</p>
                <Form.Check 
                type="radio"
                name="size"
                label="5 pic"
                />
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <div className="root_cart">
                <p>Quantity</p>
                <div className="qty-wrapper">

                    <Button className="btn_ast" onClick={decrease}>
                        <p className="assets">-</p>
                    </Button>
                   
                    <div className="add_cart_number">
              <p className="txt_number"> {quantity} </p>
                    </div>
                     <Button className="btn_ast" onClick={increase}>
                        <p className="assets">+</p>
                    </Button>
                </div>
            </div>
            <Button className="theme-btn">
            <p className="txt_addcart">Add to Cart <i className="bi bi-cart"></i></p>
          </Button>
        </Modal.Footer>
    </Modal>
    </> );
}

export default AddToCartModal;