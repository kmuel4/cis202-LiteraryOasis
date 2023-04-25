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
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Images/book.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBook } from "@fortawesome/free-solid-svg-icons";
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

  //handle book info coming in
  const [book, setBook] = useState({
    Title: "",
    Author: "",
    Price: "",
    Status: "",
    ISBN: "",
    Location: "",
  });

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
        <Modal.Body>
          <Header
            iconType={faBook}
            message="Book List shows all books in the database."
          />
          <Card style={{maxHeight: "30rem", marginTop: "2rem"}}>
            <div style={{ overflow: "auto"}}>
            <table className="table" style={{ overflow: "auto"}}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>ISBN</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {retrievedBookList.map((book, index) => (
                  <tr key={index}>
                    <td>{book.Title}</td>
                    <td>{book.Author}</td>
                    <td>${book.Price}</td>
                    <td>{book.Status}</td>
                    <td>{book.ISBN}</td>
                    <td>{book.Location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </Card>
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
