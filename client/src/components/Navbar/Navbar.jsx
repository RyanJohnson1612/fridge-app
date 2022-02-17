import { useContext, useEffect } from 'react';
import { Nav, Navbar } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Link } from "react-router-dom";
import { authContext } from "../../providers/AuthProvider";

function Navigation() {
  const { user, logout } = useContext(authContext);

  return (
    <Navbar bg="myTeal" variant="dark" fixed="top" expand="sm">
      <Navbar.Brand as={Link} to="/">FridgeApp</Navbar.Brand>
      <Navbar.Toggle />
      <NavbarCollapse>
        <Nav>
          <Nav.Link as={Link} to="/fridge">MyFridge</Nav.Link>
          <Nav.Link as={Link} to="/grocery-list">Grocery List</Nav.Link>
          <Nav.Link as={Link} to="/recipes">Recipe Ideas</Nav.Link>
          <Nav.Link as={Link} to="/fridge-item/new">Add Fridge Item</Nav.Link>
        </Nav>
        { user ?
            <Nav className="nav-right">
              <Nav.Item className="nav-link">Logged in as {user.firstName}</Nav.Item>
              <Nav.Link as={Link} to="/login" onClick={() => logout()}>Logout</Nav.Link>
            </Nav>
            :
            <Nav>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav>
          }
      </NavbarCollapse>
    </Navbar>
  )
}

export default Navigation;
