import { useContext } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { authContext } from "../../providers/AuthProvider";
import ShoppingList from '../ShoppingList/';
import Login from '../Login/';
import Register from '../Register/';

function App() {
  const { logout } = useContext(authContext);

  return (
    <main className="App">
        <Router>
        <Navbar bg="myTeal" variant="dark" fixed="top" expand="sm">
          <Navbar.Brand href="/">FridgeApp</Navbar.Brand>
          <Navbar.Toggle />
          <NavbarCollapse>
            <Nav>
              <Nav.Link as={Link} to="/fridge">MyFridge</Nav.Link>
              <Nav.Link as={Link} to="/grocery-list">Grocery List</Nav.Link>
              <Nav.Link as={Link} to="/recipes">Recipe Ideas</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link onClick={() => logout()}>
                Logout
              </Nav.Link>
            </Nav>
          </NavbarCollapse>
        </Navbar>

        <section className="content">
          <Routes>
            <Route path="/fridge" element={<h1>Fridge Index</h1>} />
            <Route path="/grocery-list" element={<ShoppingList />} />
            <Route path="/recipes" element={<h1>Recipes Index</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </section>
      </Router>
    </main>
  );
}

export default App;
