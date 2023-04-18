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

const CategorySurvey = () => {
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const handleCategory = (event) => {
    event.preventDefault();
    //capitalize the beginning of each category
    const capitalizedCategory = category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setCategoryList([...categoryList, capitalizedCategory]);
    //set back to empty string
    setCategory("");
  };

  // remove category from list
  const handleRemoveCategory = (index) => {
    const newList = [...categoryList];
    newList.splice(index, 1);
    setCategoryList(newList);
  };

  //know when hovering over category pill
  const [catHoverIndex, setCatHoverIndex] = useState(null);
  return (
    <>
      <Form.Label>Reading Interest Survey</Form.Label>
      <Form>
        <Row>
          <Form.Group as={Col}>
            {/*input for adding new category to the list */}
            <Form.Control
              type="text"
              placeholder="Categories..."
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              //when enter is pressed activate the button
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleCategory(event);
                }
              }}
            />
          </Form.Group>
          {/*add category to the list */}
          <Form.Group as={Col}>
            <Button onClick={handleCategory} tabIndex={1}>
              Add
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <Col>
        <Card className="mt-3">
          {/*display list of categories, click to remove */}
          {categoryList.length === 0 ? (
            //conditional if there is no content
            <p style={{ textAlign: "center", paddingTop: "1rem" }}>
              No data avaliable.
            </p>
          ) : (
            <ListGroup className="p-2">
              <Row>
                {/*map over category list to display each category as a pill badge */}
                {categoryList.map((item, index) => (
                  //display as a grid
                  <Col key={index} xs={6} md={4} sm={4}>
                    <Container
                      style={{ textAlign: "center", margin: "10px" }}
                      onMouseEnter={() => setCatHoverIndex(index)}
                      onMouseLeave={() => setCatHoverIndex(null)}
                    >
                      {/*display as badge */}
                      <Badge
                        //change color when hovering
                        bg={catHoverIndex === index ? "danger" : "primary"}
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
                          handleRemoveCategory(item);
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

export default CategorySurvey;
