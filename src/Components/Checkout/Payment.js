import {
  Form,
  Row,
  Col,
  Button,
  Modal,
  Image,
  Card,
  Stack,
  Breadcrumb,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import logo from "../../Images/literaryoasis-backdrop.png";

const CardPayment = (props) => {
  //card number
  const [cardNumberLength, setCardNumberLength] = useState(0);
  const handleCardNumberChange = (event) => {
    const value = event.target.value;
    //only take first 16 digits
    if (value.length <= 16) {
      setCardNumberLength(event.target.value.length);
    }
    //stop when 16 digits is reached
    else {
      event.target.value = event.target.value.slice(0, 16);
    }
  };

  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.onClose(0);
  };

  //default state for state code
  const [stateCode, setStateCode] = useState("NY");
  const handleStateCodeChange = (event) => {
    const value = event.target.value;
    if(value.length <= 2){
    setStateCode(event.target.value);
    }
    else{
      event.target.value = event.target.value.slice(0,3);
    }
  };

  //default state for country
  const [country, setCountry] = useState("United States");
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    const formattedValue = formatPhoneNumber(value);
    setPhoneNumber(formattedValue);
  };

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

  //count just the digits
  const countPhoneNumberDigits = (number) => {
    const digits = number.replace(/-/g, "").match(/\d/g);
    return digits ? digits.length : 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onClose(6);
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
        <Modal.Header>
          <Modal.Title>
            <Stack direction="horizontal" gap={1}>
              <Image
                roundedCircle
                src={logo}
                style={{ height: "3rem", width: "auto" }}
              />
              &nbsp;
              <Breadcrumb style={{ fontSize: "1.25rem" }}>
                <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
                <Breadcrumb.Item active>Payment</Breadcrumb.Item>
              </Breadcrumb>
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/*title */}
          <h3 className="text-center">
            <Card className="p-3" style={{ background: "#dde3f4" }}>
              Card Information
            </Card>
          </h3>

          {/*card number */}
          <Form.Group className="mb-3" controlId="CardNumber">
            <Form.Label>Card Number*</Form.Label>
            <Form.Control
              pattern="[0-9]{16}"
              required
              onChange={handleCardNumberChange}
              tabIndex={1}
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
            <Form.Control tabIndex={2} required />
          </Form.Group>

          {/*card expiration */}
          <Row className="mt-3">
            <Form.Group as={Col} controlId="CardExpiration">
              <Form.Label>Expiration (MM-YY)*</Form.Label>
              <Form.Control tabIndex={3} pattern="[0-9]{2}-[0-9]{2}" required />
            </Form.Group>

            {/*card security code */}
            <Form.Group as={Col} controlId="CardSecurityCode">
              <Form.Label>Security Code*</Form.Label>
              <Form.Control tabIndex={4} pattern="[0-9]{3}" required />
              <Form.Text className="text-muted">
                Must be <strong>3</strong> digits.
              </Form.Text>
            </Form.Group>
          </Row>

          <h3 className="text-center">
            <Card className="p-3 mt-3" style={{ background: "#dde3f4" }}>
              Billing Information
            </Card>
          </h3>

          <Row className="mb-3">
            {/*first name */}
            <Form.Group as={Col} controlId="First">
              <Form.Label>Name*</Form.Label>
              <Form.Control tabIndex={5} required />
              <Form.Text className="text-muted">First</Form.Text>
            </Form.Group>
            {/*last name */}
            <Form.Group as={Col} className="mt-2" controlId="Last">
              <Form.Label></Form.Label>
              <Form.Control tabIndex={6} required />
              <Form.Text className="text-muted">Last</Form.Text>
            </Form.Group>
          </Row>
          {/*address */}
          <Form.Group controlId="Address">
            <Form.Label>Address*</Form.Label>
            <Form.Control tabIndex={7} required />
            <Form.Text className="text-muted">Street Address</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="Address2">
            <Form.Label></Form.Label>
            <Form.Control />
            <Form.Text className="text-muted">
              Apartment, suite, etc. (optional)
            </Form.Text>
          </Form.Group>
          {/*city */}
          <Row>
            <Form.Group as={Col} controlId="City">
              <Form.Label></Form.Label>
              <Form.Control tabIndex={8} pattern="[a-zA-Z]+" required />
              <Form.Text className="text-muted">City</Form.Text>
            </Form.Group>
            {/*state */}
            <Form.Group as={Col} controlId="State">
              <Form.Label></Form.Label>
              <Form.Control
                pattern="[A-Z]{2}"
                value={stateCode}
                onChange={handleStateCodeChange}
                required
              />
              <Form.Text className="text-muted">
                State / Province / Region
              </Form.Text>
            </Form.Group>
          </Row>
          {/*zip */}
          <Row>
            <Form.Group as={Col} controlId="Zip">
              <Form.Label></Form.Label>
              <Form.Control tabIndex={9} pattern="[0-9]{5}" required />
              <Form.Text className="text-muted">Postal / Zip Code</Form.Text>
            </Form.Group>
            {/*country */}
            <Form.Group as={Col} controlId="Country">
              <Form.Label></Form.Label>
              <Form.Control
                value={country}
                onChange={handleCountryChange}
                required
              />
              <Form.Text className="text-muted">Country</Form.Text>
            </Form.Group>
          </Row>
          {/*phone number */}
          <Form.Group className="mb-3 mt-3" controlId="Phone">
            <Form.Label>Phone Number</Form.Label>
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
          <Button variant="secondary" onClick={handleClose}>
            Cancel Order
          </Button>
          <Button variant="primary" type="submit" tabIndex={11}>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CardPayment;
