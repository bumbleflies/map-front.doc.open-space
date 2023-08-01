import React from "react";
import {Avatar, Grid, IconButton, Typography} from "@mui/material";
import {yellow} from "@mui/material/colors";

type MenuActionButtonType = {
    onClickHandler: () => void,
    icon: React.JSX.Element,
    name: string
}
export const MenuActionButton = (props: MenuActionButtonType) => {
    return (
        <Grid item xs={2} container textAlign={"center"}>
            <Grid item xs={12}>
                <IconButton data-testid={`os-${props.name.toLowerCase()}-button`} aria-label="edit"
                            onClick={props.onClickHandler}>
                    <Avatar sx={{bgcolor: yellow[700]}}>
                        {props.icon}
                    </Avatar>
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <Typography color='text.secondary' textAlign={"center"}>
                    {props.name}
                </Typography>
            </Grid>
        </Grid>
    )
}