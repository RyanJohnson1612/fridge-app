import { useContext } from 'react';
import { Nav, Navbar, NavDropdown  } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Link } from "react-router-dom";
import { authContext } from "../../providers/AuthProvider";
import GroceryListDropdown from './GroceryListDropdown';

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

          <NavDropdown title="Grocery Lists" id="basic-nav-dropdown">
            <GroceryListDropdown />
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Make a new Grocery List</NavDropdown.Item>
          </NavDropdown>
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
