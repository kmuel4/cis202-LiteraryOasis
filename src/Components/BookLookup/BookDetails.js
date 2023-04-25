import { useState, useEffect } from "react";
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
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Images/book.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCartShopping,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/Header";
import BookDatabase from "../../assets/BookDatabase";

const BookDetails = (props) => {
  //show the modal
  const [show, setShow] = useState(true);

  //close
  const handleClose = () => {
    props.onClose(0);
    setShow(false);
  };
  //return to search
  const handleBack = () => {
    props.onClose(1);
    setShow(false);
  };
  //add to the cart
  const handleAdd = () => {
    props.onClose(3);
    props.setIsbn(book.ISBN);
    setShow(false);
  };

  //null flag, no book found
  const [nullFlag, setNullFlag] = useState(false);

  //get list of books from database
  const [retrievedBookList, setRetrievedBookList] = useState([]);

  //handle book info coming in
  const [book, setBook] = useState({
    Title: "",
    Author: "",
    Price: "",
    Status: "",
    ISBN: "",
    Location: "",
  });

  //get selected book from booklist, add it to fields
  useEffect(() => {
    let selectedBook = null;

    //check for isbn first
    if (props.bookIsbn) {
      selectedBook = retrievedBookList.find(
        (book) => book.ISBN === props.bookIsbn
      );
      setNullFlag(false);
    }
    // if no isbn, use author and title
    else if (props.bookData) {
      selectedBook = retrievedBookList.find(
        (book) =>
          book.Author === props.bookData.author &&
          book.Title === props.bookData.title
      );
      setNullFlag(false);
    }
    //if we got a selected book, set it
    if (selectedBook) {
      setBook(selectedBook);
    } else {
      setNullFlag(true);
      setBook({
        Title: "NULL",
        Author: "NULL",
        Price: "NULL",
        Status: "NULL",
        ISBN: props.bookIsbn,
        Location: "NULL",
      });
    }
  }, [retrievedBookList, props.bookIsbn, props.bookData]);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        {/*get the booklist */}
        <BookDatabase retrievedBookList={setRetrievedBookList} />

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
                  Book Search
                </Breadcrumb.Item>
                <Breadcrumb.Item active style={{ color: "grey" }}>
                  Book Details
                </Breadcrumb.Item>
              </Breadcrumb>
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Header
            iconType={faBookOpen}
            message="Book Details provides Title, Author, ISBN, Location, Avaliability, and Price
                  of a searched book. If the book is out of stock, it can still
                  be added to the cart and ordered to the store after completing
                  checkout."
          />

          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control placeholder={book.Title} disabled />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control placeholder={book.Author} disabled />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>ISBN</Form.Label>
            <Form.Control placeholder={book.ISBN} disabled />
          </Form.Group>
          <hr />
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control placeholder={book.Location} disabled />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Avaliability</Form.Label>
              <Form.Control placeholder={book.Status} disabled />
            </Form.Group>
          </Row>
          <Form onSubmit={handleAdd}>
            <div className="d-flex justify-content-between">
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Price</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>

                  <Form.Control placeholder={book.Price} disabled />
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                style={{
                  marginTop: "2rem",
                  textAlign: "right",
                  marginLeft: "1rem",
                }}
              >
                <Button
                  variant={!nullFlag ? "primary" : "danger"}
                  type="submit"
                  style={{ width: "14rem" }}
                  disabled={nullFlag}
                >
                  <FontAwesomeIcon icon={faCartShopping} beat={!nullFlag} />
                  &nbsp; Add to Cart
                </Button>
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between w-100">
            <Button variant="primary" onClick={handleBack}>
              <FontAwesomeIcon icon={faArrowLeft} /> Return
            </Button>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookDetails;
