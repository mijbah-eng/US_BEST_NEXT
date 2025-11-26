"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import basecatagories from "../../../../utility/config";
import { mainmenu } from "../../../../utility/slice/GetCategoryMenumain";
import DishesCard from "../DishesCard/DishesCard";
import CategoryTab from "./CategoryTab";

const BestSelling1 = () => {
  const [isActive, setIsActive] = useState("FastFood");

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
  console.log("item =>", item);

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
              isActive={isActive}
              setIsActive={setIsActive}
              data={itemCategorymenu}
              onCategorySelect={handleCategorySelect}
              selectedCategoryId={selectedCategoryId}
            />
            {/* content */}
            <div className="tab-content">
              {/* FAST FOOD */}
              {item?.length > 0
                ? item.map((cat, catIndex) => (
                    <div className="tab-pane active" key={cat.categoryName}>
                      <div className="food-title">
                        <h2>{cat.categoryName}</h2>
                      </div>

                      <div className="dishes-card-wrap style1">
                        {cat?.menu?.length > 0
                          ? cat.menu.map((item, index) => {
                              const imageUrl = `${basecatagories}menu/${encodeURIComponent(
                                item.image
                              )}`;

                              return (
                                <DishesCard
                                  show={showModal}
                                  handleClose={handleCloseModal}
                                  product={selectedProduct}
                                  item={item}
                                  imageUrl={imageUrl}
                                  key={index}
                                  handleAddToCartClick={handleAddToCartClick}
                                  setSelectedProduct={setSelectedProduct}
                                />
                              );
                            })
                          : "Data Not Found"}
                      </div>
                    </div>
                  ))
                : "Category Not Found"}
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
