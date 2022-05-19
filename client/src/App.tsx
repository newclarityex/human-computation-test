import { Routes, Route } from "solid-app-router";
import Sorting from "./views/Sorting";
import Home from "./views/Home";
import TheNavbar from "./components/TheNavbar";

export default function App() {
    return (
        <>
            {/* <TheNavbar /> */}
            <div style="flex: 1 1 auto;">
                <Routes>
                    <Route path="/" component={Home} />
                    <Route path="/sorting" component={Sorting} />
                </Routes>
            </div>
        </>
    );
}