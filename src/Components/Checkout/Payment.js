import {
  Form,
  Row,
  Col,
  Button,
  Modal,
  Image,
  Stack,
  Breadcrumb,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import logo from "../../Images/literaryoasis-backdrop.png";
import {
  faArrowLeft,
  faWallet,
  faHouseUser,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Header/Header";

const CardPayment = (props) => {
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

  // handle expiration
  const [expiration, setExpiration] = useState("");
  const handleExpirationChange = (event) => {
    const value = event.target.value;
    if (value.length <= 5) {
      const formattedValue = formatExpiration(value);
      setExpiration(formattedValue);
    } else {
      event.target.value = event.target.value.slice(0, 5);
    }
  };

  // format expiration
  const formatExpiration = (value) => {
    // Remove all non-digit characters
    const expiration = value.replace(/\D/g, "");

    // Add dashes after the first 2 digits
    if (expiration.length >= 2) {
      return `${expiration.slice(0, 2)}-${expiration.slice(2)}`;
    }
    return expiration;
  };

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

  // handle phone number
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    const formattedValue = formatPhoneNumber(value);
    setPhoneNumber(formattedValue);
  };

  //handle phone number digit limit and add dashes in
  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, "");

    // Add dashes after the first three digits and after the next three digits
    if (phoneNumber.length >= 3 && phoneNumber.length < 6) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    } else if (phoneNumber.length >= 6) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
        3,
        6
      )}-${phoneNumber.slice(6, 10)}`;
    }
    return phoneNumber;
  };

  //count just phone number the digits
  const countPhoneNumberDigits = (number) => {
    const digits = number.replace(/-/g, "").match(/\d/g);
    return digits ? digits.length : 0;
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
    setPhoneNumber("");

    //focus on first text field
    document.querySelector('[tabindex="1"]').focus();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation={false}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header
          className="stick-top"
          style={{ padding: ".5rem 1rem", borderBottom: "none" }}
          closeButton
        >
          <Modal.Title style={{ fontSize: "1.5rem" }}>
            {/*breadcrumb header */}
            <Stack direction="horizontal" gap={1}>
              <Image
                roundedCircle
                src={logo}
                style={{ height: "3rem", width: "auto" }}
              />
              &nbsp;
              <Breadcrumb style={{ fontSize: "1.25rem", marginTop: "1rem" }}>
                <Breadcrumb.Item active style={{ color: "black" }}>
                  Checkout
                </Breadcrumb.Item>
                <Breadcrumb.Item active style={{ color: "grey" }}>
                  Payment
                </Breadcrumb.Item>
              </Breadcrumb>
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/*card info title */}
          <Header
            header="Card Information"
            iconType={faWallet}
            message="Enter credit card information."
          />

          {/*card number */}
          <Form.Group className="mb-3" controlId="CardNumber">
            <Form.Label>Card Number*</Form.Label>
            <Form.Control
              pattern="[0-9]{16}"
              required
              onChange={handleCardNumberChange}
              tabIndex={1}
              value={cardNumber}
            />
            <Form.Text className="text-muted">
              Must be <strong>16</strong> digits.{" "}
              <em>
                Currently entered: <strong>{cardNumberLength}</strong> digits.
              </em>
            </Form.Text>
          </Form.Group>

          {/*card holder name */}
          <Form.Group controlId="CardHolderName">
            <Form.Label>Name on card*</Form.Label>
            <Form.Control
              tabIndex={2}
              required
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="First Name"
            />
          </Form.Group>

          {/*card expiration */}
          <Row className="mt-3 mb-5">
            <Form.Group as={Col} controlId="CardExpiration">
              <Form.Label>Expiration*</Form.Label>
              <Form.Control
                tabIndex={3}
                pattern="[0-9]{2}-[0-9]{2}"
                required
                value={expiration}
                onChange={handleExpirationChange}
                placeholder="MM-YY"
              />
            </Form.Group>

            {/*card security code */}
            <Form.Group as={Col} controlId="CardSecurityCode">
              <Form.Label>Security Code*</Form.Label>
              <Form.Control
                tabIndex={4}
                pattern="[0-9]{3}"
                required
                value={securityCode}
                onChange={handleSecurityCode}
              />
              <Form.Text className="text-muted">
                Must be <strong>3</strong> digits.
              </Form.Text>
            </Form.Group>
          </Row>
          {/*billing title */}
          <Header iconType={faHouseUser} message="Enter billing information" />
          <Row className="mb-3">
            {/*first name */}
            <Form.Group as={Col} controlId="First">
              <Form.Label>Name*</Form.Label>
              <Form.Control
                tabIndex={5}
                required
                placeholder="Enter First"
                value={billingFirst}
                onChange={(e) => setBillingFirst(e.target.value)}
              />
            </Form.Group>

            {/*last name */}
            <Form.Group as={Col} className="mt-2" controlId="Last">
              <Form.Label></Form.Label>
              <Form.Control
                tabIndex={6}
                required
                placeholder="Enter Last"
                value={billingLast}
                onChange={(e) => setBillingLast(e.target.value)}
              />
            </Form.Group>
          </Row>

          {/*address */}
          <Form.Group controlId="Address">
            <Form.Label>Address*</Form.Label>
            <Form.Control
              tabIndex={7}
              required
              placeholder="1234 Main St"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-3" controlId="Address2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              placeholder="Apartment, studio, or floor"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </Form.Group>

          {/*city */}
          <Row>
            <Form.Group as={Col} controlId="City">
              <Form.Label>City*</Form.Label>
              <Form.Control
                tabIndex={8}
                pattern="[a-zA-Z]+"
                required
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            {/*state */}
            <Form.Group as={Col} controlId="State">
              <Form.Label>State*</Form.Label>
              <Form.Select required defaultValue={null}>
                <option>NY</option>
                <option disabled>...</option>
              </Form.Select>
            </Form.Group>
          </Row>

          {/*zip */}
          <Row className="mt-3">
            <Form.Group as={Col} controlId="zip">
              <Form.Label>Zip*</Form.Label>
              <Form.Control
                tabIndex={9}
                required
                placeholder="Enter Zip"
                pattern="[0-9]{5}"
                value={zip}
                onChange={handleZipChange}
              />
            </Form.Group>

            {/*country */}
            <Form.Group as={Col} controlId="Country">
              <Form.Label>Country*</Form.Label>
              <Form.Select required defaultValue={null}>
                <option>United States</option>
                <option disabled>...</option>
              </Form.Select>
            </Form.Group>
          </Row>

          {/*phone number */}
          <Form.Group className="mb-3 mt-3" controlId="Phone">
            <Form.Label>Phone Number*</Form.Label>
            <Form.Control
              type="tel"
              value={phoneNumber}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={handlePhoneNumberChange}
              required
              tabIndex={10}
            />
            <Form.Text className="text-muted">
              Must be <strong>10</strong> digits with dashes.{" "}
              <em>
                Currently entered:{" "}
                <strong>{countPhoneNumberDigits(phoneNumber)} </strong>
                digits.
              </em>
            </Form.Text>
          </Form.Group>
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
              <Button variant="primary" type="submit" tabIndex={11}>
                Submit
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CardPayment;
