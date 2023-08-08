import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams, useSubmit} from "react-router-dom";
import {DropzoneRootProps, useDropzone} from 'react-dropzone'
import styled from 'styled-components';
import {apiServices as imageApi} from "../helper/imageApi";


const thumbsContainer = {
    display: 'flex',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

type FilePreview = File & { preview: string }

const getColor = (props: DropzoneRootProps) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isFocused) {
        return '#2196f3';
    }
    return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

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

export const OpenSpaceImageAddDialog = () => {
    const {os_id} = useParams<"os_id">();
    const navigate = useNavigate()
    const [files, setFiles] = useState<FilePreview[]>([]);
    const uploadSubmit = useSubmit()

    const onFilesDropped = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }

    function navigateBack() {
        navigate(`/os/${os_id}/i`)
    }

    const saveSelectedFiles = async () => {

        files.forEach((file) => {
            imageApi.upload({
                osIdentifier: os_id!,
                imageFile: file
            }).then(() => {
                console.log(`Upload ${file.name} to ${os_id}`)
            })
        })


        const formData = new FormData()
        files.map((file, index) => formData.append(`file_${index}`, file.slice(), file.name))
        uploadSubmit(formData, {method: 'POST'})

    }

    return (
        <Dialog open={true}>
            <DialogTitle>Add Session Picture</DialogTitle>
            <DialogContent>
                <ImageUpload files={files} onSelectHandler={onFilesDropped}/>
            </DialogContent>
            <DialogActions>
                <Button data-testid='os-edit-cancel' onClick={navigateBack}>Cancel</Button>
                <Button data-testid='os-edit-save' onClick={saveSelectedFiles}>Upload</Button>
            </DialogActions>

        </Dialog>
    )
}