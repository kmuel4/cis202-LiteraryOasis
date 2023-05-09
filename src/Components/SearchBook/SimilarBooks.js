import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBook,
  faArrowRight,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/Header";
import BookDatabase from "../../assets/BookDatabase";
import ModalHeader from "../ModalHeader";

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
  const handleRetrievedBookList = (value) => {
    setRetrievedBookList(value);
  };

  // filtered book list from search
  const [filteredBookList, setFilteredBookList] = useState([]);

  // filter the retrieved book list to only include books that match the author or title
  useEffect(() => {
    const filtered = retrievedBookList.filter(
      (book) =>
        // will only filter if not null or empty string
        (book.Author?.toLowerCase().includes(
          props.bookData.author?.toLowerCase()
        ) ??
          false) ||
        (book.Title?.toLowerCase().includes(
          props.bookData.title?.toLowerCase()
        ) ??
          false)
    );
    // set the filtered book list
    setFilteredBookList(filtered);
  }, [retrievedBookList, props.bookData.author, props.bookData.title]);

  //selected book ISBN
  const [selectedBook, setSelectedBook] = useState("");

  //proceed to book details
  const handleSubmit = (event) => {
    event.preventDefault();
    //find book that matches ISBN in database
    const selectedBookIndex = retrievedBookList.findIndex(
      (book) => book.ISBN === selectedBook
    );
    setSelectedBook(retrievedBookList[selectedBookIndex]);
    props.onClose(2);
    props.bookIsbn(selectedBook);
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        {/*get the booklist */}
        <BookDatabase retrievedBookList={handleRetrievedBookList} />

        {/*modal header stuff */}
        <ModalHeader breadcrumbs={["Book Search", "Similar Books"]} />

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {/*header */}
            <Header
              iconType={faBook}
              message="Book List shows similar books found based on your search. Click to select and get details for a book."
            />
            {/*book title and author from search */}
            <Row className="mt-2">
              {/*title */}
              <Form.Group as={Col}>
                <Form.Label>Title:</Form.Label>
                <Form.Control placeholder={props.bookData.title} disabled />
              </Form.Group>
              {/*author */}
              <Form.Group as={Col}>
                <Form.Label>Author:</Form.Label>
                <Form.Control placeholder={props.bookData.author} disabled />
              </Form.Group>
            </Row>
            <Form.Text className="text-muted">Did you mean...</Form.Text>
            {/*table card*/}
            <Card
              style={{
                maxHeight: "30rem",
                marginTop: ".5rem",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {/*show table if it has contents, show conditional message otherwise */}
              {filteredBookList.length > 0 ? (
                <table
                  className="table"
                  style={{ overflow: "auto", marginBottom: "0rem" }}
                >
                  {/*table */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Title</th>
                      <th>Author</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      //loop through filtered booklist and print it in the table
                      filteredBookList.map((book, index) => (
                        <tr key={index}>
                          <td style={{ border: "1px solid lightgrey", textAlign: "center" }}>
                            {/*radio button gets isbn */}
                            <Form.Check
                              type="radio"
                              id={index}
                              name="selectedBook"
                              value={book.ISBN}
                              onChange={(event) =>
                                setSelectedBook(event.target.value)
                              }
                              required
                            />
                          </td>
                          {/*print title */}
                          <td>{book.Title}</td>
                          {/*print author */}
                          <td>{book.Author}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              ) : (
                //no books found
                <Container style={{ textAlign: "center", padding: "1rem" }}>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    size="2xl"
                    style={{ color: "#ffc107" }}
                  />
                  <h5 className="mt-1">No books found.</h5>
                </Container>
              )}
            </Card>
            <Form.Text className="text-muted">*Showing {filteredBookList.length} results</Form.Text>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-between w-100">
              {/*back button */}
              <Button variant="secondary" onClick={handleBack}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  shake={filteredBookList.length === 0}
                />{" "}
                Return
              </Button>
              <div className="d-flex justify-content-end">
                {/*search button */}
                <Button
                  variant="primary"
                  type="submit"
                  disabled={filteredBookList.length === 0}
                >
                  Search{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    shake={filteredBookList.length > 0}
                  />
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
