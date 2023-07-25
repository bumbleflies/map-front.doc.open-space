import React from 'react';
import './App.css';
import {OpenSpaceHarvesterHome} from "./components/osHome";
import {Route, Routes} from 'react-router-dom';

const App = () => {
    return (
        <Routes>
            <Route path={"/"} index element={<OpenSpaceHarvesterHome/>}/>
            <Route path={"/os/:id"} element={<OpenSpaceHarvesterHome/>}/>
        </Routes>
    )
}
export default React.memo(App)
