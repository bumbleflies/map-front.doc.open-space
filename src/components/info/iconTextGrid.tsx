import React, {ReactElement} from "react";
import {Grid, Tooltip, Typography} from "@mui/material";

export type IconTextGridProps = {
    name: string
    icon: ReactElement,
    text: string
}
export const IconTextGrid = ({name, icon, text}: IconTextGridProps) => {
    return (
        <Grid item xs={12} container>
            <Grid item xs={2} textAlign={"center"}>
                <Tooltip title={name}>
                    {icon}
                </Tooltip>
            </Grid>
            <Grid item xs={10} textAlign={"left"}>
                <Typography data-testid={`grid-${name}-text`} color='text.secondary'>
                    {text}
                </Typography>
            </Grid>
        </Grid>
    )
}