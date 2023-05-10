import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const RenderBooks = (props) => {
  //initialize books object
  const [books, setBooks] = useState([]);

  //update books when parent adds a book
  useEffect(() => {
    setBooks(props.books);
  }, [props.books, books]);

  //remove a book from the modal
  const removeBook = (indexToRemove) => {
    props.removeBook(indexToRemove);
  };
  return (
    <div
      style={{ maxHeight: "20rem", height: "20rem", overflowY: "scroll", overflowX: "hidden" }}
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
                style={{ marginTop: "32px", display: "flex", justifyContent: "right" }}
              >
                <Button
                  variant="danger"
                  style={{
                    maxHeight: "2.5rem",
                    overflowX: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => removeBook(index)}
                >
                  Remove &nbsp;
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
              </Container>
              {book.status === false ? (
                <Container
                  style={{
                    marginTop: ".5rem",
                    marginBottom: "-.5rem",
                  }}
                >
                  <mark style={{ fontSize: ".75rem", color: "grey" }}>
                    *This book is out of stock.
                  </mark>
                </Container>
              ) : (
                <></>
              )}
            </Row>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderBooks;
