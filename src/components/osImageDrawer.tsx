import {Toolbar} from "@mui/material";
import {DesktopDrawer} from "./drawer";
import {useNavigate} from "react-router-dom";
import {OpenSpaceImages} from "./osImages";

const OpenSpaceImageDrawer = () => {
    const navigate = useNavigate()
    console.log("OpenSpaceImages")
    return (
        <>
            <DesktopDrawer onCloseHandler={() => navigate(`/`)}>
                <Toolbar/>
                <OpenSpaceImages/>
            </DesktopDrawer>
        </>
    )
}

export default OpenSpaceImageDrawer
