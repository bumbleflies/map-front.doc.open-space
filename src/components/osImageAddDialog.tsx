import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {useEffect, useState} from "react";
import {FetcherSubmitFunction, useParams} from "react-router-dom";
import {useDropzone} from 'react-dropzone'
import {ImageApiServices as imageApi} from "../helper/imageApi";
import {Container, FilePreview, img, thumb, thumbInner, thumbsContainer} from "./filePreview";


type ImageUploadProps = {
    files: FilePreview[],
    onSelectHandler: (acceptedFiles: File[]) => void
}
const ImageUpload = (props: ImageUploadProps) => {
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
            <div style={thumbInner}>
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
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </Container>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </Box>
    )
}

type OpenSpaceImageAddDialogProps = {
    isOpen: boolean,
    closeHandler: () => void,
    submit: FetcherSubmitFunction
}

export const OpenSpaceImageAddDialog = (props: OpenSpaceImageAddDialogProps) => {
    const {os_id} = useParams<"os_id">();
    const [files, setFiles] = useState<FilePreview[]>([]);

    useEffect(() => {
        if (!props.isOpen) {
            setFiles([])
        }
    }, [props.isOpen])

    const onFilesDropped = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }

    const submitFiles = (filesToSubmit: File[]) => {
        const formData = new FormData()
        console.log('submitting files ' + JSON.stringify(filesToSubmit))
        filesToSubmit.map((file, index) => formData.append(`file_${index}`, file.slice(), file.name))
        props.submit(formData, {method: 'POST'})
    }

    const saveSelectedFiles = async () => {
        props.closeHandler()
        let remainingFiles = Array.from(files)
        submitFiles(remainingFiles)
        Promise.all(files.map((file) => {
                return imageApi.upload({
                    osIdentifier: os_id!,
                    imageFile: file
                }).then(() => {
                    console.log(`Finished uploading ${file.name} to ${os_id}`)
                    remainingFiles = remainingFiles.filter((f) => f.name !== file.name)
                    submitFiles(remainingFiles)
                })
            }
        )).then(() => {
            console.log('Finished uploading all images')
        })
    }

    return (
        <Dialog open={props.isOpen}>
            <DialogTitle>Add Session Picture</DialogTitle>
            <DialogContent>
                <ImageUpload files={files} onSelectHandler={onFilesDropped}/>
            </DialogContent>
            <DialogActions>
                <Button data-testid='os-edit-cancel' onClick={props.closeHandler}>Cancel</Button>
                <Button data-testid='os-edit-save' onClick={saveSelectedFiles}>Upload</Button>
            </DialogActions>
        </Dialog>
    )
}