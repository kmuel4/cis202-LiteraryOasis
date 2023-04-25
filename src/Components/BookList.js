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
  Card,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Images/book.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBook,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./Header/Header";
import BookDatabase from "../assets/BookDatabase";

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

  //get list of books from database
  const [retrievedBookList, setRetrievedBookList] = useState([]);

  //selected book ISBN
  const [selectedBook, setSelectedBook] = useState("");

  //proceed to book details
  const handleNext = (event) => {
    event.preventDefault();
    //find book that matches ISBN in database
    const selectedBookIndex = retrievedBookList.findIndex(
      (book) => book.ISBN === selectedBook
    );
    setSelectedBook(retrievedBookList[selectedBookIndex])
    props.onClose(2);
    props.bookIsbn(selectedBook);
    setShow(false);
  };

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
                  Book List
                </Breadcrumb.Item>
              </Breadcrumb>
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleNext}>
          <Modal.Body>
            {/*header */}
            <Header
              iconType={faBook}
              message="Book List shows all books in the database."
            />
            {/*book title and author from search */}
            <Row className="mb-3 mt-2">
              {/*title */}
              <Form.Group as={Col}>
                <Form.Control placeholder={props.bookData.title} disabled />
              </Form.Group>
              {/*author */}
              <Form.Group as={Col}>
                <Form.Control placeholder={props.bookData.author} disabled />
              </Form.Group>
            </Row>
            <Card
              style={{
                maxHeight: "30rem",
                marginTop: ".5rem",
                overflowY: "auto",
                overflowX: "hidden",
                paddingRight: ".25rem",
              }}
            >
              <table className="table" style={{ overflow: "auto" }}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                  </tr>
                </thead>
                <tbody>
                  {retrievedBookList.map((book, index) => (
                    <tr key={index} style={{ border: "1px solid lightgrey" }}>
                      <td style={{ border: "1px solid lightgrey" }}>
                        <Form.Check
                          type="radio"
                          id={index}
                          name="selectedBook"
                          value={book.ISBN}
                          onChange={(event) =>
                            setSelectedBook(event.target.value)
                          }
                          defaultChecked={index === 0}
                        />
                      </td>
                      <td>{book.Title}</td>
                      <td>{book.Author}</td>
                      <td>{book.ISBN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-between w-100">
              <Button variant="secondary" onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} /> Return
              </Button>
              <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Search <FontAwesomeIcon icon={faArrowRight} shake />
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default BookDetails;
