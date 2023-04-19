import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Image,
  Breadcrumb,
  Stack,
  OverlayTrigger,
  Tooltip,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Images/literaryoasis-backdrop.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons";

const BookLookup = (props) => {
  const [show, setShow] = useState(true);

  //initalize isbn
  const [isbn, setIsbn] = useState("");
  //initialize author
  const [author, setAuthor] = useState("");
  //initialize title
  const [title, setTitle] = useState("");

  //create object to carry book data
  const [bookData, setBookData] = useState({ title: null, author: null });
  const handleBookDataTitle = (data) => {
    setBookData({ ...bookData, title: data.target.value });
    setTitle(data.target.value);
  };
  const handleBookDataAuthor = (data) => {
    setBookData({ ...bookData, author: data.target.value });
    setAuthor(data.target.value);
  };

  const handleClose = () => {
    props.onClose(0);
    setShow(false);
  };

  const handleNext = () => {
    if ((title.length > 0 && author.length > 0) || isbn.length > 0) {
      props.onClose(2);
      props.bookIsbn(isbn);
      props.bookData(bookData);
      setShow(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header className="stick-top" style={{ padding: ".5rem 1rem", borderBottom: "none" }} closeButton>
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
                    Book Search
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Stack>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <h2
                className="text-center"
                style={{
                  fontSize: "3rem",
                  color: "black",
                  marginTop: "-1rem"
                }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </h2>
            </Container>
            <Form.Text className="text-muted mb-4">
              *Look up book by Title and Author or ISBN.
            </Form.Text>
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
            <hr
              style={{
                marginLeft: "-1rem",
                marginRight: "-1rem",
                marginTop: "1.5rem",
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
                      (title.length > 0 && author.length > 0) ||
                      isbn.length > 0
                    ) ? (
                      <Tooltip>
                        You must enter Title & Author or ISBN to continue.
                      </Tooltip>
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

export default BookLookup;