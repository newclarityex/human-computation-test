import { Routes, Route, Router } from "solid-app-router";
import Sorting from "./views/Sorting";
import Home from "./views/Home";
import { Transition } from "solid-transition-group";

export default function App() {
    return (
        <Transition
            mode="outin"
            enterActiveClass="fade-in-active"
            exitActiveClass="fade-out-active"
            enterClass="fade-out"
            enterToClass="fade-in"
            exitClass="fade-in"
            exitToClass="fade-out"
        >
            <Router>
                <Routes>
                    <Route path="/" component={Home} />
                    <Route path="/sorting" component={Sorting} />
                </Routes>
            </Router>
        </Transition>
    );
}