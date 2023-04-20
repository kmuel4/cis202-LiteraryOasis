import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

const ReceiptAlert = (props) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.onClose(false);
  };

  if (show) {
    return (
      <Alert variant="warning" onClose={handleClose} dismissible>
        <Alert.Heading>Transaction Complete!</Alert.Heading>
        <p>
          The customer can now leave with their books. If they ordered a book
          that was out of stock, remind them that we will contact them
          immediately when it arrives in the store.
        </p>
      </Alert>
    );
  }
};

export default ReceiptAlert;
