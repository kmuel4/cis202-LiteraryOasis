import {
  ListGroup,
  Card,
  Badge,
  Container,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Survey = (props) => {
  //initialize input and input list
  const [input, setInput] = useState("");
  const handleSetInput = (event) => {
    setInput(event);
    console.log(event);
  };
  const [inputList, setInputList] = useState([]);

  //handle animation of enter button
  const [enterAnimate, setEnterAnimate] = useState(false);
  const handleEnterAnimate = () => {
    setEnterAnimate(true);
    setTimeout(() => {
      setEnterAnimate(false);
    }, 1000);
  };

  // handle submit of input
  const handleSubmit = (event) => {
    event.preventDefault();
    //capitalize the beginning of each input
    const capitalizedInput = input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .trim(); // remove leading and trailing white spaces
    if (capitalizedInput !== "") {
      // check if the input is not empty
      setInputList([...inputList, capitalizedInput]);
      //set back to empty string
      setInput("");
      handleEnterAnimate();
    }
    //reset input if fail
    else {
      setInput("");
    }
  };

  // remove input from list
  const handleRemoveInput = (index) => {
    const newList = [...inputList];
    newList.splice(index, 1);
    setInputList(newList);
  };

  //know when hovering over input pill
  const [hoverIndex, setInputHoverIndex] = useState(null);

  return (
    <>
      <Form.Label>{props.surveyType}</Form.Label>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col}>
            {/*field for adding new input to the list */}
            <Form.Control
              type="text"
              placeholder={props.surveyPlaceholder}
              value={input}
              onChange={(event) => handleSetInput(event.target.value)}
              maxLength={20}
              //when enter is pressed activate the button
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmit(event);
                }
              }}
              pattern="[^\s].*"
              tabIndex={6}
            />
          </Form.Group>
          {/*add input to the list */}
          <Form.Group as={Col}>
            <Button onClick={handleSubmit} tabIndex={7}>
              <FontAwesomeIcon icon={faShare} bounce={enterAnimate} />
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <Col>
        <Card style={{ marginTop: "1.2rem" }}>
          {/*display list of input, click to remove */}
          {inputList.length === 0 ? (
            //conditional if there is no content
            <p style={{ textAlign: "center", paddingTop: "1rem" }}>
              No data avaliable.
            </p>
          ) : (
            <ListGroup style={{ marginLeft: "-.5rem", marginRight: ".5rem" }}>
              <Row>
                {/*map over input list to display each input as a pill badge */}
                {inputList.map((item, index) => (
                  //display in a grid
                  <Col key={index} md={4} sm={4}>
                    <Container style={{ textAlign: "center", margin: "10px" }}>
                      {/*display input as badge */}
                      <Badge
                        //change color when hovering
                        bg={hoverIndex === index ? "danger" : "primary"}
                        pill
                        key={index}
                        style={{
                          fontSize: "1rem",
                          fontWeight: "normal",
                          cursor: "pointer",
                          maxWidth: "7rem",
                          maxHeight: "3rem",
                          whiteSpace: "normal",
                        }}
                        //know when mouse is inside our outside input pill
                        onMouseEnter={() => setInputHoverIndex(index)}
                        onMouseLeave={() => setInputHoverIndex(null)}
                        // remove when clicked
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveInput(item);
                        }}
                      >
                        {item}
                      </Badge>
                    </Container>
                  </Col>
                ))}
              </Row>
            </ListGroup>
          )}
        </Card>
      </Col>
    </>
  );
};

export default Survey;
