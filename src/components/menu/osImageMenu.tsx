import {ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import CollectionsIcon from '@mui/icons-material/Collections';
import {useParams, useSubmit} from "react-router-dom";


type OsImageMenuProps = {
    anchorElement: HTMLElement | null,
    imageId: string | null,
    closeMenuHandler: () => void
}

export const OsImageMenu = (props: OsImageMenuProps) => {
    const actionSubmit = useSubmit()
    const {os_id} = useParams<"os_id">();

    const deleteImage = () => {
        props.closeMenuHandler()
        actionSubmit({}, {
            method: 'delete',
            action: `/os/${os_id}/i/${props.imageId}`
        })
    }

    const makeImageHeader = () => {
        props.closeMenuHandler()
        actionSubmit({is_header: true}, {
            method: 'patch',
            action: `/os/${os_id}/i/${props.imageId}/make_header`
        })
    }
    return (
        <Menu
            id="image-action-meu"
            anchorEl={props.anchorElement}
            open={Boolean(props.anchorElement)}
            onClose={props.closeMenuHandler}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            <MenuItem onClick={makeImageHeader}>
                <ListItemIcon>
                    <CollectionsIcon/>
                </ListItemIcon>
                <ListItemText>
                    Make Header
                </ListItemText>
            </MenuItem>
            <MenuItem onClick={deleteImage}>
                <ListItemIcon>
                    <DeleteIcon/>
                </ListItemIcon>
                <ListItemText>
                    Delete Image
                </ListItemText>
            </MenuItem>
        </Menu>
    )
}