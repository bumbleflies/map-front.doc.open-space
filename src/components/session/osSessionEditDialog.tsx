import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    InputAdornment,
    TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useLoaderData, useNavigate, useSubmit} from "react-router-dom";
import {OsSession, OsSessionDetailsApiType} from "../../types/session";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";

export const OsSessionEditDialog = () => {
    const navigate = useNavigate()
    const session = useLoaderData() as OsSession

    const sessionEditSubmit = useSubmit()

    const [title, setTitle] = useState<string>('');
    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [duration, setDuration] = useState<number>(0)

    useEffect(() => {
        setTitle(session.title)
        setStartDate(session.startDate)
        setDuration(session.endDate.diff(session.startDate, "minutes"))
    }, [session, setTitle, setStartDate, setDuration])

    const closeSessionEdit = () => {
        navigate('..')
    }

    const saveSessionEdit = () => {
        const editSessionData: OsSessionDetailsApiType = {
            title: title,
            start_date: startDate!.toISOString(),
            end_date: startDate!.add(duration, 'minutes').toISOString()
        }
        sessionEditSubmit(editSessionData, {
            method: "put",
            encType: "application/json"
        })
    }

    return (
        <Dialog open={true}>
            <DialogTitle>Describe your session</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Whats the title of the session?
                </DialogContentText>
                <TextField
                    inputProps={{"data-testid": "session-edit-title"}}
                    fullWidth={true}
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Session Title"
                    variant="standard"
                    type={"search"}
                    value={title}
                    onChange={v => setTitle(v.target.value)}
                />
                <DialogContentText>
                    What is the runtime of the Session?
                </DialogContentText>
                <Grid container marginTop={2}>
                    <Grid item>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"de"}>
                            <DateTimePicker
                                label={"Session Start"} value={startDate}
                                format="DD.MM HH:mm"
                                onChange={setStartDate}/>
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <TextField
                    InputProps={{
                        endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
                        style: {width: 150}
                    }}
                    type={"number"}
                    inputProps={{
                        step: "15",
                        "data-testid": "session-edit-duration",
                    }}
                    margin={"dense"}
                    id={"duration"}
                    label={"Session duration"}
                    variant={"standard"}
                    value={duration.toString()}
                    onChange={v => setDuration(parseInt(v.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button data-testid='session-edit-cancel' onClick={closeSessionEdit}>Cancel</Button>
                <Button data-testid='session-edit-save' onClick={saveSessionEdit}>Update</Button>
            </DialogActions>
        </Dialog>
    )
}
