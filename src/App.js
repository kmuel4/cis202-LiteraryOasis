import { Stack, Button, Container, Image } from "react-bootstrap";
import BookLookup from "./Components/BookLookup/LookUpBook";
import BookDetails from "./Components/BookLookup/BookDetails";
import Checkout from "./Components/Checkout/Checkout";
import { useState } from "react";
import NewCustomer from "./Components/Checkout/Receipt/NewCustomer/NewCustomer";
import CardPayment from "./Components/Checkout/Payment";
import Receipt from "./Components/Checkout/Receipt/Receipt";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import textArt from "./Images/literaryoasis-textart.png";
import ReceiptAlert from "./Components/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCashRegister, faSearch } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [index, setIndex] = useState(0);
  const handleSetIndex = (value) => {
    setIndex(value);
  };

  const [alertFlag, setAlertFlag] = useState(false);
  const handleAlert = (value) => {
    setAlertFlag(value);
  };

  const handleOpenBookLookup = () => {
    handleSetIndex(1);
    setAlertFlag(false);
  };

  const handleOpenCheckout = () => {
    handleSetIndex(3);
    setAlertFlag(false);
  };

  //store book data
  const [bookData, setBookData] = useState('');
  const [bookIsbn, setBookIsbn] = useState('');

  //handle cart data
  const [cart, setCart] = useState([]);
  const handleSetCart = (event) => {
    setCart(event);
  };

  const [cartFlag, setCartFlag] = useState(false);

  //search book
  const searchBook = (data) => {
    setBookIsbn(data);
    setIndex(2);
  };

  //clear isbn
  const clearIsbn = () => {
    setBookIsbn('');
  }

  //screen manager
  const showScreen = (value) => {
    switch (value) {
      case 1:
        return (
          <BookLookup
            onClose={handleSetIndex}
            bookData={setBookData}
            bookIsbn={setBookIsbn}
          />
        );
      case 2:
        return (
          <BookDetails
            onClose={handleSetIndex}
            bookData={bookData}
            bookIsbn={bookIsbn}
          />
        );
      case 3:
        return (
          <Checkout
            onClose={handleSetIndex}
            bookIsbn={bookIsbn}
            saveCart={handleSetCart}
            getCart={cart}
            searchBook={searchBook}
            clearIsbn={clearIsbn}
          />
        );
      case 4:
        return (
          <NewCustomer onClose={handleSetIndex} onSubmit={handleSetIndex} />
        );
      case 5:
        return <CardPayment onClose={handleSetIndex} />;
      case 6:
        return <Receipt onClose={handleSetIndex} receipt={handleAlert} />;
      default:
        return;
    }
  };

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
              Book Search &nbsp;<FontAwesomeIcon icon={faSearch} />
            </Button>

            <Button
              variant="primary"
              onClick={() => handleOpenCheckout()}
              className="text-center ms-3"
              style={{ width: "200px" }}
            >
              Checkout &nbsp;<FontAwesomeIcon icon={faCashRegister} />
            </Button>
          </div>

          {showAlert(alertFlag)}

          <Stack gap={3}>{showScreen(index)}</Stack>
        </Container>
      </div>
    </>
  );
};

export default App;
