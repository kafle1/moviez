import React from "react";
import Home from "./pages/Home.page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails.page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
