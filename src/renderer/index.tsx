import {createRoot} from 'react-dom/client';
import {HashRouter, Route, Routes} from "react-router-dom";

import './globals.css'
import HomePage from "./pages/Home";

const root = createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <Routes>
            <Route index element={<HomePage/>}/>
        </Routes>
    </HashRouter>
);