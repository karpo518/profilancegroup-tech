import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.scss';
import { HomePage } from "./pages/home/HomePage";

export const App = () => {
  
  return (
      <div className="App">
          <div className="layout">
            <header className="layout__header">
              <div className="layout__title">Сокращатель</div>
            </header>
            <div className="layout__content" >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:page" element={<HomePage />} />
              </Routes>
            </div>
          </div>
      </div>
        )
}
