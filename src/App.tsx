import React from 'react';
import './App.css';
import {OpenSpaceHarvesterHome} from "./components/osHome";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {apiServices as osApi} from "./helper/markerApi";
import {apiServices as imageApi} from "./helper/imageApi";

const router = createBrowserRouter([
    {
        path: '/',
        element: <OpenSpaceHarvesterHome/>,
        loader: osApi.load,
        children: [
            {
                path: '/os/:id',
                element: <OpenSpaceHarvesterHome/>,
                id: 'os_selected',
                loader: imageApi.load,
            }
        ]
    }
])

const App = () => {
    return (
        <RouterProvider router={router}/>
    )
}
export default React.memo(App)
