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
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Images/literaryoasis-backdrop.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faCommentSms,
  faFlagCheckered,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

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

  const handleClear = () => {
    setPhoneNumber("");
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
            <Container className="mb-4 text-center">
              <h2
                style={{
                  fontSize: "2rem",
                  color: "black",
                  marginTop: "-1rem",
                }}
              >
                Payment Successful!
              </h2>
            </Container>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label={
                  <span>
                    <FontAwesomeIcon icon={faPrint} /> Print Receipt
                  </span>
                }
                defaultChecked={printChecked}
                onChange={handleSetPrintChecked}
                value={printChecked}
                style={{ marginRight: "0.5rem" }} // optional: add some spacing between the label and icon
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label={
                  <span>
                    <FontAwesomeIcon icon={faCommentSms} /> Text Receipt
                  </span>
                }
                defaultChecked={textReceipt}
                onChange={handleTextReceipt}
              />
            </Form.Group>
            
              <Form.Group className="mb-3 mt-3" controlId="Phone" >
                <Form.Label>Phone Number:</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="tel"
                    value={phoneNumber}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    onChange={handlePhoneNumberChange}
                    required
                    disabled={!textReceipt}
                  />
                  <InputGroup.Text>
                    <Button variant="danger" size="sm" onClick={handleClear}>
                      <FontAwesomeIcon icon={faTrashCan} size="lg" />
                    </Button>
                  </InputGroup.Text>
                </InputGroup>
                <Form.Text className="text-muted">
                  Must be <strong>10</strong> digits with dashes.
                  <em>
                    Currently entered:{" "}
                    <strong>{countPhoneNumberDigits(phoneNumber)} </strong>
                    digits.
                  </em>
                </Form.Text>
              </Form.Group>
           
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
                <FontAwesomeIcon icon={faFlagCheckered} />
                &nbsp;Finish&nbsp;
                <FontAwesomeIcon icon={faFlagCheckered} />
              </Button>
            </OverlayTrigger>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Receipt;
