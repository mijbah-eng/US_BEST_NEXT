import Link from 'next/link';
import DropDown from './DropDown';

export default function Nav({ setMobileToggle }) {
  return (
    <ul className="cs_nav_list fw-medium">
      <li className="menu-item-has-children">
        <Link href="/">Home</Link>
        <DropDown>
          <ul>
            <li>
              <Link href="/" onClick={() => setMobileToggle(false)}>
              Home Version 1
              </Link>
            </li>
            <li>
              <Link href="/home2" onClick={() => setMobileToggle(false)}>
              Home Version 2
              </Link>
            </li>
            <li>
              <Link href="/home3" onClick={() => setMobileToggle(false)}>
                Home Version 3
              </Link>
            </li>            
          </ul>
        </DropDown>
      </li>
      <li className="menu-item-has-children">
        <Link href="#">Pages</Link>
        <DropDown>
          <ul>
          <li>
              <Link href="/about" onClick={() => setMobileToggle(false)}>
                About Us 1
              </Link>
            </li>
            <li>
              <Link href="/about2" onClick={() => setMobileToggle(false)}>
                About Us 2
              </Link>
            </li>            
            <li>
              <Link href="/chef" onClick={() => setMobileToggle(false)}>
              Chef
              </Link>
            </li>            
            <li>
              <Link href="/chef/chef-details" onClick={() => setMobileToggle(false)}>
              Chef Details 1
              </Link>
            </li> 
            <li>
              <Link href="/chef/chef-details2" onClick={() => setMobileToggle(false)}>
              Chef Details 2
              </Link>
            </li>                       
            <li>
              <Link href="/gallery" onClick={() => setMobileToggle(false)}>
              Gallery
              </Link>
            </li> 
            <li>
              <Link href="/service" onClick={() => setMobileToggle(false)}>
              Services
              </Link>
            </li>
            <li>
              <Link href="/service/service-details" onClick={() => setMobileToggle(false)}>
              Service Details
              </Link>
            </li>                        
            <li>
              <Link href="/testimonial" onClick={() => setMobileToggle(false)}>
              Testimonials
              </Link>
            </li>  
            <li>
              <Link href="/reservation" onClick={() => setMobileToggle(false)}>
              Reservation
              </Link>
            </li>                      
            <li>
              <Link href="/faq" onClick={() => setMobileToggle(false)}>
              Faq
              </Link>
            </li> 
                      
          </ul>
        </DropDown>
      </li>  

      <li className="menu-item-has-children">
        <Link href="/menu" onClick={() => setMobileToggle(false)}>
        Food Menu
        </Link>
        <DropDown>
          <ul>
            <li>
              <Link href="/menu" onClick={() => setMobileToggle(false)}>
              Food Menu 1
              </Link>
            </li>          
            <li>
              <Link href="/menu2" onClick={() => setMobileToggle(false)}>
              Food Menu 2
              </Link>
            </li>
          </ul>
        </DropDown>
      </li> 
      
      <li className="menu-item-has-children">
        <Link href="/blog" onClick={() => setMobileToggle(false)}>
          Blog
        </Link>
        <DropDown>
          <ul>
            <li>
              <Link href="/blog" onClick={() => setMobileToggle(false)}>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/blog-standard" onClick={() => setMobileToggle(false)}>
                Blog Standard
              </Link>
            </li>            
            <li>
              <Link href="/blog-sidebar" onClick={() => setMobileToggle(false)}>
                Blog With Sidebar
              </Link>
            </li>                         
            <li>
              <Link
                href="/blog/blog-details"
                onClick={() => setMobileToggle(false)}
              >
                Blog Details
              </Link>
            </li>
          </ul>
        </DropDown>
      </li>
      <li className="menu-item-has-children">
        <Link href="/shop" onClick={() => setMobileToggle(false)}>
        Shop
        </Link>
        <DropDown>
          <ul>
            <li>
              <Link href="/shop" onClick={() => setMobileToggle(false)}>
              Shop
              </Link>
            </li>
            <li>
              <Link href="/shop-list" onClick={() => setMobileToggle(false)}>
                Shop List
              </Link>
            </li>   
            <li>
              <Link href="/shop-list-right" onClick={() => setMobileToggle(false)}>
                Shop List Right Sidebar
              </Link>
            </li>   
            <li>
              <Link href="/shop/shop-details" onClick={() => setMobileToggle(false)}>
                Shop Details
              </Link>
            </li>  
            <li>
              <Link href="/shop/cart" onClick={() => setMobileToggle(false)}>
                Cart
              </Link>
            </li>  
            <li>
              <Link href="/shop/checkout" onClick={() => setMobileToggle(false)}>
                Checkout
              </Link>
            </li>   
            <li>
              <Link href="/shop/wishlist" onClick={() => setMobileToggle(false)}>
              Wishlist
              </Link>
            </li>                                                                             
          </ul>
        </DropDown>
      </li>
      <li className="menu-item-has-children">
        <Link href="/contact" onClick={() => setMobileToggle(false)}>
        Contact
        </Link>
        <DropDown>
          <ul>
            <li>
              <Link href="/contact" onClick={() => setMobileToggle(false)}>
              Contact Us 1
              </Link>
            </li>
            <li>
              <Link href="/contact2" onClick={() => setMobileToggle(false)}>
                Contact Us 2
              </Link>
            </li>                         
          </ul>
        </DropDown>
      </li>

    </ul>
  );
}
