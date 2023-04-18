import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
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
          You are free to give the customer their books. Give them a friendly
          remind that if they ordered a book that is out of stock, we will 
          contact them immediately when it arrives in the store.
        </p>
      </Alert>
    );
  }
}

export default ReceiptAlert;