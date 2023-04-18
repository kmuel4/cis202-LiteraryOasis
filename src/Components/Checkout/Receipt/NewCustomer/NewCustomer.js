import { useState } from "react";
import {
  Button,
  Modal,
  Col,
  Row,
  Form,
  Image,
  Stack,
  Breadcrumb,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../../Images/literaryoasis-backdrop.png";
import CategorySurvey from "./CategorySurvey";
import AuthorSurvey from "./AuthorSurvey";

const NewCustomer = (props) => {
  const [show, setShow] = useState(true);

  const handleClose = (event) => {
    //event.preventDefault();
    setShow(false);
    props.onClose(false);
  };

  const [zip, setZip] = useState();
  const handleZipChange = (event) => {
    const value = event.target.value;
    if (value.length <= 5) {
      setZip(event.target.value);
    } else {
      event.target.value = event.target.value.slice(0, 5);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Form onSubmit={handleClose}>
        <Modal.Header closeButton>
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
                <Breadcrumb.Item active>New Customer</Breadcrumb.Item>
              </Breadcrumb>
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Label>Name*</Form.Label>
            <Form.Group as={Col} controlId="firstName">
              <Form.Control required placeholder="Enter First" />
            </Form.Group>

            <Form.Group as={Col} controlId="lastName">
              <Form.Control required placeholder="Enter Last" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="address1">
            <Form.Label>Address*</Form.Label>
            <Form.Control required placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="city">
              <Form.Label>City*</Form.Label>
              <Form.Control required placeholder="Enter City" />
            </Form.Group>

            <Form.Group as={Col} controlId="state">
              <Form.Label>State*</Form.Label>
              <Form.Select required defaultValue={null}>
                <option>NY</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="zip">
              <Form.Label>Zip*</Form.Label>
              <Form.Control
                required
                placeholder="Enter Zip"
                pattern="[0-9]{5}"
                value={zip}
                onChange={handleZipChange}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-2">
            <Form.Text className="text-muted mb-4">
              *The following survey is optional.
            </Form.Text>
          </Form.Group>
          <hr />
          {/*category survey */}
          <CategorySurvey />
          {/*author survey */}
          <AuthorSurvey />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewCustomer;
