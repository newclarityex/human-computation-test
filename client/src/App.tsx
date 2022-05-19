import { Routes, Route } from "solid-app-router";
import Sorting from "./views/Sorting";
import Home from "./views/Home";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" component={Home} />
                <Route path="/sorting" component={Sorting} />
            </Routes>
        </>
    );
}