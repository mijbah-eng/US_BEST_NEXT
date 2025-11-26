"use client";
import { useState } from "react";
import "./mode.css"
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

function AddToCartModal({show, handleClose}) {
     const [showLoginModal, setShowLoginModal] = useState(false);
     const [quantity, setquantity] = useState(1);

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
    return ( <>
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
                    <img src="/assets/img/dishes/dishes1_2.png" alt="" />

                        </div>
                    </div>
                </div>
                <div className="modal-details">
                    <div className="product-about">
                        <div className="title-wrapper">
                            <h2 className="product-title">3 pcs Chicken Tender</h2>
                            <p className="price">$7.99 - $7.99</p>
                        </div>
                    </div>
                </div>
                </Col>
                <Col md={6}>
                <h2>Item Options</h2>
                <p>Required - Choose one.</p>
                <Form.Check 
                type="radio"
                name="size"
                label="5 pic"
                />
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
            <Button className="theme-btn">
            <p className="txt_addcart">Add to Cart <i className="bi bi-cart"></i></p>
          </Button>
        </Modal.Footer>
    </Modal>
    </> );
}

export default AddToCartModal;