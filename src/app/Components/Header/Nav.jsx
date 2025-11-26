import Link from "next/link";
import DropDown from "./DropDown";
import Image from "next/image";
const megaMenu = [1,2,3,4,5,6,7,8,9]
export default function Nav() {
  return (
    <ul className="cs_nav_list fw-medium">
      <li className="">
        <Link href="/">Home</Link>
        {/* <DropDown>
          <ul>
            <li>
              <Link href="/">Home Version 1</Link>
            </li>
            <li>
              <Link href="/home2">Home Version 2</Link>
            </li>
            <li>
              <Link href="/home3">Home Version 3</Link>
            </li>
          </ul>
        </DropDown> */}
      </li>
      {/* <li className="menu-item-has-children">
        <Link href="#">Pages</Link>
        <DropDown>
          <ul>
            <li>
              <Link href="/about">About Us 1</Link>
            </li>
            <li>
              <Link href="/about2">About Us 2</Link>
            </li>
            <li>
              <Link href="/chef">Chef</Link>
            </li>
            <li>
              <Link href="/chef/chef-details">Chef Details 1</Link>
            </li>
            <li>
              <Link href="/chef/chef-details2">Chef Details 2</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/service">Services</Link>
            </li>
            <li>
              <Link href="/service/service-details">Service Details</Link>
            </li>
            <li>
              <Link href="/testimonial">Testimonials</Link>
            </li>
            <li>
              <Link href="/reservation">Reservation</Link>
            </li>
            <li>
              <Link href="/faq">Faq</Link>
            </li>
          </ul>
        </DropDown>
      </li> */}

      <li className="menu-item-has-children megaMenu">
        <Link href="/menu2" alt="menu">Menu</Link>
        <DropDown>
          <ul>
            <li>
              <div className="row mega-menu">
                {megaMenu.map((item,index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <div className="mega-menu-box">
                    <div className="mega-menu-media">
                      <div className="mega-menu-media-img">
                        <div className="mega-menu-thumbnail">
                          <Link href={"/"}>
                          <Image src={'/assets/img/menu/menuThumb3_1.png'} width={100} height={100}  />
                          <span></span>
                          </Link>

                        </div>
                      </div>
                      <div className="mega-menu-media-info">
                        <h4 className="mega-menu-heading">
                          <Link href={"/menu2"} alt="">Whole Wings <span></span></Link>
                        </h4>
                        <div className="mega-menu-desc">24 Wings Flavors</div>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
                
                <div className="col-md-12 col-lg-12 d-flex justify-content-center">
                  <Link href={"/menu2"} className="theme-btn" alt="">View All Menu <i className="bi bi-arrow-right"></i></Link>
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
      
      {/* <li className="menu-item-has-children">
        <Link href="/shop">Shop</Link>
        <DropDown>
          <ul>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/shop-list">Shop List</Link>
            </li>
            <li>
              <Link href="/shop-list-right">Shop List Right Sidebar</Link>
            </li>
            <li>
              <Link href="/shop/shop-details">Shop Details</Link>
            </li>
            <li>
              <Link href="/shop/cart">Cart</Link>
            </li>
            <li>
              <Link href="/shop/checkout">Checkout</Link>
            </li>
            <li>
              <Link href="/shop/wishlist">Wishlist</Link>
            </li>
          </ul>
        </DropDown>
      </li> */}
      <li className="">
        <Link href="/contact2">Contact</Link>
      </li>
    </ul>
  );
}
