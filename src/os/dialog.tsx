import React from "react";
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
import {OpenSpace} from "./openSpace";
import {Dayjs} from "dayjs";

type EditorProps = {
    isOpen: boolean,
    onClose: () => void,
    os: OpenSpace
    onSave: (os: OpenSpace) => void,
}

export class OpenSpaceEditDialog extends React.Component<EditorProps, OpenSpace> {
    state: OpenSpace = this.props.os

    save = () => {
        this.props.onSave(this.state)
    }

    render() {
        return (
            <Dialog open={this.props.isOpen} onClose={this.props.onClose}>
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
                                defaultValue={this.state.name}
                                onChange={v => this.setState({name: v.target.value})}
                            />
                        </Grid>
                        <Grid item container spacing={2}>
                            <Grid item xs={12}>
                                <DialogContentText>
                                    Was is the runtime of the Open Space?
                                </DialogContentText>
                            </Grid>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Grid item xs={6}>
                                    <DateTimePicker label={"Start Date"} value={this.state.startDate}
                                                    format="DD.MM.YYYY HH:mm"
                                                    onAccept={this.acceptStartDate.bind(this)}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <DateTimePicker label={"End Date"} value={this.state.endDate}
                                                    format="DD.MM.YYYY HH:mm"
                                                    onAccept={this.acceptEndDate.bind(this)}/>
                                </Grid>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose}>Cancel</Button>
                    <Button onClick={this.save}>Save</Button>
                </DialogActions>
            </Dialog>

        )
    }

    private acceptStartDate(value: Dayjs | null) {
        if (value != null) {
            if (value.isAfter(this.state.endDate)) {
                let dateDifference = this.state.endDate.diff(this.state.startDate)
                this.setState({
                    startDate: value,
                    endDate: value.add(dateDifference)
                })
            } else {
                this.setState({startDate: value})
            }
        }
    }

    private acceptEndDate(value: Dayjs | null) {
        if (value != null) {
            if (value.isBefore(this.state.startDate)) {
                let dateDifference = this.state.endDate.diff(this.state.startDate)
                this.setState({
                    startDate: value.add(-1 * dateDifference),
                    endDate: value
                })
            } else {
                this.setState({endDate: value})
            }
        }
    }
}