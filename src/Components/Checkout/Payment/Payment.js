import {Row, Button, Modal, Container, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
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

  // handle card number
  const [cardNumber, setCardNumber] = useState();

  // handle card number length
  const [cardNumberLength, setCardNumberLength] = useState(0);
  const handleCardNumberChange = (event) => {
    const value = event.target.value;
    //only take first 16 digits
    if (value.length <= 16) {
      setCardNumberLength(event.target.value.length);
      setCardNumber(event.target.value);
    }
    //stop when 16 digits is reached
    else {
      event.target.value = event.target.value.slice(0, 16);
    }
  };

  //handle name on card
  const [cardName, setCardName] = useState();

  //handle expiration
  const [expiration, setExpiration] = useState();

  //handle security code
  const [securityCode, setSecurityCode] = useState();
  const handleSecurityCode = (event) => {
    const value = event.target.value;
    if (value.length <= 3) {
      setSecurityCode(event.target.value);
    } else {
      event.target.value = event.target.value.slice(0, 3);
    }
  };

  //handle billing name
  const [billingFirst, setBillingFirst] = useState();

  //handle billing last
  const [billingLast, setBillingLast] = useState();

  //handle address1
  const [address1, setAddress1] = useState();

  //handle address2
  const [address2, setAddress2] = useState();

  //handle city
  const [city, setCity] = useState();

  //handle zip code
  const [zip, setZip] = useState();
  const handleZipChange = (event) => {
    const value = event.target.value;
    if (value.length <= 5) {
      setZip(event.target.value);
    } else {
      event.target.value = event.target.value.slice(0, 5);
    }
  };

  //initialize phone
  const [phone, setPhone] = useState("");

  //format phone
  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // remove non-numeric characters
    let formattedInput = "";
    if (input.length > 0) {
      formattedInput = "(" + input.slice(0, 3);
    }
    if (input.length > 3) {
      formattedInput += ") " + input.slice(3, 6);
    }
    if (input.length > 6) {
      formattedInput += "-" + input.slice(6, 10);
    }
    setPhone(formattedInput);
  };

  //clear fields that you cant delete
  const handleClear = () => {
    //clear card info
    setCardNumber("");
    setCardName("");
    setExpiration("");
    setSecurityCode("");

    //clear billing
    setBillingFirst("");
    setBillingLast("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setZip("");
    setPhone("");

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
  const total = props.total;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation={false}
    >
        {/*modal header stuff */}
        <ModalHeader breadcrumbs={["Checkout", "Payment"]} />

        <Modal.Body>
          {/*payment options */}
          <Container style={{ display: "flex", justifyContent: "center", marginLeft: ".5rem", marginTop: "-1rem", marginBottom: "1rem" }}>
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
              <CardPayment/>
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
