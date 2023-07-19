import React, {useEffect, useState} from "react";
import {Camera, CameraType} from "react-camera-pro";
import {Box, Button, Dialog, DialogActions, DialogContent, Grid} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CameraIcon from "@mui/icons-material/Camera";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';

type CameraPreviewProps = {
    showTakePhotoDialogCallback: () => void,
    isShown: boolean
}
export const CameraPreview = (props: CameraPreviewProps) => {
    return (
        <div className="cameraPreview">
            <CameraEnhanceIcon sx={{
                // action in the middle
                transform: 'translateX(-50%),translateY(-50%)'
            }} fontSize={"large"}/>
            <Box className={"cameraOverlay"} sx={{
                opacity: ".5",
            }}
                 onClick={props.showTakePhotoDialogCallback}>
                {/*https://github.com/purple-technology/react-camera-pro*/}
                {props.isShown ? <Camera errorMessages={{}} facingMode='environment'></Camera> : null}
            </Box>
        </div>
    )
}
type CameraTakePictureDialogProps = {
    isOpen: boolean,
    closeTakePhotoDialogCallback: () => void,
    setImageCallback: (image: string) => void
}
export const CameraTakePictureDialog = (props: CameraTakePictureDialogProps) => {
    const camera = React.useRef<CameraType>()
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [activeDeviceIndex, setActiveDeviceIndex] = useState<number>(0);
    const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(undefined);
    useEffect(() => {
        (async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((i) => i.kind == 'videoinput');
            setDevices(videoDevices);
        })();
    }, []);

    const takePicture = () => {
        props.setImageCallback(camera.current?.takePhoto()!)
        props.closeTakePhotoDialogCallback()
    }

    const switchCamera = () => {
        setActiveDeviceIndex((activeDeviceIndex + 1) % (devices.length))
        console.log('Switch: ' + activeDeviceIndex)
        console.log('Switch: ' + JSON.stringify(devices))
        setActiveDeviceId(devices[activeDeviceIndex].deviceId)
    }

    return (
        <Dialog open={props.isOpen} fullScreen>
            <DialogContent>
                <Camera errorMessages={{}} facingMode='environment' ref={camera}
                        videoSourceDeviceId={activeDeviceId}></Camera>
            </DialogContent>
            <DialogActions sx={{
                // action in the middle
                alignItems: "center",
                justifyContent: "center",
                display: "flex"
            }}>
                <Grid container spacing={2} alignItems="center" justifyContent={"space-around"} textAlign={"center"}>
                    <Grid item xs>
                        <Button onClick={props.closeTakePhotoDialogCallback} sx={{
                            // https://mui.com/material-ui/customization/z-index/
                            zIndex: 100
                        }}>
                            <ClearIcon fontSize={"large"}/>
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Button onClick={takePicture}>
                            <CameraIcon sx={{
                                // action in the middle
                                fontSize: 80
                            }}/>
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Button onClick={switchCamera}>
                            <CameraswitchIcon sx={{
                                fontSize: 50
                            }}
                            />
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}