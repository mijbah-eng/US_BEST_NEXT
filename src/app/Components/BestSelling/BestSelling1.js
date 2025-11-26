"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DishesCard from "../DishesCard/DishesCard";
import { mainmenu } from "../../../../utility/slice/GetCategoryMenumain";
import CategoryTab from "./CategoryTab";
import basecatagories from "../../../../utility/config";

const BestSelling1 = () => {
  const [isActive, setIsActive] = useState("FastFood");
  const tabs = [
    {
      key: "FastFood",
      title: "Fast Food",
      img: "/assets/img/menu/menuIcon1_1.png",
    },
    {
      key: "DrinkJuice",
      title: "Drink & Juice",
      img: "/assets/img/menu/menuIcon1_2.png",
    },
    {
      key: "ChickenPizza",
      title: "Chicken Pizza",
      img: "/assets/img/menu/menuIcon1_3.png",
    },
    {
      key: "FreshPasta",
      title: "Fresh Pasta",
      img: "/assets/img/menu/menuIcon1_4.png",
    },
  ];
  const foodItems = [
    {
      img: "/assets/img/dishes/dishes1_1.png",
      title: "Chicken Fried Rice",
      content: "The registration fee",
      price: "$100.99",
    },
    {
      img: "/assets/img/dishes/dishes1_2.png",
      title: "Chinese Pasta",
      content: "The registration fee",
      price: "$15.99",
    },
    {
      img: "/assets/img/dishes/dishes1_3.png",
      title: "Chicken Pizza",
      content: "The registration fee",
      price: "$26.99",
    },
    {
      img: "/assets/img/dishes/dishes1_4.png",
      title: "Chicken Noodles",
      content: "The registration fee",
      price: "$39.00",
    },
    {
      img: "/assets/img/dishes/dishes1_5.png",
      title: "Grilled Chicken",
      content: "The registration fee",
      price: "$20.99",
    },
  ];
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [item, setItem] = useState([]); // now stores categories with menu
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();

  // get categoryId from localStorage
  useEffect(() => {
    const handleUpdate = () => {
      const catId = localStorage.getItem("categoryId");
      setCategoryId(catId);
    };

    window.addEventListener("storageUpdate", handleUpdate);
    handleUpdate(); // run once on mount

    return () => {
      window.removeEventListener("storageUpdate", handleUpdate);
    };
  }, []);

  // Get query params from URL safely on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catId = params.get("categoryId");
      setCategoryId(catId);
    }
  }, []);

  useEffect(() => {
    dispatch(mainmenu());
  }, [dispatch]);

  const { itemCategorymenu, loading } = useSelector(
    (state) => state.itemCategorymenu
  );

  useEffect(() => {
    if (categoryId && itemCategorymenu.length > 0) {
      handleCategorySelect(categoryId);
    } else if (itemCategorymenu.length > 0) {
      allProductShow();
    }
  }, [categoryId, itemCategorymenu]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    const menudata = itemCategorymenu.find(
      (item) => item.categoryId == categoryId
    );

    if (menudata) {
      setSelectedCategory(menudata);
      setItem([
        {
          categoryName: menudata.categoryName,
          menu: menudata.menu || [],
        },
      ]);
    }
  };

  const allProductShow = () => {
    setSelectedCategory(null);
    const allCategories = itemCategorymenu.map((cat) => ({
      categoryName: cat.categoryName,
      menu: cat.menu || [],
    }));
    setItem(allCategories);
  };
   const handleAddToCartClick = (product) => {
    const imageUrl = `${basecatagories}menu/${encodeURIComponent(
      product.image
    )}`;
    setSelectedProduct({ ...product, image: imageUrl });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };
