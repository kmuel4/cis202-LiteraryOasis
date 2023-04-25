import { useState } from "react";
import {
  Button,
  Modal,
  Col,
  Row,
  Form,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Survey from "./Survey";
import {
  faArrowLeft,
  faUser,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../Header/Header";
import ModalHeader from "../../ModalHeader";

const NewCustomer = (props) => {
  //handle modal
  const [show, setShow] = useState(true);

  //close modal
  const handleClose = () => {
    setShow(false);
    props.onClose(3);
  };

  // close and submit
  const handleSubmit = () => {
    setShow(false);
    props.onSubmit(3);
  };

  //handle name
  const [first, setFirst] = useState();
  const [last, setLast] = useState();

  //handle address
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();

  //handle city
  const [city, setCity] = useState();

  //handle zip
  const [zip, setZip] = useState();
  const handleZipChange = (event) => {
    const value = event.target.value;
    if (value.length <= 5) {
      setZip(event.target.value);
    } else {
      event.target.value = event.target.value.slice(0, 5);
    }
  };

  //clear form
  const handleClear = () => {
    //clear form
    setFirst("");
    setLast("");
    setAddress("");
    setAddress2("");
    setCity("");
    setZip("");
    //focus on first text field
    document.querySelector('[tabindex="1"]').focus();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Form onSubmit={handleSubmit}>

        {/*modal header stuff */}
        <ModalHeader breadcrumbs={["Checkout", "New Customer"]} />

          <Modal.Body>
            {/*header */}
            <Header
              iconType={faUser}
              message="New Customer allows us to register a new customer. 
            The form is required, the survey is not. Click the survey enteries to delete them."
            />

            {/*form */}
            <Row className="mb-3">
              <Form.Label>Name*</Form.Label>

              {/*first name */}
              <Form.Group as={Col} controlId="firstName">
                <Form.Control
                  required
                  placeholder="Enter First"
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                  tabIndex={1}
                />
              </Form.Group>

              {/*last name */}
              <Form.Group as={Col} controlId="lastName">
                <Form.Control
                  required
                  placeholder="Enter Last"
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                  tabIndex={2}
                />
              </Form.Group>
            </Row>

            {/*address */}
            <Form.Group className="mb-3" controlId="address1">
              <Form.Label>Address*</Form.Label>
              <Form.Control
                required
                placeholder="1234 Main St"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                tabIndex={3}
              />
            </Form.Group>

            {/*address 2 */}
            <Form.Group className="mb-3" controlId="address2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                placeholder="Apartment, studio, or floor"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </Form.Group>

            {/*city */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="city">
                <Form.Label>City*</Form.Label>
                <Form.Control
                  required
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  tabIndex={4}
                />
              </Form.Group>

              {/*state */}
              <Form.Group as={Col} controlId="state">
                <Form.Label>State*</Form.Label>
                <Form.Select required defaultValue={null}>
                  <option>NY</option>
                  <option disabled>...</option>
                </Form.Select>
              </Form.Group>

              {/*zip */}
              <Form.Group as={Col} controlId="zip">
                <Form.Label>Zip*</Form.Label>
                <Form.Control
                  required
                  placeholder="Enter Zip"
                  pattern="[0-9]{5}"
                  value={zip}
                  onChange={handleZipChange}
                  tabIndex={5}
                />
              </Form.Group>
            </Row>

            {/*surveys */}
            <Form.Group className="mb-2">
              <Form.Text className="text-muted mb-4">
                *The following survey is optional.
              </Form.Text>
            </Form.Group>

            {/*category survey */}
            <Card className="p-2">
              <Survey
                surveyType="Reading Category Survey"
                surveyPlaceholder="Categories..."
              />
            </Card>

            {/*author survey */}
            <Card className="p-2 mt-3">
              <Survey
                surveyType="Favorite Authors Survey"
                surveyPlaceholder="Authors..."
              />
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-between w-100">
              <Button variant="secondary" onClick={handleClose}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
              </Button>
              <Button variant="danger" onClick={handleClear}>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
      
    </>
  );
};

export default NewCustomer;
