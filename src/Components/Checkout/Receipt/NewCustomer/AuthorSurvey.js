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

const AuthorSurvey = () => {
  const [author, setAuthor] = useState("");
  const [authorList, setAuthorList] = useState([]);

  const handleAuthor = (event) => {
    event.preventDefault();
    // split the input string by spaces
    const words = author.split(" ");
    // capitalize the first letter of each word
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    // join the words back into a single string with spaces
    const capitalizedAuthor = capitalizedWords.join(" ");
    // add to author list
    setAuthorList([...authorList, capitalizedAuthor]);
    //set back to empty string
    setAuthor("");
  };

  // remove author from list
  const handleRemoveauthor = (index) => {
    const newList = [...authorList];
    newList.splice(index, 1);
    setAuthorList(newList);
  };

  //know when hovering over author pill
  const [authorHoverIndex, setAuthorHoverIndex] = useState(null);
  return (
    <>
      <Form.Label>Favorite Author Survey</Form.Label>
      <Form>
        <Row>
          <Form.Group as={Col}>
            {/*input for adding new author to the list */}
            <Form.Control
              type="text"
              placeholder="Authors..."
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              //when enter is pressed add category to the list
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAuthor(event);
                }
              }}
            />
          </Form.Group>
          {/*add author to the list */}
          <Form.Group as={Col}>
            <Button onClick={handleAuthor} tabIndex={1}>
              Add
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <Col>
        <Card className="mt-3">
          {/*display list of authors, click to remove */}
          {authorList.length === 0 ? (
            //conditional if there is no content
            <p style={{ textAlign: "center", paddingTop: "1rem" }}>
              No data avaliable.
            </p>
          ) : (
            <ListGroup className="p-2">
              <Row>
                {/*map over author list to display each author as a pill badge */}
                {authorList.map((item, index) => (
                  //display as a grid
                  <Col key={index} xs={6} md={4} sm={4}>
                    <Container
                      style={{ textAlign: "center", margin: "10px" }}
                      onMouseEnter={() => setAuthorHoverIndex(index)}
                      onMouseLeave={() => setAuthorHoverIndex(null)}
                    >
                      {/*display as badge */}
                      <Badge
                        //change color when hovering
                        bg={authorHoverIndex === index ? "danger" : "primary"}
                        pill
                        key={index}
                        style={{
                          fontSize: "1rem",
                          fontWeight: "normal",
                          cursor: "pointer",
                        }}
                        // remove when clicked
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveauthor(item);
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

export default AuthorSurvey;
