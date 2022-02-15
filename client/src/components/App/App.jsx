import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../Navbar/'
import ShoppingList from '../ShoppingList/';
import Login from '../Login/';
import Register from '../Register/';

function App() {
  return (
    <main className="App">
      <Router>
        <Navbar />
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
