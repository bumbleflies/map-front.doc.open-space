import React, {ReactElement} from "react";
import {Grid, Tooltip, Typography} from "@mui/material";

export type IconTextGridProps = {
    name: string
    icon: ReactElement,
    text: string
}
export const IconTextGrid = (props: IconTextGridProps) => {
    return (
        <Grid item xs={12} container>
            <Grid item xs={2} textAlign={"center"}>
                <Tooltip title={props.name}>
                    {props.icon}
                </Tooltip>
            </Grid>
            <Grid item xs={10} textAlign={"left"}>
                <Typography data-testid={`grid-${props.name}-text`} color='text.secondary'>
                    {props.text}
                </Typography>
            </Grid>
        </Grid>
    )
}