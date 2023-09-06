import React from 'react';
import './Router.css';
import {OpenSpaceHarvesterHome} from "./components/osHome";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {OsApiServices} from "./api/osApi";
import {ImageApiServices} from "./api/imageApi";
import {handleAddAction, handleDeleteAction, handleEditAction} from "./action/osInfo";
import {OpenSpaceInfoEditDialog} from './components/info/osInfoEdit';
import {
    handleImageDeleteAction,
    handleImageDetailsEditAction,
    handleImageHeaderAction,
    handleImageUploadAction
} from "./action/osImage";
import {OsImpressionEditDialog} from "./components/impression/osImpressionEditDialog";
import {ImageDetailsApiService} from "./api/imageDetailsApi";
import {OsImageFullView} from "./components/image/osImageFullView";
import {handleSessionAddAction, handleSessionDeleteAction, handleSessionEditAction} from './action/osSession';
import {SessionApiServices} from "./api/sessionApi";
import {OsSessionEditDialog} from "./components/session/osSessionEditDialog";
import {OsTabList} from "./components/tab/osTabList";

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
                element: <OsTabList active={""}/>,
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
                element: <OsTabList active={"i"}/>,
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
                                element: <OsImpressionEditDialog/>
                            }
                        ]
                    }
                ]
            },
            {
                path: 'os/:os_id/s/',
                element: <OsTabList active={"s"}/>,
                action: handleSessionAddAction,
                loader: SessionApiServices.loadAll,
                children: []
            },
            {
                path: 'os/:os_id/s/:session_id',
                action: handleSessionDeleteAction,
                loader: SessionApiServices.load,
                element: <OsTabList active={"s"}/>,
                children: [
                    {
                        path: 'i',
                        action: handleImageUploadAction,
                    },
                    {
                        path: 'edit',
                        action: handleSessionEditAction,
                        loader: SessionApiServices.load,
                        element: <OsSessionEditDialog/>
                    }
                ]
            }

        ]
    }
])

const Router = () => {
    return (
        <RouterProvider router={router}/>
    )
}
export default React.memo(Router)
