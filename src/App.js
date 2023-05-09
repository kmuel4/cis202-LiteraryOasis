import {
  Stack,
  Button,
  Container,
  Image,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import SearchBook from "./Components/SearchBook/SearchBook";
import BookDetails from "./Components/SearchBook/BookDetails";
import Checkout from "./Components/Checkout/Checkout";
import { useState } from "react";
import NewCustomer from "./Components/Checkout/NewCustomer/NewCustomer";
import Payment from "./Components/Checkout/Payment/Payment";
import Receipt from "./Components/Checkout/Receipt";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import textArt from "./Images/literaryoasis-textart.png";
import ReceiptAlert from "./Components/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCashRegister, faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "./Images/book.png";
import SimilarBooks from "./Components/SearchBook/SimilarBooks";

const App = () => {
  //handle what we show on the main screen
  const [index, setIndex] = useState(0);
  const handleSetIndex = (value) => {
    setIndex(value);
  };

  // handle showing toast on new customer add
  const [show, setShow] = useState(false);

  //show alert and clear cart
  const [alertFlag, setAlertFlag] = useState(false);
  const handleAlert = (value) => {
    setAlertFlag(value);
    handleSetCart(null);
  };

  //button to open book lookup
  const handleOpenBookLookup = () => {
    handleSetIndex(1);
    setAlertFlag(false);
  };

  //button to open checkout
  const handleOpenCheckout = () => {
    handleSetIndex(3);
    setAlertFlag(false);
  };

  //store book data
  const [bookData, setBookData] = useState("");
  const [bookIsbn, setBookIsbn] = useState("");

  //handle cart data
  const [cart, setCart] = useState([]);
  const handleSetCart = (event) => {
    setCart(event);
  };

  //search book
  const searchBook = (data) => {
    setBookIsbn(data);
    setIndex(2);
  };

  //clear isbn
  const clearIsbn = () => {
    setBookIsbn("");
  };

  //handle new customer added
  const newCustomerAdded = () => {
    setIndex(3);
    setShow(true);
  };

  //handle total cart amount
  const [total, setTotal] = useState()
  const handleTotal = (value) => {
    setTotal(value);
  }

  //screen manager
  const showScreen = (value) => {
    switch (value) {
      case 1:
        //search book
        return (
          <SearchBook
            onClose={handleSetIndex}
            bookData={setBookData}
            bookIsbn={setBookIsbn}
          />
        );
      case 7:
        //book list
        return <SimilarBooks onClose={handleSetIndex} bookData={bookData} bookIsbn={setBookIsbn}/>;
      case 2:
        //book details
        return (
          <BookDetails
            onClose={handleSetIndex}
            bookData={bookData}
            bookIsbn={bookIsbn}
            setIsbn={setBookIsbn}
          />
        );
      case 3:
        //checkout
        return (
          <Checkout
            onClose={handleSetIndex}
            bookIsbn={bookIsbn}
            saveCart={handleSetCart}
            getCart={cart}
            searchBook={searchBook}
            clearIsbn={clearIsbn}
            total={handleTotal}
          />
        );
      case 4:
        //new customer
        return (
          <NewCustomer onClose={handleSetIndex} onSubmit={newCustomerAdded} />
        );
      case 5:
        // payment
        return <Payment onClose={handleSetIndex} total={total}/>;
      case 6:
        //receipt
        return <Receipt onClose={handleSetIndex} receipt={handleAlert} />;
      default:
        return;
    }
  };

  //show receipt alert
  const showAlert = (value) => {
    if (value) {
      return <ReceiptAlert onClose={handleAlert} />;
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center pt-5 pb-3">
        <Container className="p-5">
          <Image
            src={textArt}
            className="mb-5"
            style={{
              width: "100%",
              height: "auto",
            }}
          ></Image>

          <div className="d-flex justify-content-center mb-4">
            <Button
              variant="primary"
              onClick={() => handleOpenBookLookup()}
              className="text-center me-3"
              style={{ width: "200px" }}
            >
              Book Search &nbsp;
              <FontAwesomeIcon icon={faSearch} />
            </Button>

            <Button
              variant="primary"
              onClick={() => handleOpenCheckout()}
              className="text-center ms-3"
              style={{ width: "200px" }}
            >
              Checkout &nbsp;
              <FontAwesomeIcon icon={faCashRegister} />
            </Button>
          </div>

          {/*show alert when receipt closes */}
          {showAlert(alertFlag)}

          <Stack gap={3}>{showScreen(index)}</Stack>
        </Container>
      </div>

      {/*toast for adding new customer */}
      <ToastContainer className="p-3" position="top-start">
        <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide>
          <Toast.Header>
            <Image
              roundedCircle
              src={logo}
              style={{ height: "1.5rem", width: "auto" }}
            />
            <strong className="me-auto">&nbsp;Literary Oasis</strong>
            <small>now</small>
          </Toast.Header>
          <Toast.Body>New Customer added to the database!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default App;
