import React from 'react';
import './App.css';
import {OpenSpaceHarvesterHome} from "./components/osHome";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {apiServices as osApi} from "./helper/markerApi";
import {apiImageServices as imageApi} from "./helper/imageApi";
import OpenSpaceInfoDrawer from "./components/osInfoDrawer";
import {handleDeleteAction, handleEditAction} from "./action/osInfo";
import {OpenSpaceInfoEditDialog} from './components/osInfoEdit';
import OpenSpaceImageDrawer from "./components/osImageDrawer";
import {OpenSpaceImageAddDialog} from "./components/osImageAddDialog";
import {handleImageDeleteAction, handleImageHeaderAction, handleImageUploadAction} from "./action/osImage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <OpenSpaceHarvesterHome/>,
        loader: osApi.loadAll,
        children: [
            {
                path: 'os/:os_id',
                loader: osApi.load,
                action: handleDeleteAction,
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
                loader: imageApi.loadAll,
                children: [
                    {
                        path: 'add',
                        action: handleImageUploadAction,
                        element: <OpenSpaceImageAddDialog/>
                    },
                    {
                        path: ':image_id',
                        action: handleImageDeleteAction,
                        children: [
                            {
                                path: 'make_header',
                                action: handleImageHeaderAction
                            }
                        ]
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
