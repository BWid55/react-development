import "./App.css";
import React, { useState } from "react";
import { Link } from "react-scroll";
import { BiChevronRight } from "react-icons/bi";

import GratitudesApp from "./gratitudes/gratitudesApp/GratitudesApp";
import PortfolioApp from "./portfolio/portfolioApp/PortfolioApp";
import EcomMockupApp from "./ecomMockup/ecomMockupApp/EcomMockupApp";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [openedApp, setOpenedApp] = useState({
    portfolio: true,
    gratitudesApp: false,
    ecommerceMockup: false,
  });

  const openPortfolioHandler = () => {
    setOpenedApp({
      portfolio: true,
      gratitudesApp: false,
      ecommerceMockup: false,
    });
  };
  const openGratitudesAppHandler = () => {
    setOpenedApp({
      portfolio: false,
      gratitudesApp: true,
      ecommerceMockup: false,
    });
  };
  const openEcommerceMockupHandler = () => {
    setOpenedApp({
      portfolio: false,
      gratitudesApp: false,
      ecommerceMockup: true,
    });
  };

  return (
    <div className="App">
      <Router>
        <div
          style={{
            position: "fixed",
            zIndex: "2",
            width: "100%",
            backgroundColor: "black",
          }}
        >
          <div
            style={{
              width: "266px",
              margin: "10px auto",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Link
              to="portfolio"
              spy={true}
              offset={0}
              smooth={true}
              duration={500}
            >
              <button
                style={{
                  color: "white",
                  backgroundColor: "black",
                  border: "2px solid white",
                  cursor: "pointer",
                }}
                onClick={openPortfolioHandler}
              >
                Portfolio
              </button>
            </Link>
            {openedApp.portfolio && (
              <>
                <Link
                  style={{
                    margin: "auto 5px",
                    color: "white",
                    textDecoration: "underline",
                    textDecorationColor: "white",
                  }}
                  to="skills"
                  spy={true}
                  smooth={true}
                  offset={-72}
                  duration={500}
                >
                  Skills
                </Link>
                <span style={{ color: "white" }}>|</span>
                <Link
                  style={{
                    margin: "auto 5px",
                    color: "white",
                    textDecoration: "underline",
                    textDecorationColor: "white",
                  }}
                  to="experience"
                  spy={true}
                  smooth={true}
                  offset={-68}
                  duration={500}
                >
                  Experience
                </Link>
                <span style={{ color: "white" }}>|</span>
                <Link
                  style={{
                    margin: "auto 5px",
                    color: "white",
                    textDecoration: "underline",
                    textDecorationColor: "white",
                  }}
                  to="projects"
                  spy={true}
                  smooth={true}
                  offset={-72}
                  duration={500}
                >
                  Projects
                </Link>
              </>
            )}
            {openedApp.gratitudesApp && (
              <>
                <BiChevronRight style={{ color: "white", marginLeft: "8px" }} />
                <span style={{ color: "white", marginLeft: "8px" }}>
                  Gratitudes
                </span>
              </>
            )}
            {openedApp.ecommerceMockup && (
              <>
                <BiChevronRight style={{ color: "white", marginLeft: "8px" }} />
                <span style={{ color: "white", marginLeft: "8px" }}>
                  Ecommerce
                </span>
              </>
            )}
          </div>
        </div>
        {openedApp.portfolio && (
          <PortfolioApp
            onClickGratitudesAppButton={openGratitudesAppHandler}
            onClickEcommerceMockupButton={openEcommerceMockupHandler}
          />
        )}
        {openedApp.gratitudesApp && <GratitudesApp />}
        {openedApp.ecommerceMockup && <EcomMockupApp />}
      </Router>
    </div>
  );
}

export default App;
