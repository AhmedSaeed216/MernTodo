import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Create from "./components/Create";
import AllTodos from "./components/AllTodos";
import Completed from "./components/Completed";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/all-todos" element={<AllTodos />} />
          <Route path="/completed" element={<Completed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
