
const Reservation = () => {
    return (
        <div className="reservation-section section-padding fix">
        <div className="reservation-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    {/* <div className="col-xl-6 d-flex align-items-center">
                        <div className="get-in-touch">
                            <h2>GET IN TOUCH</h2>
                            <p className="desc">Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore of magna aliqua. Ut enim ad minim veniam, made</p>
                            <div className="contact-info-wrapper">
                                <div className="contact-info">
                                    <h5>Contact</h5>
                                    <p>+012 3455 862 69</p>
                                </div>
                                <div className="contact-info">
                                    <h5>Email</h5>
                                    <p>companyInfo@gmail.com</p>
                                </div>
                            </div>
                            <div className="contact-info-wrapper">
                                <div className="contact-info">
                                    <h5>Address</h5>
                                    <p>Jackpark, Ghana</p>
                                </div>
                                <div className="contact-info">
                                    <h5>Follow</h5>
                                    <ul className="social-media">
                                        <li> <a href="https://www.facebook.com"> <i className="bi bi-facebook"></i>
                                            </a>
                                        </li>
                                        <li> <a href="https://www.x.com"> <i className="bi bi-twitter-x"></i>
                                            </a> </li>
                                        <li> <a href="https://www.youtube.com"> <i className="bi bi-youtube"></i> </a>
                                        </li>
                                        <li> <a href="https://www.linkedin.com"> <i className="bi bi-linkedin"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-xl-8">
                        <div className="reservation-form">
                            <div className="contact-form style2">
                                <h2>Order your <span className="text-theme-color">Catering</span> </h2>
                                <form className="row" action="#">
                                    <div className="col-md-6">
                                        <label className="mb-2" htmlFor="customerName">Customer Name*</label>
                                        <input id="customerName" name="customerName" type="text" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="mb-2" htmlFor="time">No of Person*</label>
                                        <input id="time" type="text"  name="noOfPerson" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="mb-2" htmlFor="phone">Give Phone Number*</label>
                                        <input id="phone" type="number" placeholder="Phone Number" name="phoneNumber" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="mb-2" htmlFor="service">Number of Guest*</label>
                                        <input id="service" type="date" name="date"  />
                                    </div>
                                     <div className="col-md-6">
                                        <label className="mb-2" htmlFor="email">Email Address*</label>
                                        <input id="email" type="email" placeholder="example@gmail.com" name="email" />
                                    </div>
                                    <div className="col-12">
                                        <textarea id="description" className="form-control"
                                            placeholder="Special Request / Message" rows="5"></textarea>
                                    </div>
                                    <div className="col-12 form-group mb-0">
                                        <button type="submit" className="theme-btn w-100">Send <i className="bi bi-arrow-right bg-transparent text-white"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Reservation;