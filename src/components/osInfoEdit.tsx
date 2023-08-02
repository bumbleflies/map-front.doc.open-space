import {MarkerType, update} from "../types/marker";
import React, {useEffect, useState} from "react";
import {Dayjs} from "dayjs";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField
} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/de';
import {useLoaderData, useNavigate, useSubmit} from "react-router-dom";
import {markerToOs} from "../helper/apiMapper";


export const OpenSpaceInfoEditDialog = () => {
    const [title, setTitle] = useState<string | null>(null)
    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(null)
    const infoEditMarker = useLoaderData() as MarkerType
    const navigate = useNavigate()
    const editSubmit = useSubmit();

    useEffect(() => {
        if (infoEditMarker) {
            console.log(`setting edit marker to ${JSON.stringify(infoEditMarker)}`)
            setTitle(infoEditMarker.title)
            setStartDate(infoEditMarker.startDate)
            setEndDate(infoEditMarker.endDate)
        }
    }, [infoEditMarker, setTitle, setStartDate, setEndDate])

    const acceptStartDate = (newStartDate: Dayjs | null) => {
        if (newStartDate != null) {
            if (newStartDate.isAfter(endDate)) {
                let dateDifference = endDate?.diff(startDate)
                setStartDate(newStartDate)
                setEndDate(newStartDate.add(dateDifference!))
            } else {
                setStartDate(newStartDate)
            }
        }
    }

    function acceptEndDate(newEndDate: Dayjs | null) {
        if (newEndDate !== null) {
            if (newEndDate.isBefore(startDate)) {
                let dateDifference = endDate?.diff(startDate)
                setEndDate(newEndDate)
                setStartDate(newEndDate.subtract(dateDifference!))
            } else {
                setEndDate(newEndDate)
            }
        }
    }

    const cancelEdit = () => {
        navigate(`/os/${infoEditMarker.identifier}`)
    }

    const saveEdit = () => {
        const newMarkerApiType = markerToOs(update(infoEditMarker).with({
            title: title!,
            startDate: startDate!,
            endDate: endDate!
        }))

        editSubmit(newMarkerApiType, {
            method: 'put',
            encType: "application/json"
        })
    }

    return (
        <Dialog open={Boolean(title)}>
            <DialogTitle>Edit Open Space Info</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DialogContentText>
                            What is the name of the Open Space you're attending?
                        </DialogContentText>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            inputProps={{"data-testid": "os-edit-title"}}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Open Space Name"
                            fullWidth
                            variant="standard"
                            defaultValue={title}
                            onChange={v => setTitle(v.target.value)}
                        />
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item xs={12}>
                            <DialogContentText>
                                Was is the runtime of the Open Space?
                            </DialogContentText>
                        </Grid>
                        <LocalizationProvider dateAdapter={AdapterDayjs}
                                              adapterLocale={"de"}>
                            <Grid item xs={6}>
                                <DateTimePicker
                                    label={"Start Date"} value={startDate}
                                    format="DD.MM.YYYY HH:mm"
                                    onAccept={acceptStartDate}/>
                            </Grid>
                            <Grid item xs={6}>
                                <DateTimePicker
                                    label={"End Date"} value={endDate}
                                    format="DD.MM.YYYY HH:mm"
                                    onAccept={acceptEndDate}/>
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button data-testid='os-edit-cancel' onClick={cancelEdit}>Cancel</Button>
                <Button data-testid='os-edit-save' onClick={saveEdit}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}