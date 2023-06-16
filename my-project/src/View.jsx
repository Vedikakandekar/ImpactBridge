import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChildHunger from "../components/ChildHunger";
import ChildEmpowerment from "../components/ChildEmpowerment";
import EmbraceAbilities from "../components/EmbraceAbilities";
import SeniorCare from "../components/SeniorCare";
import HealingTogether from "../components/HealingTogether";
import App from "./App";

const View = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/No-child-Hungry" exact element={<ChildHunger />} />
                <Route path="/Educate-Child" exact element={<ChildEmpowerment />} />
                <Route path="/Support-Exceptional" exact element={<EmbraceAbilities />} />
                <Route path="/Senior-Care" exact element={<SeniorCare />} />
                <Route path="/Heal-Together" exact element={<HealingTogether />} />
                <Route path="/" exact element={<App />} />
            </Routes>
        </BrowserRouter>
    )
}

export default View;