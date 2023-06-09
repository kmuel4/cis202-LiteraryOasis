import { Card, OverlayTrigger, Popover } from "react-bootstrap";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const PaymentOption = (props) => {
  // which payment type is selected
  const [selected, setSelected] = useState(props.selected);
  const handleSelect = (event) => {
    props.changeSelected(selected);
  };

  //when payment type selected, update Payment.js
  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  return (
    <>
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
        {/*icon */}
        <Card.Text>
          <FontAwesomeIcon icon={props.iconType} size="2xl" />
        </Card.Text>
        <Card.Title style={{ marginTop: "-.75rem" }}>{props.type}</Card.Title>
      </Card>
      {/*show ? icon after cash button */}
      {props.type === "Cash" && (
        <span
          style={{
            fontSize: ".75rem",
            position: "relative",
            top: "-6.8rem",
            left: "18.3rem",
            cursor: "pointer",
          }}
        >
          {/*overlay */}
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover>
                {/*unique message for each popover */}
                <Popover.Body>Click to select payment option.</Popover.Body>
              </Popover>
            }
          >
            {/*question icon to open popover */}
            <FontAwesomeIcon icon={faQuestion} />
          </OverlayTrigger>
        </span>
      )}
    </>
  );
};

export default PaymentOption;
