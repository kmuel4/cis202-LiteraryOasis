import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Image,
  Stack,
  Breadcrumb,
  InputGroup,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Images/literaryoasis-backdrop.png";

const ScreenC = (props) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    props.onClose(0);
    setShow(false);
  };
  const handleBack = () => {
    props.onClose(1);
    setShow(false);
  };
  const handleAdd = () => {
    props.onClose(3);
    setShow(false);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
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
                <Breadcrumb.Item active>Book Lookup</Breadcrumb.Item>
                <Breadcrumb.Item active>Book Details</Breadcrumb.Item>
              </Breadcrumb>
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control placeholder={props.bookData.title} disabled />
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Author</Form.Label>
                <Form.Control placeholder={props.bookData.author} disabled />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>ISBN</Form.Label>
              <Form.Control placeholder={props.bookIsbn} disabled />
            </Form.Group>
            <hr />
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control placeholder="Isle 4" disabled />
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Avaliability</Form.Label>
                <Form.Control placeholder="Out of Stock" disabled />
              </Form.Group>
            </Row>

            <Form onSubmit={handleClose}>
              <div className="d-flex justify-content-between">
                <Form.Group as={Col} md={8} className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>

                    <Form.Control placeholder="0.00" disabled />
                  </InputGroup>
                </Form.Group>
                <Container
                  as={Col}
                  style={{ textAlign: "right", marginTop: "1.5rem" }}
                >
                  <Button
                    variant="primary"
                    onClick={handleAdd}
                    className="mt-2"
                  >
                    Add to order
                  </Button>
                </Container>
              </div>
            </Form>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ textAlign: "left" }}>
            <Button variant="primary" onClick={handleBack}>
              Return
            </Button>
          </div>
          <div style={{ textAlign: "right" }}>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ScreenC;
