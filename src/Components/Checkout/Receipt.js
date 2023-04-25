import { useState } from "react";
import {
  Button,
  Modal,
  Container,
  Form,
  OverlayTrigger,
  Tooltip,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faCommentSms,
  faFlagCheckered,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import ModalHeader from "../ModalHeader";

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

  //clear phone submission
  const handleClear = () => {
    setPhone("");
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
          {/*modal header stuff */}
          <ModalHeader breadcrumbs={["Checkout", "Payment", "Receipt"]} />

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

            <Form.Group className="mb-3 mt-3" controlId="Phone">
              <Form.Label>Phone Number:</Form.Label>
              <InputGroup>
                <Form.Control
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={phone}
                  onChange={handlePhoneChange}
                  required={textReceipt}
                  disabled={!textReceipt}
                />
                <InputGroup.Text>
                  <Button variant="danger" size="sm" onClick={handleClear}>
                    <FontAwesomeIcon icon={faTrashCan} size="lg" />
                  </Button>
                </InputGroup.Text>
              </InputGroup>
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
