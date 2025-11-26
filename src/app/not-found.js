import Link from "next/link";
import BreadCumb from "./Components/Common/BreadCumb";

function notFound() {
    return ( <>
    <BreadCumb
        bgimg="/assets/img/bg/breadcumb.jpg"
        Title="404"
      ></BreadCumb>
     <section className="error-section section-bg section-padding fix">
        <div className="container">
          <div className="error-content text-center">
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              404
            </h2>
            <h3 className="wow fadeInUp" data-wow-delay=".5s">
              we’re sorry page not found
            </h3>
            <Link
              href="/"
              className="theme-btn style-line-height mt-5 wow fadeInUp"
              data-wow-delay=".7s"
            >
              <span className="button-text">Back To Home</span>
            </Link>
          </div>
        </div>
      </section>
    </> );
}

export default notFound;