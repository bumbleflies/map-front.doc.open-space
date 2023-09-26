import React, {useContext, useEffect} from "react";
import {MapContext, MapContextType} from "../context/mapContext";
import {useFetcher, useNavigate} from "react-router-dom";
import {MarkerPosition, MarkerType, transientMarkerToOs} from "../../types/marker";
import {localDayjs} from "../../helper/dayjsTimezone";
import {StyledFab} from "./styledFab";
import AddIcon from "@mui/icons-material/Add";
import {useSnackbar} from "material-ui-snackbar-provider";
import {useAuth0} from "@auth0/auth0-react";
import {Tooltip} from "@mui/material";
import {useBackendAuth, useLoginMethod} from "../auth/hooks";

export const AddMarkerFab = () => {
    const {map} = useContext<MapContextType>(MapContext)
    const fetcher = useFetcher()
    const {showMessage} = useSnackbar()
    const navigate = useNavigate()
    const {isAuthenticated} = useAuth0()
    const {withAccessToken}=useBackendAuth()

    const {loginMethod} = useLoginMethod()

    useEffect(() => {
        if (Boolean(fetcher.data)) {
            const savedMarker = fetcher.data as MarkerType
            showMessage(`New Open Space [${savedMarker.identifier}] added`,
                'open',
                () => navigate(`/os/${savedMarker.identifier}/d`))
        }
    }, [fetcher.data, navigate, showMessage]);

    const addMarker = () => {
        let currentCenter = new MarkerPosition(map!.getCenter()!);
        withAccessToken().then((accessToken) => {
            fetcher.submit({
                os: transientMarkerToOs({
                    position: currentCenter,
                    title: `Open Space @ ${currentCenter.lat}, ${currentCenter.lng}`,
                    startDate: localDayjs().startOf('hour'),
                    endDate: localDayjs().startOf('hour').add(2, 'hours')
                }),
                token: accessToken!
            }, {
                method: 'post',
                encType: "application/json",
                action: 'os/',
            })
        })
    }

    return (
        isAuthenticated ?
            <StyledFab data-testid={"os-home-fab-add"} color="secondary" aria-label="add"
                       onClick={addMarker}>
                <AddIcon/>
            </StyledFab>
            :
            <Tooltip title={'Login to add Open Space'} placement={"top"}>
                <StyledFab data-testid={"os-home-fab-add-disables"} color="default" aria-label="add"
                           onClick={loginMethod}>
                    <AddIcon/>
                </StyledFab>
            </Tooltip>
    )
}