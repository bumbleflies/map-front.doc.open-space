import React from 'react';
import './App.css';
import {OpenSpaceHarvesterHome} from "./components/osHome";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {apiServices as osApi} from "./helper/markerApi";
import OpenSpaceInfoDrawer from "./components/osInfoDrawer";
import {handleEditAction, handleInfoAction} from "./action/osInfo";
import {OpenSpaceInfoEditDialog} from './components/osInfoEdit';
import OpenSpaceImageDrawer from "./components/osImageDrawer";
import {OpenSpaceImageAddDialog} from "./components/osImageAddDialog";

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

                    },
                ]
            },
            {
                path: 'os/:os_id/i/',
                element: <OpenSpaceImageDrawer/>,
                children: [
                    {
                        path: 'add',
                        element: <OpenSpaceImageAddDialog/>
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
