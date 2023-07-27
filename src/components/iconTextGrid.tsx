import React, {ReactElement} from "react";
import {Grid, Typography} from "@mui/material";

export type IconTextGridProps = {
    icon: ReactElement,
    text: string
}
export const IconTextGrid = (props: IconTextGridProps) => {
    return (
        <Grid item xs={12} container>
            <Grid item xs={2} textAlign={"center"}>
                {props.icon}
            </Grid>
            <Grid item xs={10} textAlign={"left"}>
                <Typography color='text.secondary'>
                    {props.text}
                </Typography>
            </Grid>
        </Grid>
    )
}