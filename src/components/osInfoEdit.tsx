import {MarkerType, update} from "../types/marker";
import React, {useState} from "react";
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

type OpenSpaceInfoEditDialogProps = {
    editOpen: boolean
    closeDialogHandler: () => void
    marker: MarkerType
    saveMarker(marker: MarkerType): void;
}
export const OpenSpaceInfoEditDialog = (props: OpenSpaceInfoEditDialogProps) => {
    const [title, setTitle] = useState<string>(props.marker.title)
    const [startDate, setStartDate] = useState<Dayjs>(props.marker.startDate)
    const [endDate, setEndDate] = useState<Dayjs>(props.marker.endDate)

    const acceptStartDate = (startDate: Dayjs | null) => {
        if (startDate != null) {
            if (startDate.isAfter(endDate)) {
                let dateDifference = endDate.diff(startDate)
                setStartDate(startDate)
                setEndDate(startDate.add(dateDifference))
            } else {
                setStartDate(startDate)
            }
        }
    }

    const cancelEdit = () => {
        setTitle(props.marker.title)
        setStartDate(props.marker.startDate)
        setEndDate(props.marker.endDate)
        props.closeDialogHandler()
    }

    const saveEdit = () => {
        props.saveMarker(update(props.marker).with({title: title, startDate: startDate, endDate: endDate}))
        props.closeDialogHandler()
    }

    return (
        <Dialog open={props.editOpen} onClose={props.closeDialogHandler}>
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
                                <DateTimePicker label={"Start Date"} value={startDate}
                                                format="DD.MM.YYYY HH:mm"
                                                onAccept={acceptStartDate}/>
                            </Grid>
                            <Grid item xs={6}>
                                <DateTimePicker label={"End Date"} value={endDate}
                                                format="DD.MM.YYYY HH:mm"
                                                onAccept={() => {
                                                }}/>
                            </Grid>
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={cancelEdit}>Cancel</Button>
                <Button onClick={saveEdit}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}