import React from 'react';
import './Router.css';
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
import {Redirect} from "./components/route/redirect";
import {OsMapView} from "./components/map/osMapView";
import {UserProfileView} from "./components/auth/userProfileView";
import {OsContextProvider} from "./osContextProvider";
import {PlaceAutocomplete} from "./components/map/placeAutocomplete";

const router = createBrowserRouter([
    {
        path: '/places',
        element: <PlaceAutocomplete />
    },
    {
        path: "/redirect",
        element: <Redirect/>
    },
    {
        path: "/u/me",
        element: <UserProfileView/>
    },
    {
        path: '/',
        element: <OsMapView/>,
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
                                        children: [
                                            {
                                                path: '_',
                                                element: <OsImageFullView resolve={useImpressionImageResolver}/>,
                                            },
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
                                                        children: [
                                                            {
                                                                path: '_',
                                                                element: <OsImageFullView
                                                                    resolve={useSessionImageResolver}/>,
                                                            },
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
        <OsContextProvider>
            <RouterProvider router={router}/>
        </OsContextProvider>
    )
}
export default React.memo(AuthRouter)
