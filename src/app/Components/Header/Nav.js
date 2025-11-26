import Image from "next/image";
import Link from "next/link";
import DropDown from "./DropDown";
import basecatagories from "../../../../utility/config";

const megaMenu = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function Nav({ categories }) {
  return (
    <ul className="cs_nav_list fw-medium">
      <li className="">
        <Link href="/">Home</Link>
      </li>
      <li className="menu-item-has-children megaMenu">

                        <a
                          onClick={() => {
                            localStorage.removeItem("categoryId");
                          }}
                        >
                          Menu
                        </a>

        <DropDown>
          <ul>
            <li>
              <div className="row mega-menu">
                {categories.length === 0 ? (
                  <p>Loading categories...</p>
                ) : (
                  categories.map((category, index) => {
                    const imageUrl = `${basecatagories}category/${encodeURIComponent(
                      category.image
                    )}`;
                    return (
                      <div key={index} className="col-md-6 col-lg-4">
                        <Link 
                          href={{
                            pathname: "/shop-right-sidebar",
                            query: { categoryId: category.categoryId },
                          }}
                        >
                        <div className="mega-menu-box"
                         onClick={() => {
                              localStorage.setItem(
                                "categoryId",
                                category.categoryId
                              );
                              window.dispatchEvent(new Event("storageUpdate"));
                            }}
                        >
                          <div className="mega-menu-media">
                            <div className="mega-menu-media-img">
                              <div className="mega-menu-thumbnail">

                                  <Image
                                    src={imageUrl}
                                    alt={category.categoryName}
                                    width={80}
                                    height={80}
                                  />
                                  <span></span>
                                
                              </div>
                            </div>
                            <div className="mega-menu-media-info">
                              <h4 className="mega-menu-heading">
                                <Link 
                                href={{
                            pathname: "/shop-right-sidebar",
                            query: { categoryId: category.categoryId },
                          }} >
                                  {category.categoryName} <span></span>
                                </Link>
                              </h4>
                              <div className="mega-menu-desc">
                                 {category.description
                                  ? category.description
                                      .split(" ")
                                      .slice(0, 7)
                                      .join(" ") +
                                    (category.description.split(" ").length > 7
                                      ? "..."
                                      : "")
                                  : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                        </Link>
                      </div>
                    );
                  })
                )}
                {/* {megaMenu.map((item, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="mega-menu-box">
                      <div className="mega-menu-media">
                        <div className="mega-menu-media-img">
                          <div className="mega-menu-thumbnail">
                            <Link href={"/"}>
                              <Image
                                src={"/assets/img/menu/menuThumb3_1.png"}
                                width={100}
                                height={100}
                              />
                              <span></span>
                            </Link>
                          </div>
                        </div>
                        <div className="mega-menu-media-info">
                          <h4 className="mega-menu-heading">
                            <Link href={"/menu2"} alt="">
                              Whole Wings <span></span>
                            </Link>
                          </h4>
                          <div className="mega-menu-desc">24 Wings Flavors</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}

                <div className="col-md-12 col-lg-12 d-flex justify-content-center">
                  <Link href={"/menu2"} className="theme-btn" alt="">
                    View All Menu <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </DropDown>
      </li>
      <li>
        <Link href="/delivery-partner">Delivery</Link>
      </li>
      <li>
        <Link href="/gallery">Gallery</Link>
      </li>
      <li>
        <Link href="/reservation">Catering</Link>
      </li>

      <li className="">
        <Link href="/contact2">Contact</Link>
      </li>
    </ul>
  );
}
