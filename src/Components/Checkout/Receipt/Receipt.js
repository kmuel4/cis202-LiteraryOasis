import { useState } from "react";
import {
  Button,
  Modal,
  Image,
  Container,
  Form,
  Breadcrumb,
  Stack,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../Images/literaryoasis-backdrop.png";

const Receipt = (props) => {
  const [show, setShow] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    //if one receipt option is checked
    if (textReceipt || printChecked) {
      setShow(false);
      props.onClose(0);
      props.receipt(true);
    }
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

  //check to see if we show phone number input
  const [textReceipt, setTextReceipt] = useState(true);
  const handleTextReceipt = () => {
    setTextReceipt(!textReceipt);
    console.log(!textReceipt);
  };

  //look for print receipt checkbox
  const [printChecked, setPrintChecked] = useState(true);
  const handleSetPrintChecked = () => {
    setPrintChecked(!printChecked);
    console.log(!printChecked);
  };

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false} animation={false}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header
            className="stick-top"
            style={{ padding: ".5rem 1rem", borderBottom: "none" }}
            closeButton
          >
            <Modal.Title style={{ fontSize: "1.5rem" }}>
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
                  <Breadcrumb.Item active style={{ color: "black" }}>
                    Payment
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active style={{ color: "grey" }}>
                    Receipt
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Stack>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className="mb-4">
              <h2
                className="text-center"
                style={{
                  fontSize: "2rem",
                  color: "black",
                  marginTop: "-1rem"
                }}
              >
                Payment Successful!
              </h2>
              <hr
                style={{
                  marginLeft: "-2rem",
                  marginRight: "-2rem",
                  marginBottom: "1.25rem",
                }}
              />
            </Container>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Print Receipt"
                defaultChecked={printChecked}
                onChange={handleSetPrintChecked}
                value={printChecked}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Text Receipt"
                defaultChecked={textReceipt}
                onChange={handleTextReceipt}
              />
            </Form.Group>
            {textReceipt && (
              <Form.Group className="mb-3 mt-3" controlId="Phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={phoneNumber}
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  onChange={handlePhoneNumberChange}
                  required
                />
                <Form.Text className="text-muted">
                  Must be <strong>10</strong> digits with dashes.
                  <em>
                    Currently entered:{" "}
                    <strong>{countPhoneNumberDigits(phoneNumber)} </strong>
                    digits.
                  </em>
                </Form.Text>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer>
            <OverlayTrigger
              placement="top"
              overlay={
                !(textReceipt || printChecked) ? (
                  <Tooltip>You must choose some form of receipt</Tooltip>
                ) : (
                  <></>
                )
              }
            >
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </OverlayTrigger>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Receipt;
