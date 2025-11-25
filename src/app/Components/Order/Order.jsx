import Image from "next/image";

function Order() {
    return ( <>
    <div className="order-section section-padding fix">
        <div className="container">
            <div className="order-wrapper bg-white p-1 p-sm-4">
                <div className="row gx-40 gy-5 gy-md-0">
                    <div className="d-none col-lg-6 d-md-flex justify-content-around flex-column align-items-center justify-content-center">
                        <div className="">
                            <p>crispy, every bite taste</p>
                            <h3 className="order-thumb-title">
                                Want to book a Catering?
                                please fill-up this information.
                            </h3>
                        </div>
                        <div className="order-thumb">
                            <div className="order-thumb-bg"></div>
                            <Image width={1000} height={1000} src={'/assets/img/offer/offerThumb1_1.png'} />
                        </div>
                    </div>
                    <div className="col-lg-6 order-center">
                        <div className="order-card bg-color2 p-3 p-sm-5">
                            <h3>Order A Catering</h3>
                            <p>Please Enter Your Details</p>
                            <div className="contact-form style2 bg-color2 p-0">
                                <form className="row" action="#">
                                    <div className="col-6">
                                        <input type="text" value="" placeholder="Customer Name" name="customerName"/>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" value="" placeholder="No of Person" name="noOfPerson"/>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" value="" placeholder="Phone Number" name="phoneNumber"/>
                                    </div>
                                    <div className="col-6">
                                        <input type="date" value="" name="date"/>
                                    </div>
                                    
                                    <div className="col-6">
                                        <input type="email" placeholder="Email Address" value="" name="email" />
                                    </div>
                                    <div className="col-12">
                                        <div className="form-clt"><textarea name="description" placeholder="Special Request / Message" rows="5" className="custom-textarea"></textarea></div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="theme-btn rounded-5 w-100 mb-3">SEND</button>
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </> );
}

export default Order;