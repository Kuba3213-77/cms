import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { PAGES, Home, Company, Offer, Contact, Admin } from "./views";
import Context from "./context";
import { useState } from "react";

function App() {
  const [slider, setSlider] = useState(true);
  const [slider_background, setSlider_background] = useState("#9eef88ff");

  return (
    <div className="container">
      <Header />
      <Context.Provider
        value={{ slider, setSlider, slider_background, setSlider_background }}
      >
        <div className="page">
          <Routes>
            <Route path={PAGES.PAGE_1} element={<Home />} />
            <Route path={PAGES.PAGE_2} element={<Company />} />
            <Route path={PAGES.PAGE_3} element={<Offer />} />
            <Route path={PAGES.PAGE_4} element={<Contact />} />
            <Route path={PAGES.ADMIN} element={<Admin />} />
          </Routes>
        </div>
        <Footer />
      </Context.Provider>
    </div>
  );
}

export default App;
