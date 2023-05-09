import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const PaymentOption = (props) => {
  const [selected, setSelected] = useState(props.selected);
  const handleSelect = (event) => {
    props.changeSelected(selected);
  }

  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  return (
    <Card
      border={selected === true ? "dark" : "light"}
      style={{
        width: "8rem",
        margin: "1rem",
        paddingTop: ".5rem",
        boxShadow: "1px 1px 5px #888888",
        cursor: "pointer",
      }}
      onClick={() => handleSelect()}
    >
      <Card.Text>
        <FontAwesomeIcon icon={props.iconType} size="2xl" />
      </Card.Text>
      <Card.Title style={{ marginTop: "-.75rem" }}>{props.type}</Card.Title>
    </Card>
  );
};

export default PaymentOption;
