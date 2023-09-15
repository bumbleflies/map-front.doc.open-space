import {Container, FilePreview, img, thumb, thumbInner, thumbsContainer} from "./filePreview";
import {useDropzone} from "react-dropzone";
import React, {useEffect, useMemo} from "react";
import {Box, Button} from "@mui/material";

type ImageUploadProps = {
    files: FilePreview[],
    onSelectHandler: (acceptedFiles: File[]) => void
}

const baseStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};
export const ImageUpload = ({files, onSelectHandler}: ImageUploadProps) => {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        open,
    } = useDropzone({
            accept: {'image/*': []},
        onDrop: onSelectHandler,
        }
    );
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div data-testid={`os-image-add-preview-${file.name.replaceAll('.', '-')}`} style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview)
                    }}
                    alt={"preview"}
                />
            </div>
        </div>
    ));
    return (
        <Box>
            <Container>
                <Container {...getRootProps({style})}>
                    <input data-testid={"os-image-upload"} {...getInputProps()} />
                    <p>Click to select or drag 'n' drop some files here</p>
                </Container>
                <Button onClick={open}>
                    Open File Dialog
                </Button>
            </Container>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </Box>
    )
}