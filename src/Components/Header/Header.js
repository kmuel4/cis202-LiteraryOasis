import { Container, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import icon from "./icon.module.css";

const Header = (props) => {
  return (
    <Container className={icon}>
      <h2>
        <FontAwesomeIcon icon={props.iconType} />
        <span className={icon.question}>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover>
                <Popover.Body>{props.message}</Popover.Body>
              </Popover>
            }
          >
            <FontAwesomeIcon icon={faQuestion} />
          </OverlayTrigger>
        </span>
      </h2>
    </Container>
  );
};

export default Header;
