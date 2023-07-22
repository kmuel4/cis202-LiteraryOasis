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
  }, [cash, props.total]);

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
      </Form>
    </Container>
  );
};

export default CashPayment;
