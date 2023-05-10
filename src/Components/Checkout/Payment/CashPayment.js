import { Form, Container, InputGroup, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

const CashPayment = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here
  };

  //cash
  const [cash, setCash] = useState(0.0);
  // get change when cash is entered
  const [change, setChange] = useState();
  useEffect(() => {
    if (cash - props.total > 0) {
      setChange((cash - props.total).toFixed(2));
    } else {
      setChange("0.00");
    }
  }, [cash]);

  //initialize phone
  const [phone, setPhone] = useState("");

  //format phone
  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // remove non-numeric characters
    let formattedInput = "";
    if (input.length > 0) {
      formattedInput = "(" + input.slice(0, 3);
    }
    if (input.length > 3) {
      formattedInput += ") " + input.slice(3, 6);
    }
    if (input.length > 6) {
      formattedInput += "-" + input.slice(6, 10);
    }
    setPhone(formattedInput);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
            marginTop: "-1rem",
          }}
        >
          {/*total */}
          <Form.Group>
            <Form.Label>Total:</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control placeholder={props.total} disabled />
            </InputGroup>
          </Form.Group>
        </Container>
        <Row className="mb-3">
          {/*cash given */}
          <Form.Group as={Col}>
            <Form.Label>Cash Given:</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="0.00"
                required
                tabIndex={1}
                onChange={(event) => setCash(parseFloat(event.target.value))}
              />
            </InputGroup>
          </Form.Group>

          {/*change */}
          <Form.Group as={Col}>
            <Form.Label>Change Due:</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control placeholder={change} disabled />
            </InputGroup>
          </Form.Group>
        </Row>

        {/*phone number */}
        <Form.Group className="mb-3 mt-3" controlId="Phone">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="tel"
            placeholder="(123) 456-7890"
            value={phone}
            onChange={handlePhoneChange}
            required
            minLength="14"
            tabIndex={2}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="text-muted">
            *I have given the customer their change.
          </Form.Label>
          <Form.Check type="switch" required />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default CashPayment;
