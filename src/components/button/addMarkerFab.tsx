import React, {useContext, useEffect} from "react";
import {MapContext, MapContextType} from "../context/mapContext";
import {useFetcher, useNavigate} from "react-router-dom";
import {MarkerPosition, MarkerType, transientMarkerToOs} from "../../types/marker";
import {localDayjs} from "../../helper/dayjsTimezone";
import {StyledFab} from "./styledFab";
import AddIcon from "@mui/icons-material/Add";
import {useSnackbar} from "material-ui-snackbar-provider";

export const AddMarkerFab = () => {
    const {map} = useContext<MapContextType>(MapContext)
    const fetcher = useFetcher()
    const {showMessage} = useSnackbar()
    const navigate = useNavigate()

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
        fetcher.submit(transientMarkerToOs({
            position: currentCenter,
            title: `Open Space @ ${currentCenter.lat}, ${currentCenter.lng}`,
            startDate: localDayjs().startOf('hour'),
            endDate: localDayjs().startOf('hour').add(2, 'hours')
        }), {
            method: 'post',
            encType: "application/json",
            action: 'os/'
        })
    }

    return (
        <StyledFab data-testid={"os-home-fab-add"} color="secondary" aria-label="add"
                   onClick={addMarker}>
            <AddIcon/>
        </StyledFab>
    )
}