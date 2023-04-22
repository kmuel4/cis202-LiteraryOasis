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
  faUserPlus,
  faMinus,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/Header";
import BookList from "../../assets/BookList";

const Checkout = (props) => {
  //show the modal
  const [show, setShow] = useState(true);

  //initialize check for empty cart
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  //get list of books from database
  const [retrievedBookList, setRetrievedBookList] = useState([]);

  const [outOfStockFlag, setOutOfStockFlag] = useState(false);

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

  //initialize price
  const [price, setPrice] = useState("");

  //set book price once isbn is set
  useEffect(() => {
    if (isbn.length === 13) {
      //get the book that matches the isbn
      const book = retrievedBookList.find((book) => book.ISBN === isbn);
      //if book not found, give it a random price 2.99 - 24.99
      setPrice(book ? book.Price : (Math.random() * 22 + 2.99).toFixed(2));
      //find out if anything is out of stock
      setOutOfStockFlag(retrievedBookList.some((book) => book.status === "Out of stock"));
    }
  }, [isbn, retrievedBookList]);

  //initialize books list for the cart
  const [books, setBooks] = useState(
    props.getCart && props.getCart.length > 0 ? props.getCart : []
  );

  // when isbn is added to cart by the button
  const handleSubmit = (event) => {
    event.preventDefault();
    //clear isbn from search
    props.clearIsbn();
    //add to cart
    const newBook = { isbn, price };
    setBooks([...books, newBook]);
    //clear isbn and price
    setIsbn("");
    setPrice("");
    //focus on isbn input
    document.querySelector('[tabindex="1"]').focus();
  };

  //calc subtotal
  const subtotal = books.reduce((acc, book) => {
    //calc total
    const total = acc + parseFloat(book.price);
    //parse to an int and round to 2 digits
    return parseFloat(total.toFixed(2));
  }, 0);

  //calc sales tax
  const salesTax = () => {
    return parseFloat((subtotal * 0.08).toFixed(2));
  };

  //calc total amount
  const totalAmount = () => {
    return parseFloat((subtotal + salesTax()).toFixed(2));
  };

  //render books in the modal
  const renderBooks = () => {
    return (
      <div
        style={{ maxHeight: "20rem", overflowY: "scroll", overflowX: "hidden" }}
      >
        {/*print all books in list */}
        {books.map((book, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center mb-3"
          >
            <div>
              <Row>
                {/*isbn */}
                <Form.Group as={Col}>
                  <Form.Label>ISBN:</Form.Label>
                  <Form.Control placeholder={book.isbn} disabled />
                </Form.Group>

                {/*price */}
                <Form.Group as={Col}>
                  <Form.Label>Price:</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control placeholder={book.price} disabled />
                  </InputGroup>
                </Form.Group>

                {/*remove button */}
                <Container
                  as={Col}
                  style={{ marginTop: "30px", textAlign: "right" }}
                >
                  <Button
                    variant="danger"
                    style={{ marginRight: ".5rem" }}
                    onClick={() => removeBook(index)}
                  >
                    Remove &nbsp;
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
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header
        className="stick-top"
        style={{ padding: ".5rem 1rem", borderBottom: "none" }}
        closeButton
      >
        {/*breadcrumb */}
        <Modal.Title style={{ fontSize: "1.5rem" }}>
          <Stack direction="horizontal" gap={1}>
            <Image
              roundedCircle
              src={logo}
              style={{ height: "3rem", width: "auto" }}
            />
            &nbsp;
            <Breadcrumb style={{ fontSize: "1.25rem", marginTop: "1rem" }}>
              <Breadcrumb.Item active style={{ color: "grey" }}>
                Checkout
              </Breadcrumb.Item>
            </Breadcrumb>
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/*header */}
        <Header
          iconType={faCashRegister}
          message={
            <ul>
              <li>
                Checkout is the main interface. Enter a book's ISBN by scanning
                the barcode or do it manually by keyboard. If you do not know
                the barcode, return to home and click Search Book.
              </li>
              <li>
                Click the shaking magnifying glass to go to the Book Details
                page for the inserted ISBN.
              </li>
              <li>
                If the customer is new, click the New Customer button to go to
                the New Customer page for registration.
              </li>
            </ul>
          }
        />
        {/*enter isbn */}
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between mt-4">
            <Form.Group as={Col} md={8} className="mb-3">
              <InputGroup>
                {/*isbn text field */}
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
                  //only accept 13 digit
                  pattern="[0-9]{13}"
                />
                {/*search book isbn icon */}
                <InputGroup.Text>
                  <FontAwesomeIcon
                    style={{
                      cursor: isbn.length >= 13 ? "pointer" : "default",
                    }}
                    icon={faSearch}
                    onClick={() => {
                      handleSearchClick();
                    }}
                    //shake when isbn is full
                    shake={isbn.length >= 13 ? true : false}
                  />
                </InputGroup.Text>
              </InputGroup>
              {/*input status text */}
              <Form.Text className="text-muted">
                *Must be <strong>13</strong> digits.{" "}
                <em>
                  Currently entered <strong>{isbn.length}</strong> digits.&nbsp;
                </em>
              </Form.Text>
            </Form.Group>

            {/*get the booklist */}
            <BookList retrievedBookList={setRetrievedBookList} />

            {/*add book to cart*/}
            <Container as={Col} style={{ textAlign: "right", marginTop: "" }}>
              <Button
                variant="primary"
                type="submit"
                tabIndex={2}
                style={{
                  marginRight: "-.8rem",
                }}
              >
                Add &nbsp;
                {/*change icon if isbn is in the box */}
                {isbn.length >= 13 ? (
                  <FontAwesomeIcon icon={faCheck} beatFade />
                ) : (
                  <FontAwesomeIcon icon={faMinus} />
                )}
              </Button>
            </Container>
          </div>
        </Form>
        <Card style={{ padding: ".5rem", marginBottom: "1rem" }}>
          {books.length > 0 ? (
            renderBooks()
          ) : (
            <>
              <p style={{ textAlign: "center", marginTop: "1rem" }}>
                No books added
              </p>
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
        <div className="d-flex justify-content-between w-100">
          <Button variant="primary" onClick={handleNewCustomer}>
            <FontAwesomeIcon icon={faUserPlus} /> &nbsp;New Customer
          </Button>
          <div className="d-flex justify-content-end"></div>
          {outOfStockFlag ? (
            <Container style={{ width: "10rem", marginRight: "0rem", height: "1rem"}}>
              <Form.Text className="text-muted">
                *Some items in your cart are out of stock.
              </Form.Text>
            </Container>
          ) : (
            <></>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-between w-100">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <div className="d-flex justify-content-end">
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
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Checkout;
