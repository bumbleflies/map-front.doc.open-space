import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {DropzoneRootProps, useDropzone} from 'react-dropzone'
import styled from 'styled-components';


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

function ImageUpload() {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
            accept: {'image/*': []},
            onDrop: acceptedFiles => {
                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })));
            }
        }
    );

    const [files, setFiles] = useState<FilePreview[]>([]);

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview)
                    }}
                />
            </div>
        </div>
    ));
    return (
        <Box>
            <Container {...getRootProps({isFocused, isDragAccept, isDragReject})}>
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
    console.log("OpenSpaceImageAddDialog")
    const navigate = useNavigate()
    return (
        <Dialog open={true}>
            <DialogTitle>Add Session Picture</DialogTitle>
            <DialogContent>
                <ImageUpload/>
            </DialogContent>
            <DialogActions>
                <Button data-testid='os-edit-cancel' onClick={() => navigate('')}>Cancel</Button>
                <Button data-testid='os-edit-save' onClick={() => navigate('')}>Upload</Button>
            </DialogActions>

        </Dialog>
    )
}