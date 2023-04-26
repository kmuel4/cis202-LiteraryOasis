import { Container, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import icon from "./icon.module.css";

const Header = (props) => {
  return (
    <Container className={icon}>
      <h2>
        {/*unique icon for each ehader */}
        <FontAwesomeIcon icon={props.iconType} />
        <span className={icon.question}>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover>
                {/*unique message for each popover */}
                <Popover.Body>{props.message}</Popover.Body>
              </Popover>
            }
          >
            {/*question icon to open popover */}
            <FontAwesomeIcon icon={faQuestion} />
          </OverlayTrigger>
        </span>
      </h2>
    </Container>
  );
};

export default Header;
