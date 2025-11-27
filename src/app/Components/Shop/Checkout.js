"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

 

const Checkout = () => {
    
    const [billingType, setBillingType] = useState("Pickup");
    const router = useRouter();

    const handleBillingChange = (e) => {
    const value = e.target.value;
    setBillingType(value);

    if (value === "Delivery") {
      router.push("/delivery-partner");
    }
  };
    return (
<div className="th-checkout-wrapper section-padding fix">
        <div className="container">
            <form action="#" className="woocommerce-checkout mt-5">
                <div className="row ">
                    <div className="col-lg-12">
                        <div className="head-content d-flex justify-content-between">
                            <h2 className="h4">Billing Details</h2>
                            <span>
                            <label>
                              <input
                                type="radio"
                                name="billingType"
                                value="Pickup"
                                checked={billingType === "Pickup"}
                                onChange={handleBillingChange}
                              />{" "}
                              Pickup
                            </label>
                            <label style={{ marginRight: "15px" }}>
                              <input
                                type="radio"
                                name="billingType"
                                value="Delivery"
                                checked={billingType === "Delivery"}
                                onChange={handleBillingChange}
                              />{" "}
                              Delivery
                            </label>
                          </span>
                        </div>
                        
                        <div className="row">
                            <div className="col-12 form-group">
                                <select className="single-select w-100 mb-3">
                                    <option>United Kingdom (UK)</option>
                                    <option>United State (US)</option>
                                    <option>Equatorial Guinea (GQ)</option>
                                    <option>Australia (AU)</option>
                                    <option>Germany (DE)</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <input type="text" className="form-control" placeholder="First Name" />
                            </div>
                            <div className="col-md-6 form-group">
                                <input type="text" className="form-control" placeholder="Last Name" />
                            </div>
                            <div className="col-12 form-group">
                                <input type="text" className="form-control" placeholder="Your Company Name" />
                            </div>
                            <div className="col-12 form-group">
                                <input type="text" className="form-control" placeholder="Street Address" />
                                <input type="text" className="form-control"
                                    placeholder="Apartment, suite, unit etc. (optional)" />
                            </div>
                            <div className="col-12 form-group">
                                <input type="text" className="form-control" placeholder="Town / City" />
                            </div>
                            <div className="col-md-6 form-group">
                                <input type="text" className="form-control" placeholder="Country" />
                            </div>
                            <div className="col-md-6 form-group">
                                <input type="text" className="form-control" placeholder="Postcode / Zip" />
                            </div>
                            <div className="col-12 form-group">
                                <input type="text" className="form-control" placeholder="Email Address" />
                                <input type="text" className="form-control" placeholder="Phone number" />
                            </div>
                            <div className="col-12 form-group">
                                <input type="checkbox" id="accountNewCreate" />
                                <label htmlFor="accountNewCreate">Create An Account?</label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    );
};

export default Checkout;