import {Container, FilePreview, img, thumb, thumbInner, thumbsContainer} from "./filePreview";
import {useDropzone} from "react-dropzone";
import React, {useEffect} from "react";
import {Box} from "@mui/material";

type ImageUploadProps = {
    files: FilePreview[],
    onSelectHandler: (acceptedFiles: File[]) => void
}
export const ImageUpload = (props: ImageUploadProps) => {
    const {
        getRootProps,
        getInputProps,
    } = useDropzone({
            accept: {'image/*': []},
            onDrop: props.onSelectHandler,
        }
    );


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
            <Container {...getRootProps()}>
                <input data-testid={"os-image-upload"} {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </Container>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </Box>
    )
}