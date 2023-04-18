import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Image,
  Breadcrumb,
  Stack,
  Card,
  Container,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Images/literaryoasis-backdrop.png";
import NewCustomer from "./Receipt/NewCustomer/NewCustomer";

const Checkout = (props) => {
  const [show, setShow] = useState(true);
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.onClose(0);
  };

  const [newCustomer, setNewCustomer] = useState(false);
  const handleNewCustomer = () => {
    setNewCustomer(!newCustomer);
    setMinimized(!minimized);
  };

  const handlePay = () => {
    if (!isCartEmpty) {
      setShow(false);
      props.onClose(5);
    }
  };

  //initalize isbn
  const [isbn, setIsbn] = useState((props.bookIsbn && props.bookIsbn.length > 0) ? props.bookIsbn : "");
  //get a random price (for now)
  const [price, setPrice] = useState("");
  //initialize books list
  const [books, setBooks] = useState([]);

  //set book price once isbn is set
  useEffect(() => {
    if (isbn.length === 13) {
      setPrice(((Math.floor(Math.random() * 4501) + 500) / 100).toFixed(2));
    }
  }, [isbn]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsCartEmpty(false);
    const newBook = { isbn, price };
    setBooks([...books, newBook]);
    setIsbn("");
    setPrice("");
    //set random book price
    document.querySelector('[tabindex="1"]').focus(); // call the focus() method on the ISBN input field
  };

  //calculate total price
  const totalPrice = books.reduce((acc, book) => {
    return acc + Number(book.price);
  }, 0);

  const [minimized, setMinimized] = useState(false);

  //render books in the modal
  const renderBooks = () => {
    return (
      <div style={{ maxHeight: "20rem", overflow: "auto" }}>
        {books.map((book, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center mb-3"
          >
            <div>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control placeholder={book.isbn} disabled />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Price</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control placeholder={book.price} disabled />
                  </InputGroup>
                </Form.Group>
                <Container
                  as={Col}
                  style={{ marginTop: "30px", textAlign: "right" }}
                >
                  <Button variant="danger" onClick={() => removeBook(index)}>
                    Remove
                  </Button>
                </Container>
              </Row>
            </div>
          </div>
        ))}
      </div>
    );
  };

  //remove a book from the modal
  const removeBook = (indexToRemove) => {
    setBooks(books.filter((_, index) => index !== indexToRemove));
    {
      books.length === 0 && setIsCartEmpty(true);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        backdrop="static"
        keyboard={false}
      >
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
              </Breadcrumb>
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="text-center">
            <Card className="p-3" style={{ background: "#dde3f4" }}>
              Cart
            </Card>
          </h3>
          <Form.Group className="mb-2">
            <Form.Text className="text-muted mb-4">
              *Scan barcode or enter ISBN manually.
            </Form.Text>
          </Form.Group>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between">
              <Form.Group as={Col} md={8} className="mb-3">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  placeholder="Enter ISBN"
                  value={isbn}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value.length <= 13) {
                      // check if input length is <= 13
                      setIsbn(value);
                    } else {
                      setIsbn(value.slice(0, 13)); // truncate input to 13 digits
                    }
                  }}
                  tabIndex={1} // jump back here on add
                  required
                  pattern="[0-9]{13}"
                />
                <Form.Text className="text-muted">
                  *Must be <strong>13</strong> digits.{" "}
                  <em>
                    Currently entered <strong>{isbn.length}</strong> digits.
                  </em>
                </Form.Text>
              </Form.Group>
              <Container
                as={Col}
                style={{ textAlign: "right", marginTop: "2rem" }}
              >
                <Button
                  variant="primary"
                  type="submit"
                  tabIndex={2}
                  style={{
                    paddingRight: "25px",
                    paddingLeft: "25px",
                    marginRight: "-13px",
                  }}
                >
                  Add
                </Button>
              </Container>
            </div>
          </Form>
          <hr />
          {books.length > 0 ? (
            renderBooks()
          ) : (
            <>
              <p style={{ textAlign: "center" }}>No books added</p>
            </>
          )}
          <hr style={{ marginTop: "1.2rem" }} />

          <Form.Group className="mb-3">
            <Form.Label>Total</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control placeholder={totalPrice} disabled />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Text className="text-muted mb-4">*Add new customer</Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={handleNewCustomer}>
            New Customer
          </Button>
        </Modal.Body>
        <Modal.Footer
          style={{ display: minimized ? "none" : "block", textAlign: "right" }}
        >
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <OverlayTrigger
            placement="top"
            overlay={
              isCartEmpty ? (
                <Tooltip>You must add something to cart to proceed.</Tooltip>
              ) : (
                <></>
              )
            }
          >
            <Button variant="primary" onClick={handlePay}>
              Payment
            </Button>
            </OverlayTrigger>
        </Modal.Footer>
      </Modal>
      {newCustomer && <NewCustomer onClose={handleNewCustomer} />}
    </>
  );
};

export default Checkout;
