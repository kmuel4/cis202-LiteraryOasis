import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Stack,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/Header";
import ModalHeader from "../ModalHeader"

const BookSearch = (props) => {
  //handle modal
  const [show, setShow] = useState(true);

  //submit search
  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext();
  };

  //close
  const handleClose = () => {
    props.onClose(0);
    setShow(false);
  };

  const [similarSearch, setSimilarSearch] = useState(false);

  //initalize isbn
  const [isbn, setIsbn] = useState("");
  //initialize author
  const [author, setAuthor] = useState("");
  //initialize title
  const [title, setTitle] = useState("");

  //create object to carry book data
  const [bookData, setBookData] = useState({ title: null, author: null });

  //handle book title
  const handleBookDataTitle = (data) => {
    setBookData({ ...bookData, title: data.target.value });
    setTitle(data.target.value);
  };

  //handle book author
  const handleBookDataAuthor = (data) => {
    setBookData({ ...bookData, author: data.target.value });
    setAuthor(data.target.value);
  };

  //proceed to book details
  const handleNext = () => {
    //do precision search
    if (!similarSearch) {
      if ((title.length > 0 && author.length > 0) || isbn.length > 0) {
        props.onClose(2);
        props.bookIsbn(isbn);
        props.bookData(bookData);
        setShow(false);
      }
    }
    //do similar search
    else {
      props.onClose(7);
      props.bookData(bookData);
      setShow(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Form onSubmit={handleNext}>

        {/*modal header stuff */}
        <ModalHeader breadcrumbs={["Book Search"]} />

          <Modal.Body>
            <Header
              iconType={faSearch}
              message="Book Search allows us to search for details about a 
              book using either Title and Author or ISBN."
              onClick={handleNext}
            />
            <Form.Group className="mt-2">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                tabIndex={1}
                value={title}
                onChange={handleBookDataTitle}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Author:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Author"
                tabIndex={2}
                onChange={handleBookDataAuthor}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Stack direction="horizontal" gap={3}>
                <Form.Label>Search similar books:</Form.Label>
                <Form.Check
                  type="checkbox"
                  style={{ marginTop: "-.4rem" }}
                  onChange={() => setSimilarSearch(!similarSearch)}
                />
              </Stack>
            </Form.Group>
            <hr
              style={{
                marginLeft: "-1rem",
                marginRight: "-1rem",
              }}
            />
            <Form.Group>
              <Form.Label>ISBN:</Form.Label>
              <Form.Control
                value={isbn}
                placeholder="Enter ISBN"
                onChange={(event) => {
                  const value = event.target.value;
                  if (value.length <= 13) {
                    // check if input length is <= 13
                    setIsbn(value);
                  } else {
                    setIsbn(value.slice(0, 13)); // truncate input to 13 digits
                  }
                }}
                tabIndex={3} // jump back here on add
                pattern="[0-9]{13}"
              />
              <Form.Text className="text-muted">
                *Must be <strong>13</strong> digits.{" "}
                <em>
                  Currently entered <strong>{isbn.length}</strong> digits.
                </em>
              </Form.Text>
            </Form.Group>
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
                    !(
                      ((title.length > 0 && author.length > 0) ||
                      isbn.length >= 13) || similarSearch
                    ) ? (
                      <Tooltip>You must enter Title & Author or ISBN.</Tooltip>
                    ) : (
                      <></>
                    )
                  }
                >
                  <Button variant="primary" type="submit" tabIndex={4}>
                    Search &nbsp;
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      shake={
                        (title.length > 0 && author.length > 0) ||
                        isbn.length >= 13
                      }
                    />
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default BookSearch;
