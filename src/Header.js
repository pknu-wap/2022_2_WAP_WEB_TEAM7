import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

function Header() {
  return (
    <Navbar expand="lg" id="test">
      <Navbar.Brand href="/">Wapkiosk</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="Navs" href="/menu">
            메뉴조회
          </Nav.Link>
          <Nav.Link className="Navs" href="/signin">
            Sigk In
          </Nav.Link>
          <Nav.Link className="Navs" href="/signin">
            Sign In
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
