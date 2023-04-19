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
  Container,
  Card,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Images/literaryoasis-backdrop.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faXmark,
  faCheck,
  faArrowRight,
  faUser,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";

const Checkout = (props) => {
  const [show, setShow] = useState(true);
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  // hover over add icon
  const [addHover, setAddHover] = useState(false);

  //handle when search icon clicked
  const handleSearchClick = () => {
    if (isbn.length >= 13) {
      props.saveCart(books);
      setShow(false);
      props.onClose(0);
      props.searchBook(isbn);
    }
  };

  //whenever modal closes, save cart
  const handleClose = () => {
    props.saveCart(books);
    setShow(false);
    props.onClose(0);
  };

  // handle when add new customer, save cart
  const handleNewCustomer = () => {
    props.saveCart(books);
    setShow(false);
    props.onClose(4);
  };

  // handle when payment is started, save cart
  const handlePay = () => {
    if (!isCartEmpty) {
      props.saveCart(books);
      setShow(false);
      props.onClose(5);
    }
  };

  //initalize isbn
  const [isbn, setIsbn] = useState(
    props.bookIsbn && props.bookIsbn.length > 0 ? props.bookIsbn : ""
  );
  //get a random price (for now)
  const [price, setPrice] = useState("");
  //initialize books list
  const [books, setBooks] = useState(
    props.getCart && props.getCart.length > 0 ? props.getCart : []
  );

  //set book price once isbn is set
  useEffect(() => {
    if (isbn.length === 13) {
      setPrice(((Math.floor(Math.random() * 4501) + 500) / 100).toFixed(2));
    }
  }, [isbn]);

  // when isbn is added to cart by the button
  const handleSubmit = (event) => {
    event.preventDefault();
    props.clearIsbn();
    const newBook = { isbn, price };
    setBooks([...books, newBook]);
    setIsbn("");
    setPrice("");
    //set random book price
    document.querySelector('[tabindex="1"]').focus(); // call the focus() method on the ISBN input field
  };

  const subtotal = books.reduce((acc, book) => {
    return acc + parseFloat(book.price);
  }, 0);

  const salesTax = () => {
    return parseFloat((subtotal * 0.08).toFixed(2));
  };

  const totalAmount = () => {
    return parseFloat((subtotal + salesTax()).toFixed(2));
  };

  //render books in the modal
  const renderBooks = () => {
    return (
      <div style={{ maxHeight: "20rem", overflowY: "scroll", overflowX: "hidden"}}>
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
                  <Button variant="danger" style={{marginRight: ".5rem"}}onClick={() => removeBook(index)}>
                    <FontAwesomeIcon icon={faXmark} />
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
  };

  //check for empty cart
  useEffect(() => {
    if (books.length <= 0) {
      setIsCartEmpty(true);
    } else {
      setIsCartEmpty(false);
    }
  }, [books]);

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
                <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
              </Breadcrumb>
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container style={{ background: "" }}>
            <h2 className="text-center">
              Checkout &nbsp;
              <FontAwesomeIcon icon={faCashRegister} />
            </h2>
          </Container>
          <hr style={{marginLeft: "-1rem", marginRight: "-1rem"}}/>
          <Form.Group className="mb-2">
            <Form.Text className="text-muted mb-4">
              *Scan barcode or enter ISBN manually.
            </Form.Text>
          </Form.Group>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between">
              <Form.Group as={Col} md={8} className="mb-3">
                <Form.Label>ISBN</Form.Label>
                <InputGroup>
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
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Search ISBN</Tooltip>}
                  >
                    <InputGroup.Text>
                      {/*search book isbn icon */}
                      <FontAwesomeIcon
                        style={{
                          cursor: isbn.length >= 13 ? "pointer" : "default",
                        }}
                        icon={faSearch}
                        onClick={() => {
                          handleSearchClick();
                        }}
                        shake={isbn.length >= 13 ? true : false}
                      />
                    </InputGroup.Text>
                  </OverlayTrigger>
                </InputGroup>
                <Form.Text className="text-muted">
                  *Must be <strong>13</strong> digits.{" "}
                  <em>
                    Currently entered <strong>{isbn.length}</strong>{" "}
                    digits.&nbsp;
                  </em>
                </Form.Text>
              </Form.Group>
              <Container
                as={Col}
                style={{ textAlign: "right", marginTop: "2rem" }}
              >
                {/*add book to order button */}
                <Button
                  variant="primary"
                  type="submit"
                  tabIndex={2}
                  style={{
                    marginRight: "-.8rem",
                  }}
                  onMouseEnter={() => setAddHover(true)}
                  onMouseLeave={() => setAddHover(false)}
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    beatFade={addHover ? true : false}
                  />
                </Button>
              </Container>
            </div>
          </Form>
          <Card style={{padding: ".5rem", marginBottom: "1rem"}}>
          {books.length > 0 ? (
            renderBooks()
          ) : (
            <>
              <p style={{ textAlign: "center" }}>No books added</p>
            </>
          )}
          </Card>
          <Row>
            {/*subtotal */}
            <Form.Group className="mb-3" as={Col}>
              <Form.Label>Subtotal:</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control placeholder={subtotal} disabled />
              </InputGroup>
            </Form.Group>
            {/*sales tax */}
            <Form.Group className="mb-3" as={Col}>
              <Form.Label>Sales Tax:</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control placeholder={salesTax()} disabled />
              </InputGroup>
            </Form.Group>
            {/*total */}
            <Form.Group className="mb-3" as={Col}>
              <Form.Label>Total:</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control placeholder={totalAmount()} disabled />
              </InputGroup>
            </Form.Group>
          </Row>
          <Form.Group className="mb-2">
            <Form.Text className="text-muted mb-4">*Add new customer</Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={handleNewCustomer}>
            <FontAwesomeIcon icon={faUser} /> &nbsp;New Customer
          </Button>
        </Modal.Body>
        <Modal.Footer>
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
              Payment&nbsp;
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Checkout;