console.log("item =>",item);

  return (
    <section className="popular-dishes-section fix section-padding">
      <div className="popular-dishes-wrapper style1">
        <div className="shape1 d-none d-xxl-block">
          <Image
            src="/assets/img/shape/popularDishesShape1_1.png"
            alt="img"
            width={164}
            height={183}
          />
        </div>
        <div className="shape2 float-bob-y d-none d-xxl-block">
          <Image
            src="/assets/img/shape/popularDishesShape1_2.png"
            alt="img"
            width={239}
            height={149}
          />
        </div>
        <div className="container">
          <div className="title-area">
            <div
              className="sub-title text-center wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <Image
                className="me-1"
                src="/assets/img/icon/titleIcon.svg"
                alt="img"
                width={20}
                height={20}
              />
              FOOD MENU
              <Image
                className="ms-1"
                src="/assets/img/icon/titleIcon.svg"
                alt="img"
                width={20}
                height={20}
              />
            </div>
            <h2 className="title wow fadeInUp" data-wow-delay="0.7s">
              Fresheat Foods Menu
            </h2>
          </div>
          <div className="food-menu-tab">
            {/* tab */}
            <CategoryTab
            isActive={isActive} setIsActive={setIsActive}
            data={itemCategorymenu}
            onCategorySelect={handleCategorySelect}
            selectedCategoryId={selectedCategoryId}
            />
            {/* content */}
            <div className="tab-content">
              {/* FAST FOOD */}
             {item?.length > 0 ? (
                  item.map((cat, catIndex) => (
                    <div className="tab-pane active" key={cat.categoryName}>
                      <div className="food-title">
                        <h2>{cat.categoryName}</h2>
                      </div>

                      <div className="dishes-card-wrap style1">
                        {cat?.menu?.length > 0 ? (
                          cat.menu.map((item, index) => {
                            const imageUrl = `${basecatagories}menu/${encodeURIComponent(item.image)}`;
                            return <DishesCard item={item} imageUrl={imageUrl} key={index} handleAddToCartClick={handleAddToCartClick} setSelectedProduct={setSelectedProduct} />;
                          })
                        ) : (
                          "Data Not Found"
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  "Category Not Found"
                )}
               
              

              {/* DRINK JUICE */}
              {isActive === "DrinkJuice" && (
                <div className="tab-pane active">
                  <div className="food-title">
                    <h2>Drink & Juice</h2>
                  </div>

                  <div className="dishes-card-wrap style1">
                    {foodItems.map((item, i) => (
                      <div key={i} className="dishes-card style1">
                        <div className="dishes-thumb">
                          <Image
                            src={item.img}
                            alt="img"
                            width={158}
                            height={158}
                          />
                        </div>

                        <Link href="/menu">
                          <h3>{item.title}</h3>
                        </Link>
                        <p>{item.content}</p>
                        <h6>{item.price}</h6>

                        <div className="social-profile">
                          <span className="plus-btn">
                            <Link href="/shop/wishlist">
                              <i className="bi bi-heart"></i>
                            </Link>
                          </span>
                          <ul>
                            <li>
                              <Link href="/shop/cart">
                                <i className="bi bi-basket2"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CHICKEN PIZZA */}
              {isActive === "ChickenPizza" && (
                <div className="tab-pane active">
                  <div className="food-title">
                    <h2>Chicken Pizza</h2>
                  </div>

                  <div className="dishes-card-wrap style1">
                    {foodItems.map((item, i) => (
                      <div key={i} className="dishes-card style1">
                        <div className="dishes-thumb">
                          <Image
                            src={item.img}
                            alt="img"
                            width={158}
                            height={158}
                          />
                        </div>

                        <Link href="/menu">
                          <h3>{item.title}</h3>
                        </Link>
                        <p>{item.content}</p>
                        <h6>{item.price}</h6>

                        <div className="social-profile">
                          <span className="plus-btn">
                            <Link href="/shop/wishlist">
                              <i className="bi bi-heart"></i>
                            </Link>
                          </span>
                          <ul>
                            <li>
                              <Link href="/shop/cart">
                                <i className="bi bi-basket2"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="btn-wrapper  wow fadeInUp" data-wow-delay="0.9s">
            <Link className="theme-btn" href="/menu2">
              VIEW ALL ITEM <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSelling1;
