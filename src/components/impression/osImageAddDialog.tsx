import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {useEffect, useState} from "react";
import {FetcherSubmitFunction} from "react-router-dom";
import {FilePreview} from "../image/filePreview";
import {ImageNotAvailable, ImageType} from "../../types/image";
import {ImageUpload} from "../image/imageUpload";

type OsImageAddDialogProps = {
    title: string;
    isOpen: boolean,
    closeHandler: () => void,
    submit: FetcherSubmitFunction,
    upload: (file: File) => Promise<ImageType | ImageNotAvailable>
}

export const OsImageAddDialog = ({isOpen, title, submit, upload, closeHandler}: OsImageAddDialogProps) => {
    const [files, setFiles] = useState<FilePreview[]>([]);

    useEffect(() => {
        if (!isOpen) {
            setFiles([])
        }
    }, [isOpen])

    const onFilesDropped = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }

    const submitFiles = (filesToSubmit: File[]) => {
        const formData = new FormData()
        console.log('submitting files ' + JSON.stringify(filesToSubmit))
        filesToSubmit.map((file, index) => formData.append(`file_${index}`, file.slice(), file.name))
        submit(formData, {method: 'POST'})
    }

    const saveSelectedFiles = async () => {
        closeHandler()
        let remainingFiles = Array.from(files)
        submitFiles(remainingFiles)
        Promise.all(files.map((file) =>
            upload(file).then(() => {
                console.log(`Finished uploading ${file.name}`)
                remainingFiles = remainingFiles.filter((f) => f.name !== file.name)
                submitFiles(remainingFiles)
            })
        )).then(() => {
            console.log('Finished uploading all images')
        })
    }

    return (
        <Dialog open={isOpen}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <ImageUpload files={files} onSelectHandler={onFilesDropped}/>
            </DialogContent>
            <DialogActions>
                <Button data-testid='os-image-add-cancel' onClick={closeHandler}>Cancel</Button>
                <Button data-testid='os-image-add-save' onClick={saveSelectedFiles}>Upload</Button>
            </DialogActions>
        </Dialog>
    )
}