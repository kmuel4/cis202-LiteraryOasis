import { Form, Container, InputGroup, Row, Col } from "react-bootstrap";
import {useState, useEffect} from 'react';

const CashPayment = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const [cash, setCash] = useState(0.00);

  const [change, setChange] = useState();
  useEffect(() => {
    if(cash - props.total > 0){
        setChange((cash - props.total).toFixed(2));
    }
    else{
        setChange("0.00");
    }
  }, [cash]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <Form.Group>
            <Form.Label>Total:</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control placeholder={props.total} disabled />
            </InputGroup>
          </Form.Group>
        </Container>
        <Row className="mb-3">
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
