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
import {
    handleSessionAddAction,
    handleSessionDeleteAction,
    handleSessionEditAction,
    handleSessionImageDeleteAction,
    handleSessionImageHeaderAction
} from './action/osSession';
import {SessionApiServices} from "./api/sessionApi";
import {OsSessionEditDialog} from "./components/session/osSessionEditDialog";
import {OsTabList} from "./components/tab/osTabList";
import {useImpressionImageResolver, useSessionImageResolver} from "./config/Endpoints";
import {OsInfoTab} from "./components/info/osInfoTab";
import {OsImpressionsTab} from "./components/impression/osImpressionsTab";
import {OsSessionsOverview} from "./components/session/osSessionsOverview";
import {OsSessionView} from "./components/session/osSessionView";
import {OsSessionsTab} from "./components/session/osSessionsTab";
import AuthProvider from "./components/auth/provider";
import {Redirect} from "./components/route/redirect";
import {useAuth0} from "@auth0/auth0-react";

const UserProfile = () => {
    const {user}=useAuth0()
    return (
        <>
        </>
    )
}

const router = createBrowserRouter([
    {
        path: "/redirect",
        element: <Redirect/>
    },
    {
        path: "/u/me",
        element: <UserProfile/>
    },
    {
        path: '/',
        element: <OpenSpaceHarvesterHome/>,
        loader: OsApiServices.loadAll,
        children: [
            {
                path: 'os/',
                action: handleAddAction,
                element: <OsTabList/>,
                children: [
                    {
                        path: ':os_id',
                        id: 'os',
                        action: handleDeleteAction,
                        loader: OsApiServices.load,
                        children: [
                            {
                                path: 'd',
                                id: 'd',
                                element: <OsInfoTab/>,
                                children: [
                                    {
                                        path: 'edit',
                                        action: handleEditAction,
                                        element: <OpenSpaceInfoEditDialog/>
                                    },
                                ]
                            },
                            {
                                path: 'i',
                                id: 'i',
                                element: <OsImpressionsTab/>,
                                loader: ImageApiServices.loadAll,
                                action: handleImageUploadAction,
                                children: [
                                    {
                                        path: ':image_id',
                                        action: handleImageDeleteAction,
                                        element: <OsImageFullView resolve={useImpressionImageResolver}/>,
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
                                path: 's',
                                id: 's/_',
                                element: <OsSessionsTab/>,
                                children: [
                                    {
                                        path: '_',
                                        element: <OsSessionsOverview/>,
                                        loader: SessionApiServices.loadAll,
                                        action: handleSessionAddAction,
                                        children: [
                                            {
                                                path: ':session_id/edit',
                                                action: handleSessionEditAction,
                                                loader: SessionApiServices.load,
                                                element: <OsSessionEditDialog/>
                                            }
                                        ]
                                    },
                                    {
                                        path: '_/:session_id',
                                        action: handleSessionDeleteAction,
                                        children: [
                                            {
                                                path: 'i',
                                                action: handleImageUploadAction,
                                                loader: SessionApiServices.loadWithImages,
                                                element: <OsSessionView/>,
                                                children: [
                                                    {
                                                        path: ':image_id',
                                                        action: handleSessionImageDeleteAction,
                                                        element: <OsImageFullView resolve={useSessionImageResolver}/>,
                                                        children: [
                                                            {
                                                                path: 'make_header',
                                                                action: handleSessionImageHeaderAction
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                        ]
                                    },

                                ]
                            },

                        ]
                    },

                ]
            },
        ]
    }
])

const AuthRouter = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    )
}
export default React.memo(AuthRouter)
