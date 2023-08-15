import React from 'react';
import './App.css';
import {OpenSpaceHarvesterHome} from "./components/osHome";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {OsApiServices} from "./helper/osApi";
import {ImageApiServices} from "./helper/imageApi";
import OpenSpaceInfoDrawer from "./components/info/osInfoDrawer";
import {handleAddAction, handleDeleteAction, handleEditAction} from "./action/osInfo";
import {OpenSpaceInfoEditDialog} from './components/info/osInfoEdit';
import OpenSpaceImageDrawer from "./components/image/osImageDrawer";
import {
    handleImageDeleteAction,
    handleImageDetailsEditAction,
    handleImageHeaderAction,
    handleImageUploadAction
} from "./action/osImage";
import {OsImageEditDialog} from "./components/image/osImageEditDialog";
import {ImageDetailsApiService} from "./helper/imageDetailsApi";
import {OsImageFullView} from "./components/image/osImageFullView";

const router = createBrowserRouter([
    {
        path: '/',
        element: <OpenSpaceHarvesterHome/>,
        loader: OsApiServices.loadAll,
        children: [
            {
                path: 'os/',
                action: handleAddAction,
            },
            {
                path: 'os/:os_id',
                loader: OsApiServices.load,
                action: handleDeleteAction,
                element: <OpenSpaceInfoDrawer/>,
                children: [
                    {
                        path: 'edit',
                        loader: OsApiServices.load,
                        action: handleEditAction,
                        element: <OpenSpaceInfoEditDialog/>
                    },
                ]
            },
            {
                path: 'os/:os_id/i/',
                element: <OpenSpaceImageDrawer/>,
                loader: ImageApiServices.loadAll,
                action: handleImageUploadAction,
                children: [
                    {
                        path: ':image_id',
                        action: handleImageDeleteAction,
                        element: <OsImageFullView/>,
                        children: [
                            {
                                path: 'make_header',
                                action: handleImageHeaderAction
                            },
                            {
                                path: 'edit',
                                loader: ImageDetailsApiService.load,
                                action: handleImageDetailsEditAction,
                                element: <OsImageEditDialog/>
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
