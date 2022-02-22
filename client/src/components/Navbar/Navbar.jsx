import { useContext, useState } from 'react';
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Link } from "react-router-dom";
import { authContext } from "../../providers/AuthProvider";
import GroceryListDropdown from './GroceryListDropdown';
import NewGroceryListModal from './NewGroceryListModal';
import fridgeLogo from "../../images/fridge-logo3.png"

function Navigation() {
  const { user, logout } = useContext(authContext);
  const [allGroceryLists, setAllGroceryLists] = useState([]);
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar bg="myteal" variant="dark" fixed="top" expand="lg" expanded={expanded}>
      <Navbar.Brand as={Link} to="/">
          <img src={fridgeLogo} height="40" alt="Fridgie App Logo"/>
          Fridgie
      </Navbar.Brand>
      <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} />
      <NavbarCollapse >
        <Nav>
          <Nav.Link as={Link} onClick={() => setExpanded(false)} to="/fridge">MyFridge</Nav.Link>
          <Nav.Link as={Link} onClick={() => setExpanded(false)} to="/recipes">Recipe Ideas</Nav.Link>


          <NavDropdown title="Grocery Lists" id="basic-nav-dropdown" menuVariant="dark">
            <GroceryListDropdown allGroceryLists={allGroceryLists} setAllGroceryLists={setAllGroceryLists} onClick={setExpanded}/>
            <NavDropdown.Divider />
            <NewGroceryListModal allGroceryLists={allGroceryLists} setAllGroceryLists={setAllGroceryLists} onClick={setExpanded}/>
          </NavDropdown>

          <Nav.Link as={Link} onClick={() => setExpanded(false)} to="/fridge-items/new">Add Fridge Item</Nav.Link>

        </Nav>
        { user ?
            <Nav className="nav-right">
              <Nav.Item className="nav-link">Logged in as {user.firstName}</Nav.Item>
              <Nav.Link as={Link} to="/login" onClick={() => { logout(); setExpanded(false); }}>Logout</Nav.Link>
            </Nav>
            :
            <Nav>
              <Nav.Link as={Link} onClick={() => setExpanded(false)} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} onClick={() => setExpanded(false)} to="/register">Register</Nav.Link>
            </Nav>
          }
      </NavbarCollapse>
    </Navbar>
  )
}

export default Navigation;
