"use client";
import { useEffect, useState } from "react";
import "./mode.css"
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import basecatagories, { base_url, resturantId } from "../../../../utility/config";
import { auth } from "../../../../utility/firebase/firebase";
import Loader from "../Loader/Loader";

function AddToCartModal({ show, handleClose, product }) {
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
      } else {
        handleSizeSelection({
          customtype: response.data?.menu.customeType[0]?.customtype,
          cprice: response.data?.menu.customeType[0]?.cprice,
          saucecount: response.data?.menu.customeType[0]?.saucecount,
          sidecount: response.data?.menu.customeType[0]?.sidecount
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
        // ...prev,
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

  // Extra (single)
  const toggleExtra = (extra) => {
    const exists = selectedextra.find((s) => s.extraId === extra.extraId);
    if (exists) {
      setSelectedextra((prev) =>
        prev.filter((s) => s.extraId !== extra.extraId)
      );
    } else {
      setSelectedextra((prev) => [
        ...prev,
        {
          price: extra.price || "0",
          extraId: extra.extraId,
          extraName: extra.extraName,
        },
      ]);
    }
  };

  // side handle
  const toggleSide = (side) => {
    const sideLimit = Number(selectedSize?.sidecount);
    console.log(selectedSize, '>>>>>>>>>>', sideLimit);

    const exists = selectedside.find((s) => s.sideId === side.sideId);
    if (exists) {
      setSelectedside((prev) => prev.filter((s) => s.sideId !== side.sideId));
    } else {
      if (!isNaN(sideLimit) && sideLimit > 0 && selectedside.length >= sideLimit) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: `You can select a maximum of ${sideLimit} Side.`,
          didOpen: () => {
            const swalContainer = document.querySelector('.swal2-container');
            if (swalContainer) {
              swalContainer.style.zIndex = '9999999';
            }
          }
        });
        return;
      }
      setSelectedside((prev) => [
        ...prev,
        {
          price: side.price || "0",
          sideId: side.sideId,
          sideName: side.sideName,
        },
      ]);
    }
  };

  // Extraside handle
  const toggleextraSide = (side) => {
    const exists = selectedextraside.find((s) => s.sideId === side.sideId);
    if (exists) {
      setSelectedextraside((prev) =>
        prev.filter((s) => s.sideId !== side.sideId)
      );
    } else {
      setSelectedextraside((prev) => [
        ...prev,
        {
          price: side.price || "0",
          sideId: side.sideId,
          sideName: side.sideName,
        },
      ]);
    }
  };

  // ingredient handle
  const toggleIngredient = (ingredient) => {
    const exists = selectedingredient.find(
      (s) => s.ingredientId === ingredient.ingredientId
    );
    if (exists) {
      setSelectedingredient((prev) =>
        prev.filter((s) => s.ingredientId !== ingredient.ingredientId)
      );
    } else {
      setSelectedingredient((prev) => [
        ...prev,
        {
          price: ingredient.price || "0",
          ingredientId: ingredient.ingredientId,
          ingredientName: ingredient.ingredientName,
        },
      ]);
    }
  };

  // Extraingredient handle
  const toggleextraIngredient = (ingredient) => {
    const exists = selectedextraingredient.find(
      (s) => s.ingredientId === ingredient.ingredientId
    );
    if (exists) {
      setSelectedextraingredient((prev) =>
        prev.filter((s) => s.ingredientId !== ingredient.ingredientId)
      );
    } else {
      setSelectedextraingredient((prev) => [
        ...prev,
        {
          price: ingredient.price || "0",
          ingredientId: ingredient.ingredientId,
          ingredientName: ingredient.ingredientName,
        },
      ]);
    }
  };

  // meatpreparation handle
  const toggleMeatpreparation = (meatpreparation) => {
    const exists = selectedmeatpreparation.find(
      (s) => s.meatpreparationId === meatpreparation.meatpreparationId
    );
    if (exists) {
      setSelectedmeatpreparation((prev) =>
        prev.filter(
          (s) => s.meatpreparationId !== meatpreparation.meatpreparationId
        )
      );
    } else {
      setSelectedmeatpreparation((prev) => [
        ...prev,
        {
          price: meatpreparation.price || "0",
          meatpreparationId: meatpreparation.meatpreparationId,
          meatpreparationName: meatpreparation.meatpreparationName,
        },
      ]);
    }
  };

  // Extrameatpreparation handle
  const toggleextraMeatpreparation = (meatpreparation) => {
    const exists = selectedextrameatpreparation.find(
      (s) => s.meatpreparationId === meatpreparation.meatpreparationId
    );
    if (exists) {
      setSelectedextrameatpreparation((prev) =>
        prev.filter(
          (s) => s.meatpreparationId !== meatpreparation.meatpreparationId
        )
      );
    } else {
      setSelectedextrameatpreparation((prev) => [
        ...prev,
        {
          price: meatpreparation.price || "0",
          meatpreparationId: meatpreparation.meatpreparationId,
          meatpreparationName: meatpreparation.meatpreparationName,
        },
      ]);
    }
  };

  // combotag handle
  const togglecombotag = (combotag) => {
    const exists = selectedcombotag.find(
      (s) => s.combotagId === combotag.combotagId
    );
    if (exists) {
      setSelectedcombotag((prev) =>
        prev.filter((s) => s.combotagId !== combotag.combotagId)
      );
    } else {
      setSelectedcombotag((prev) => [
        ...prev,
        {
          price: combotag.price || "0",
          combotagId: combotag.combotagId,
          combotagName: combotag.combotagName,
        },
      ]);
    }
  };

  const calculateTotalPrice = () => {
    const arrays = [
      selectedToppings,
      selectedExtraToppings,
      selectedSauces,
      selectedExtraSauces,
      selectedExtrasoda,
      selectedsoda,
      selectedstyle,
      selectedexrastyle,
      selectedfish,
      selectedextrafish,
      selectedchrust,
      selectedextraChrust,
      selectedside,
      selectedextraside,
      selectedingredient,
      selectedextraingredient,
      selectedmeatpreparation,
      selectedextrameatpreparation,
      selectedextra,
      selectedcombotag,
      selectedSize,
    ];
    let total = 0;
    arrays.forEach((arr) => {
      if (Array.isArray(arr)) {
        arr.forEach((item) => {
          const price = parseFloat(item?.price) || 0;
          total += price;
        });
      }
    });

    total = total + parseFloat(selectedSize?.cprice);
    setTotalprice(Number.isFinite(total) ? parseFloat(total.toFixed(2)) : 0);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [
    selectedSize,
    selectedToppings,
    selectedExtraToppings,
    selectedSauces,
    selectedExtraSauces,
    selectedsoda,
    selectedExtrasoda,
    selectedstyle,
    selectedexrastyle,
    selectedfish,
    selectedextrafish,
    selectedchrust,
    selectedextraChrust,
    selectedside,
    selectedextraside,
    selectedingredient,
    selectedextraingredient,
    selectedmeatpreparation,
    selectedextrameatpreparation,
    selectedcombotag,
    selectedextra,
    selectedSize,
  ]);

  const handleAddToCart = async () => {
    if (!selectedSize || quantity <= 0) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please Select Size and Quantity.",
      });
      return;
    }

    const payload = {
      fish: selectedfish,
      side: selectedside,
      size: selectedSize?.customtype || "Regular",
      soda: selectedsoda,
      uuid: product.uuid || "",
      sauce: selectedSauces,
      style: selectedstyle,
      chrust: selectedchrust,
      extra: selectedextra,
      menuId: product.menuId || "",
      topping: selectedToppings.map((t) => ({
        type: t.type,
        price: t.price || "0",
        toppingId: t.id || "",
        toppingName: t.name,
      })),
      menuName: menu.menuName || "",
      quantity,
      Extrafish: selectedextrafish,
      Extraside: selectedextraside,
      Extrasoda: selectedExtrasoda,
      Extraextra: selectedextrafish,
      Extrasauce: selectedExtraSauces,
      Extrastyle: selectedexrastyle,
      ingredient: selectedingredient,
      Extrachrust: selectedextraChrust,
      Extratopping: selectedExtraToppings.map((e) => ({
        type: e.type,
        price: e.price || "0",
        toppingId: e.id || "",
        toppingName: e.name,
      })),
      Extracombotag: selectedcombotag,
      Extraingredient: selectedextraingredient,
      meatpreparation: selectedmeatpreparation,
      Extrameatpreparation: selectedextrameatpreparation,
      menuPrice: selectedSize?.cprice || menu.price || 0,
    };

    const auth = getAuth();

    const user = await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        unsubscribe();
        resolve(firebaseUser);
      });
    });

    let userLog = localStorage.getItem('userLog');
    if (!user) {
      console.log(userLog);
      if (!userLog) {
        setPendingCartPayload(payload);
        setShowLoginModal(true);
        return;
      } else {
        await addToCartApi(payload, null);
      }
    }

    await proceedWithAddToCart(user, payload);
  };

  const proceedWithAddToCart = async (user, payload) => {
    try {
      const idToken = await user.getIdToken();
      localStorage.setItem('userLog', 'LoginUser');
      localStorage.setItem("id_token", idToken);

      let token = localStorage.getItem("jwt_token");

      if (!token) {
        const loginRes = await fetch(
          "https://admin.foodstek.com/api/firebaseLogin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          }
        );

        const data = await loginRes.json();
        token = data.token;
        localStorage.setItem("jwt_token", token);
      }

      await addToCartApi(payload, token);
      setShowLoginModal(false);
    } catch (error) {
      console.error("Error in proceedWithAddToCart:", error);
    }
  };

  const handleFirebaseLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('userLog', 'LoginUser');
      await proceedWithAddToCart(user, pendingCartPayload);
      setPendingCartPayload(null);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const ContinueAsGuest = async () => {
    localStorage.setItem('userLog', 'Guest');
    await addToCartApi(pendingCartPayload, null);
    setShowLoginModal(false);
    setPendingCartPayload(null);
  };

  const addToCartApi = async (item, token) => {
    const uuid = Cookies.get("uuid");
    console.log(item);

    try {
      setLoading(true);
      let id_token = localStorage.getItem("id_token");
      const res = await axios.post(`${base_url}/api/AddtoCartMenu`, {
        resturantId: resturantId,
        user_uuid: uuid,
        menuId: product.menuId,
        menuName: menu.menuName,
        menuPrice: totalPrice,
        quantity: quantity,
        sizeDetails: selectedSize?.customtype || "Regular",
        details: item,
        idToken: id_token,
      });
      if (res.status) {
        handleClose();
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Added to Cart!",
          text: "Your item was successfully added to the cart.",
          confirmButtonText: "Go to Cart",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/shop/cart");
          }
        });
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  const imageUrl = `${basecatagories}menu/${encodeURIComponent(menu.image)}`;
  let priceDisplay = "";
  if (menu.price) {
    priceDisplay = `$${menu.price}`;
  } else {
    try {
      const priceArray = menu.customeType;
      if (priceArray?.length > 1) {
        priceDisplay = `$${priceArray[0].cprice} - $${priceArray[priceArray.length - 1].cprice}`;
      } else {
        priceDisplay = `$${priceArray?.[0]?.cprice}`;
      }
    } catch (err) {
      priceDisplay = "Price not available";
    }
  }


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
  return (<>
    {loading && <Loader />}
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
                  <img src={imageUrl} alt={menu?.menuName} />

                </div>
              </div>
            </div>
            <div className="modal-details">
              <div className="product-about">
                <div className="title-wrapper">
                  <h2 className="product-title">{menu?.menuName}</h2>
                  <h5 className="price">{totalPrice === 0 ? priceDisplay : `$ ${totalPrice}`}</h5>
                  <p className="text-muted">{menu?.description}</p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6} className="list_box">
            <div>
              <h2>Item Options</h2>
              <h5>Select Size</h5>
              {menu.type === "custom" && menu.customeType?.length > 0 ? (
                menu.customeType.map((m, index) => {
                  const id = `size-${index + 1}`;
                  return (
                    <Form.Check
                      key={index}
                      type="radio"
                      name="size"

                      label={`${m.customtype} - $${m.cprice}`}
                      defaultChecked={index === 0}
                      onChange={() => {
                        handleSizeSelection(m);
                        setitemsizeindex(index + 1);
                        calculateTotalPrice();
                      }}
                    />
                  )
                })
              ) : (
                <Form.Check
                  type="radio"
                  name="size"
                  label={`Regular - $${menu.price}`}
                  defaultChecked
                  onChange={() => {
                    handleSizeSelection({
                      customtype: "Regular",
                      cprice: menu.price,
                    });
                    setitemsizeindex(1);
                    calculateTotalPrice();
                  }}
                />
              )}
            </div>

            {/* Regular Toppings */}
            {menudetails?.topping?.length > 0 && (
              <div className="mt-4">
                <h5>Toppings</h5>
                {menudetails.topping.map((item, index) => {
                  const id = `toppings-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={item.toppingName}
                        checked={isChecked(item.toppingName, selectedToppings)}
                        onChange={() =>
                          toggleTopping(
                            item.toppingName,
                            menudetails.topping,
                            selectedToppings,
                            setSelectedToppings
                          )
                        }
                      />
                      {isChecked(item.toppingName, selectedToppings) && (
                        <div className="ms-3 mt-1">
                          <ButtonGroup>
                            {["Left Half", "Right Half", "Whole"].map(
                              (option, idx) => (
                                <ToggleButton
                                  key={idx}
                                  id={`placement-${item.toppingName}-${idx}`}
                                  type="radio"
                                  className={`custom-toggle me-2 ${getPlacement(
                                    item.toppingName,
                                    selectedToppings
                                  ) === option
                                    ? "selected"
                                    : ""
                                    }`}
                                  name={`placement-${item.toppingName}`}
                                  value={option}
                                  checked={
                                    getPlacement(
                                      item.toppingName,
                                      selectedToppings
                                    ) === option
                                  }
                                  onChange={() =>
                                    updatePlacement(
                                      item.toppingName,
                                      option,
                                      selectedToppings,
                                      setSelectedToppings
                                    )
                                  }
                                >
                                  {option}
                                </ToggleButton>
                              )
                            )}
                          </ButtonGroup>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
            {/* chrust*/}
            {menudetails?.chrust?.length > 0 && (
              <div className="mt-4">
                <h5>Chrust</h5>
                {menudetails.chrust.map((item, index) => {
                  const id = `chrust-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={item.chrustName}
                        checked={selectedchrust.some(
                          (s) => s.chrustId === item.chrustId
                        )}
                        onChange={() => toggleChrust(item)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/* Sauces */}
            {menudetails?.sauce?.length > 0 && (
              <div className="mt-4">
                <h5>Sauce</h5>
                {menudetails.sauce.map((item, index) => {
                  const id = `sauces-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={item.sauce}
                        checked={selectedSauces.some(
                          (s) => s.sauceId === item.sauceId
                        )}
                        onChange={() => toggleSauce(item)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/* soda*/}
            {menudetails?.soda?.length > 0 && (
              <div className="mt-4">
                <h5>Soda</h5>
                {menudetails.soda.map((item, index) => {
                  const id = `soda-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={item.sodaName}
                        checked={selectedsoda.some(
                          (s) => s.sodaId === item.sodaId
                        )}
                        onChange={() => toggleSoda(item)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/*style*/}
            {menudetails?.style?.length > 0 && (
              <div className="mt-4">
                <h5>Style</h5>
                {menudetails.style.map((item, index) => {

                  const id = `style-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="radio"

                        label={item.styleName}
                        checked={selectedstyle.some(
                          (s) => s.styleId === item.styleId
                        )}
                        onChange={() => toggleStyle(item)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/*fish*/}
            {menudetails?.fish?.length > 0 && (
              <div className="mt-4">
                <h5>Fish</h5>
                {menudetails.fish.map((item, index) => {
                  const id = `fish-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={item.fishName}
                        checked={selectedfish.some(
                          (s) => s.fishId === item.fishId
                        )}
                        onChange={() => toggleFish(item)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/*side*/}
            {menudetails?.side?.length > 0 && (
              <div className="mt-4">
                <h5>Side</h5>
                {menudetails.side.map((item, index) => {
                  const id = `side-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={item.sideName}
                        checked={selectedside.some(
                          (s) => s.sideId === item.sideId
                        )}
                        onChange={() => toggleSide(item)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/*ingredient*/}
            {menudetails?.ingredient?.length > 0 && (
              <div className="mt-4">
                <h5>ingredient</h5>
                {menudetails.ingredient.map((item, index) => {
                  const id = `ingredient-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={item.ingredientName}
                        checked={selectedingredient.some(
                          (s) => s.ingredientId === item.ingredientId
                        )}
                        onChange={() => toggleIngredient(item)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/*meatpreparation*/}
            {menudetails?.meatpreparation?.length > 0 && (
              <div className="mt-4">
                <h5>meatpreparation</h5>
                {menudetails.meatpreparation.map((item, index) => {
                  const id = `meatpreparation-${index + 1}`;
                  (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={item.meatpreparationName}
                        checked={selectedmeatpreparation.some(
                          (s) => s.meatpreparationId === item.meatpreparationId
                        )}
                        onChange={() => toggleMeatpreparation(item)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/*Extra single*/}
            {menudetails?.extra?.length > 0 && (
              <div className="mt-4">
                <h5>extra</h5>
                {menudetails.extra.map((item, index) => {
                  const id = `extra-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={`${item.extraName} - $${item.price}`}
                        checked={selectedextra.some(
                          (s) => s.extraId === item.extraId
                        )}
                        onChange={() => {
                          toggleExtra(item);
                          calculateTotalPrice();
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/*combotag single*/}
            {menudetails?.combotag?.length > 0 && (
              <div className="mt-4">
                <h5>Combo</h5>
                {menudetails.combotag.map((item, index) => {
                  const id = `combo-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={`${item.combotagName} - $${item.price}`}
                        checked={selectedcombotag.some(
                          (s) => s.combotagId === item.combotagId
                        )}
                        onChange={() => {
                          togglecombotag(item);
                          calculateTotalPrice();
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/* -----------------Extra Details------------------- */}
            {menudetails?.extratopping?.length > 0 && (
              <div className="mt-4">
                <h5>Toppings</h5>
                {menudetails.extratopping.map((item, index) => {
                  // Parse toppingDetails safely
                  let toppingOptions = [];
                  try {
                    toppingOptions = item.toppingDetails
                      ? JSON.parse(item.toppingDetails)
                      : [];
                  } catch (error) {
                    console.error("Invalid toppingDetails JSON", error);
                  }
                  const id = `topping-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={item.toppingName}
                        checked={isChecked(
                          item.toppingName,
                          selectedExtraToppings
                        )}
                        onChange={() =>
                          toggleTopping(
                            item.toppingName,
                            menudetails.extratopping,
                            selectedExtraToppings,
                            setSelectedExtraToppings
                          )
                        }
                      />

                      {isChecked(item.toppingName, selectedExtraToppings) && (
                        <div className="ms-3 mt-1">
                          <ButtonGroup>
                            {toppingOptions.map((option, idx) => (
                              <ToggleButton
                                key={idx}
                                id={`extratopping-${item.toppingName}-${idx}`}
                                type="radio"
                                className={`custom-toggle me-2 ${getPlacement(
                                  item.toppingName,
                                  selectedExtraToppings
                                ) === option.type
                                  ? "selected"
                                  : ""
                                  }`}
                                name={`extratopping-${item.toppingName}`}
                                value={option.type}
                                checked={
                                  getPlacement(
                                    item.toppingName,
                                    selectedExtraToppings
                                  ) === option.type
                                }
                                onChange={() =>
                                  updatePlacement(
                                    item.toppingName,
                                    option.type,
                                    option.price,
                                    selectedExtraToppings,
                                    setSelectedExtraToppings
                                  )
                                }
                              >
                                {option.type} (${option.price})
                              </ToggleButton>
                            ))}
                          </ButtonGroup>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {/*Extra chrust*/}
            {menudetails?.extrachrust?.length > 0 && (
              <div className="mt-4">
                <h5>chrust</h5>
                {menudetails.extrachrust.map((item, index) => {
                  const id = `extra-chrust-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"
                        label={`${item.chrustName} - $${item.price}`}

                        checked={selectedextraChrust.some(
                          (s) => s.chrustId === item.chrustId
                        )}
                        onChange={() => {
                          toggleExtraChrust(item);
                          calculateTotalPrice();
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/*Extra Sauces */}
            {menudetails?.extrasauce?.length > 0 && (
              <div className="mt-4">
                <h5>Extra Sauce</h5>
                {menudetails.extrasauce.map((item, index) => {
                  const id = `extra-sauce-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={`${item.sauce} - $${item.price}`}
                        checked={selectedExtraSauces.some(
                          (s) => s.sauceId === item.sauceId
                        )}
                        onChange={() => {
                          toggleExtraSauce(item);
                          calculateTotalPrice();
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/* extrasoda*/}
            {menudetails?.extrasoda?.length > 0 && (
              <div className="mt-4">
                <h5>Extra Soda</h5>
                {menudetails.extrasoda.map((item, index) => {
                  const id = `extra-soda-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"
                        label={`${item.sodaName} - $${item.price}`}

                        checked={selectedExtrasoda.some(
                          (s) => s.sodaId === item.sodaId
                        )}
                        onChange={() => {
                          toggleExtraSoda(item);
                          calculateTotalPrice();
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/*Extra style*/}
            {menudetails?.extrastyle?.length > 0 && (
              <div className="mt-4">
                <h5>Extra Style</h5>
                {menudetails.extrastyle.map((item, index) => {
                  const updatedPrice = (item.price * itemsizeIndex).toFixed(2);
                  const id = `extra-style-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={`${item.styleName} - $${updatedPrice}`}
                        checked={selectedexrastyle.some(
                          (s) => s.styleId === item.styleId
                        )}
                        onChange={() => {
                          // create new object with updated price
                          const updatedItem = { ...item, price: updatedPrice };
                          toggleExtraStyle(updatedItem);
                          calculateTotalPrice();
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {/* Extra Fish*/}
            {menudetails?.extrafish?.length > 0 && (
              <div className="mt-4">
                <h5>Extra Fish</h5>
                {menudetails.extrafish.map((item, index) => {
                  const id = `extra-fish-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={`${item.fishName} - $${item.price}`}
                        checked={selectedextrafish.some(
                          (s) => s.fishId === item.fishId
                        )}
                        onChange={() => {
                          toggleExtraFish(item);
                          calculateTotalPrice();
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/*Extra side*/}
            {menudetails?.extraside?.length > 0 && (
              <div className="mt-4">
                <h5>Extra side</h5>
                {menudetails.extraside.map((item, index) => {
                  const id = `extra-side-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={`${item.sideName} - $${item.price}`}
                        checked={selectedextraside.some(
                          (s) => s.sideId === item.sideId
                        )}
                        onChange={() => {
                          toggleextraSide(item);
                          calculateTotalPrice();
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/*Extra ingredient*/}
            {menudetails?.extraingredient?.length > 0 && (
              <div className="mt-4">
                <h5>Extra Ingredient</h5>
                {menudetails.extraingredient.map((item, index) => {
                  const id = `extra-ingredient-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={`${item.ingredientName} - $${item.price}`}
                        checked={selectedextraingredient.some(
                          (s) => s.ingredientId === item.ingredientId
                        )}
                        onChange={() => {
                          toggleextraIngredient(item);
                          calculateTotalPrice();
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {/*Extra meatpreparation*/}
            {menudetails?.extrameatpreparation?.length > 0 && (
              <div className="mt-4">
                <h5>Extra Meatpreparation</h5>
                {menudetails.extrameatpreparation.map((item, index) => {
                  const id = `extra-meatpreparation-${index + 1}`;
                  return (
                    <div key={index}>
                      <Form.Check
                        type="checkbox"

                        label={`${item.meatpreparationName} - $${item.price}`}
                        checked={selectedextrameatpreparation.some(
                          (s) => s.meatpreparationId === item.meatpreparationId
                        )}
                        onChange={() => {
                          toggleextraMeatpreparation(item);
                          calculateTotalPrice();
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            )}
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
        <Button className="theme-btn" onClick={handleAddToCart}>
          <p className="txt_addcart">Add to Cart <i className="bi bi-cart"></i></p>
        </Button>
      </Modal.Footer>
    </Modal>

    {/* SECOND: Login Confirmation Modal */}
    <Modal
      show={showLoginModal}
      onHide={() => setShowLoginModal(false)}
      centered
    >
      <Modal.Body className="login-modal-body text-center">
        <img
          src="https://i.ibb.co/mFPTyM16/Chat-GPT-Image-Jul-3-2025-01-29-11-PM-Photoroom.jpg"
          alt="Login Illustration"
          className="modal-illustration"
        />
        <h5 className="modal-title-text">
          Do you want to login or continue as a guest?
        </h5>
        <p className="modal-subtext">
          If you log in, your order history will be saved. However, if you
          continue as a guest, you won’t be able to see your order history
          after completing your order.
        </p>
        <div className="modal-button-group">
          <Button
            variant="outline-secondary"
            className="modal-btn guest"
            onClick={ContinueAsGuest}
          >
            Guest
          </Button>
          <Button
            variant="success"
            className="modal-btn login"
            onClick={handleFirebaseLogin}
          >
            Login
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  </>);
}

export default AddToCartModal;