import {IconButton, ImageListItemBar} from "@mui/material"
import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import {ImageType} from "../../types/image";
import {SubmitFunction} from "react-router-dom";

type ImageHeaderItemBarProps = {
    menu?: {
        close: () => void
    }
    image: ImageType,
    submit: SubmitFunction
}

export const ImageHeaderItemBar = (props: ImageHeaderItemBarProps) => {

    const makeImageHeader = (imageId: string) => {
        if (props.menu !== undefined) {
            props.menu.close()
        }
        props.submit({is_header: true}, {
            method: 'patch',
            action: `${imageId}/make_header`
        })
    }

    return (
        <ImageListItemBar
            position="top"
            actionPosition="left"
            actionIcon={
                <IconButton
                    data-testid={"os-image-make-header"}
                    sx={{color: 'white'}}
                    aria-label={'Make header image'}
                    onClick={() => makeImageHeader(props.image.imageIdentifier)}
                >
                    {props.image.isHeader ?
                        <StarIcon data-testid={"header-active"}/>
                        :
                        <StarBorderIcon data-testid={"header-inactive"}/>
                    }
                </IconButton>
            }>
        </ImageListItemBar>

    )
}