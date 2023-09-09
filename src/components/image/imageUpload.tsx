import {Container, FilePreview, img, thumb, thumbInner, thumbsContainer} from "./filePreview";
import {useDropzone} from "react-dropzone";
import React, {useEffect, useMemo} from "react";
import {Box} from "@mui/material";

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
export const ImageUpload = (props: ImageUploadProps) => {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
            accept: {'image/*': []},
            onDrop: props.onSelectHandler,
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
        return () => props.files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [props.files]);

    const thumbs = props.files.map(file => (
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
            <Container {...getRootProps({style})}>
                <input data-testid={"os-image-upload"} {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </Container>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </Box>
    )
}