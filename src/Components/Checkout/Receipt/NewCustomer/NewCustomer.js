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
  Container,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../../Images/literaryoasis-backdrop.png";
import CategorySurvey from "./CategorySurvey";
import AuthorSurvey from "./AuthorSurvey";
import { faArrowLeft, faUser, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewCustomer = (props) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.onClose(3);
  };

  const handleSubmit = () => {
    setShow(false);
    props.onSubmit(3);
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
                <Breadcrumb.Item active style={{ color: "grey" }}>
                  New Customer
                </Breadcrumb.Item>
              </Breadcrumb>
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <h2
              className="text-center"
              style={{
                fontSize: "3rem",
                color: "black",
                marginTop: "-1rem",
              }}
            >
              <FontAwesomeIcon icon={faUser} />
            </h2>
          </Container>
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
          <Card className="p-2">
            {/*category survey */}
            <CategorySurvey />
          </Card>
          <Card className="p-2 mt-3">
            {/*author survey */}
            <AuthorSurvey />
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between w-100">
            <Button variant="secondary" onClick={handleClose}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </Button>
            <Button variant="danger" >
              <FontAwesomeIcon icon={faArrowsRotate}/>
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
  );
};

export default NewCustomer;
