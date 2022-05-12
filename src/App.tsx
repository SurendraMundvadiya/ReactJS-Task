import React from "react";
import LoginPage from "./components/screens/login/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Graph from "./components/screens/graph/Graph";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/graph" element={<Graph />} />
                <Route path="*" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
