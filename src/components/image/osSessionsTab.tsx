import {IconButton, ImageList, ImageListItem, ImageListItemBar, ListItemButton, Skeleton} from "@mui/material"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from "@mui/icons-material/Edit";
import {useFetcher, useLoaderData} from "react-router-dom";
import {OsWithSessions} from "../../api/sessionApi";

type Session = {
    id: string,
    title: string
}


export const OsSessionsTab = () => {
    const addSessionFetcher = useFetcher()
    const osWithSessions = useLoaderData() as OsWithSessions

    const addSession = () => {
        const formData = new FormData()
        formData.append('title',`Session #${osWithSessions.sessions.length + 1} of OS [${osWithSessions.os.title}]`)
        formData.append('startDate',osWithSessions.os.startDate.toISOString())
        formData.append('endDate',osWithSessions.os.startDate.clone().add(1,'hour').toISOString())
        addSessionFetcher.submit(formData, {
            method: 'post',
        })
    }

    return (
        <>
            <ImageList>
                <ImageListItem key={"session-add"} sx={{
                    alignItems: "center",
                    verticalAlign: "middle",
                }}>
                    <ListItemButton data-testid={"os-session-add-button"}
                                    onClick={addSession}
                                    sx={{
                                        minHeight: 150
                                    }}>
                        <NoteAddIcon fontSize={"large"}/>
                    </ListItemButton>
                    <ImageListItemBar title={"no sessions yet"}/>
                </ImageListItem>
                {osWithSessions.sessions.map((session) => (
                    <ImageListItem key={session.sessionIdentifier}>
                        <Skeleton variant="rectangular" width={170} height={150}/>
                        <ImageListItemBar actionIcon={
                            <IconButton
                                data-testid={"os-session-edit"}
                                sx={{color: 'white'}}
                                aria-label={`Session ${session.title}`}
                            >
                                <EditIcon/>
                            </IconButton>
                        }/>
                        <ImageListItemBar position={"top"} actionPosition={"left"} actionIcon={
                            <IconButton
                                data-testid={"os-session-add"}
                                sx={{color: 'white'}}
                                aria-label={`Session ${session.title}`}
                            >
                                <AddPhotoAlternateIcon/>
                            </IconButton>
                        }/>

                    </ImageListItem>
                ))}
            </ImageList>
        </>
    )
}
