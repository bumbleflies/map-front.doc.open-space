import React, {useContext} from "react";
import {MapContext, MapContextType} from "../context/mapContext";
import {useFetcher} from "react-router-dom";
import {transientMarkerToOs} from "../../types/marker";
import {localDayjs} from "../../helper/dayjsTimezone";
import {StyledFab} from "./styledFab";
import AddIcon from "@mui/icons-material/Add";

export const AddMarkerFab = () => {
    const {map} = useContext<MapContextType>(MapContext)
    const fetcher = useFetcher()

    const addMarker = () => {
        let currentCenter = map!.getCenter()!;
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