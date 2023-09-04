import React from 'react';
import './Router.css';
import {OpenSpaceHarvesterHome} from "./components/osHome";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {OsApiServices} from "./api/osApi";
import {ImageApiServices} from "./api/imageApi";
import OpenSpaceInfoDrawer from "./components/info/osInfoDrawer";
import {handleAddAction, handleDeleteAction, handleEditAction} from "./action/osInfo";
import {OpenSpaceInfoEditDialog} from './components/info/osInfoEdit';
import {
    handleImageDeleteAction,
    handleImageDetailsEditAction,
    handleImageHeaderAction,
    handleImageUploadAction
} from "./action/osImage";
import {OsImageEditDialog} from "./components/image/osImageEditDialog";
import {ImageDetailsApiService} from "./api/imageDetailsApi";
import {OsImageFullView} from "./components/image/osImageFullView";
import OsTabListDrawer from "./components/image/osTabListDrawer";
import {handleSessionAddAction, handleSessionEditAction} from './action/osSession';
import {SessionApiServices} from "./api/sessionApi";
import {OsSessionEditDialog} from "./components/image/osSessionEditDialog";

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
                element: <OsTabListDrawer active={"i"}/>,
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
            }, {
                path: 'os/:os_id/s/',
                element: <OsTabListDrawer active={"s"}/>,
                action: handleSessionAddAction,
                loader: SessionApiServices.loadAll,
                children: [
                    {
                        path: ':session_id',
                        children: [
                            {
                                path: 'edit',
                                loader: SessionApiServices.load,
                                action: handleSessionEditAction,
                                element: <OsSessionEditDialog/>
                            }
                        ]
                    }
                ]
            },

        ]
    }
])

const Router = () => {
    return (
        <RouterProvider router={router}/>
    )
}
export default React.memo(Router)
