import { Modal, Image, Stack, Breadcrumb } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Images/book.png";

const ModalHeader = (props) => {
  return (
    <Modal.Header
      className="stick-top"
      style={{ padding: ".5rem 1rem", borderBottom: "none" }}
      closeButton
    >
      <Modal.Title style={{ fontSize: "1.5rem" }}>
        {/*book logo */}
        <Stack direction="horizontal" gap={1}>
          <Image
            roundedCircle
            src={logo}
            style={{ height: "3rem", width: "auto" }}
          />
          &nbsp;
          {/*print breadcrumbs from prop object */}
          <Breadcrumb style={{ fontSize: "1.25rem", marginTop: "1rem" }}>
            {props.breadcrumbs.map((breadcrumb, index) => (
              <Breadcrumb.Item
                key={index}
                active
                //if at the end of breadcrumb object, make text color black, others grey
                style={{
                  color:
                    index === props.breadcrumbs.length - 1 ? "black" : "grey",
                }}
              >
                {breadcrumb}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </Stack>
      </Modal.Title>
    </Modal.Header>
  );
};

export default ModalHeader;
