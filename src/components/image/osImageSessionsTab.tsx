import {IconButton, ImageList, ImageListItem, ImageListItemBar, ListItemButton, Skeleton} from "@mui/material"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {useState} from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from "@mui/icons-material/Edit";
type Session = {
    id: string,
    title: string
}


export const OsImageSessionsTab = () => {
    const [sessions, setSessions] = useState<Session[]>([])

    return (
        <>
            <ImageList>
                <ImageListItem key={"session-add"} sx={{
                    alignItems: "center",
                    verticalAlign: "middle",
                }}>
                    <ListItemButton data-testid={"os-session-add-button"}
                                    onClick={() => setSessions((current) => [...current, {
                                        id: (current.length).toString(),
                                        title: 'new'
                                    }])}
                                    sx={{
                                        minHeight: 150
                                    }}>
                        <NoteAddIcon fontSize={"large"}/>
                    </ListItemButton>
                    <ImageListItemBar title={"no sessions yet"}/>
                </ImageListItem>
                {sessions.map((session) => (
                    <ImageListItem key={session.id}>
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
                        <ImageListItemBar position={"top"}actionPosition={"left"} actionIcon={
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
