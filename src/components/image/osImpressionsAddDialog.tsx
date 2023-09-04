import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {useEffect, useState} from "react";
import {FetcherSubmitFunction} from "react-router-dom";
import {FilePreview} from "./filePreview";
import {ImageNotAvailable, ImageType} from "../../types/image";
import {ImageUpload} from "./imageUpload";

type OsImpressionsAddDialogProps = {
    isOpen: boolean,
    closeHandler: () => void,
    submit: FetcherSubmitFunction,
    upload: (file: File) => Promise<ImageType | ImageNotAvailable>
}

export const OsImpressionsAddDialog = (props: OsImpressionsAddDialogProps) => {
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
        Promise.all(files.map((file) =>
            props.upload(file).then(() => {
                console.log(`Finished uploading ${file.name}`)
                remainingFiles = remainingFiles.filter((f) => f.name !== file.name)
                submitFiles(remainingFiles)
            })
        )).then(() => {
            console.log('Finished uploading all images')
        })
    }

    return (
        <Dialog open={props.isOpen}>
            <DialogTitle>Add Impression</DialogTitle>
            <DialogContent>
                <ImageUpload files={files} onSelectHandler={onFilesDropped}/>
            </DialogContent>
            <DialogActions>
                <Button data-testid='os-image-add-cancel' onClick={props.closeHandler}>Cancel</Button>
                <Button data-testid='os-image-add-save' onClick={saveSelectedFiles}>Upload</Button>
            </DialogActions>
        </Dialog>
    )
}