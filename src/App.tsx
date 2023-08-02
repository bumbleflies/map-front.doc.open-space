import React from 'react';
import './App.css';
import {OpenSpaceHarvesterHome} from "./components/osHome";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {apiServices as osApi} from "./helper/markerApi";
import OpenSpaceInfoDrawer from "./components/OpenSpaceInfoDrawer";
import {handleEditAction, handleInfoAction} from "./action/osInfo";
import {OpenSpaceInfoEditDialog} from './components/osInfoEdit';

const router = createBrowserRouter([
    {
        path: '/',
        element: <OpenSpaceHarvesterHome/>,
        loader: osApi.loadAll,
        children: [
            {
                path: 'os/:os_id',
                loader: osApi.load,
                action: handleInfoAction,
                element: <OpenSpaceInfoDrawer/>,
                children: [
                    {
                        path: 'edit',
                        loader: osApi.load,
                        action: handleEditAction,
                        element: <OpenSpaceInfoEditDialog/>

                    }
                ]
            },
        ]
    }
])

const App = () => {
    return (
        <RouterProvider router={router}/>
    )
}
export default React.memo(App)
