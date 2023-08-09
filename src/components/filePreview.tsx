import {DropzoneRootProps} from "react-dropzone";
import styled from "styled-components";

export const thumbsContainer = {
    display: 'flex',
    marginTop: 16
};
export const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
};
export const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};
export const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};
export type FilePreview = File & { preview: string }
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
export const Container = styled.div`
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