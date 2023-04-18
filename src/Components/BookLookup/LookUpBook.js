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
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../Images/literaryoasis-backdrop.png";

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
                  <Breadcrumb.Item active>Book Lookup</Breadcrumb.Item>
                </Breadcrumb>
              </Stack>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Text className="text-muted mb-4">
              Look up book by Title and Author or ISBN.
            </Form.Text>
            <Form.Group className="mt-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                tabIndex={1}
                value={title}
                onChange={handleBookDataTitle}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Author"
                tabIndex={2}
                onChange={handleBookDataAuthor}
              />
            </Form.Group>
            <hr className="mt-4" />
            <Form.Group>
              <Form.Label>ISBN</Form.Label>
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <OverlayTrigger
            placement="top"
            overlay={!((title.length > 0 && author.length > 0) || isbn.length > 0)
               ? (
                <Tooltip>You must enter Title & Author or ISBN to continue.</Tooltip>
              ) : (
                <></>
              )
            }
          >
            <Button variant="primary" type="submit" tabIndex={4}>
              Look up
            </Button>
            </OverlayTrigger>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default BookLookup;
