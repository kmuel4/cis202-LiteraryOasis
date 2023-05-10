import { Row, Button, Modal, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import {
  faArrowLeft,
  faTrashCan,
  faCreditCard,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalHeader from "../../ModalHeader";
import PaymentOption from "./PaymentOption";
import CashPayment from "./CashPayment";
import CardPayment from "./CardPayment";

const Payment = (props) => {
  //controls showing modal
  const [show, setShow] = useState(true);

  //close and go to app
  const handleClose = () => {
    setShow(false);
    props.onClose(0);
  };

  //go back to checkout
  const handleBack = () => {
    setShow(false);
    props.onClose(3);
  };

  //progress to payment
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onClose(6);
  };

  //clear fields that you cant delete
  const handleClear = () => {
    //focus on first text field
    document.querySelector('[tabindex="1"]').focus();
  };

  //handle payment option
  const [card, setCard] = useState(true);
  const [cash, setCash] = useState(false);
  const handlePaymentOption = (event) => {
    setCard(!card);
    setCash(!cash);
  };

  //get total and send to cash payment
  const [total, setTotal] = useState();
  useEffect(() => {
    setTotal(props.total);
  }, [props.total]);


  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation={false}
      fullscreen={true}
    >
      {/*modal header stuff */}
      
      <ModalHeader breadcrumbs={["Checkout", "Payment"]}/>

      <Modal.Body>
        {/*payment options */}
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
            marginTop: "-1rem"
          }}
        >
          <Row>
            <PaymentOption
              type="Card"
              iconType={faCreditCard}
              changeSelected={handlePaymentOption}
              selected={card}
            />
            <PaymentOption
              type="Cash"
              iconType={faHandHoldingDollar}
              changeSelected={handlePaymentOption}
              selected={cash}
            />
          </Row>
        </Container>

        {card ? (
          <>
            <CardPayment />
          </>
        ) : (
          <CashPayment total={total} />
        )}
      </Modal.Body>

      <Modal.Footer>
        <div className="d-flex justify-content-between w-100">
          {/*go back */}
          <Button variant="secondary" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Button>
          {/*clear form */}
          <Button variant="danger" onClick={handleClear}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
          {/*submit form */}
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleSubmit} tabIndex={11}>
              Submit
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Payment;
