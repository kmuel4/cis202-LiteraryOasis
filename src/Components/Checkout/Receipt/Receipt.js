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
                  <Breadcrumb.Item active>Receipt</Breadcrumb.Item>
                </Breadcrumb>
              </Stack>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className="mb-4">
              <h3 className="text-center">Payment Successful! </h3>
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
