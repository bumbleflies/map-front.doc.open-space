import {IconButton, ImageList, ImageListItem, ImageListItemBar, ListItemButton, Skeleton} from "@mui/material"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from "@mui/icons-material/Edit";
import {useFetcher, useLoaderData, useNavigate} from "react-router-dom";
import {OsWithSessions} from "../../api/sessionApi";
import {OsSessionDetailsApiType} from "../../types/session";


export const OsSessionsTab = () => {
    const addSessionFetcher = useFetcher()
    const osWithSessions = useLoaderData() as OsWithSessions
    const navigate = useNavigate()

    const addSession = () => {
        const newSessionData: OsSessionDetailsApiType = {
            title: `Session #${osWithSessions.sessions.length + 1} of OS [${osWithSessions.os.title}]`,
            start_date: osWithSessions.os.startDate.toISOString(),
            end_date: osWithSessions.os.startDate.clone().add(1, 'hour').toISOString()
        }
        addSessionFetcher.submit(newSessionData, {
            method: 'post',
            encType: "application/json"
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
                        <ImageListItemBar
                            subtitle={`${session.startDate.format('DD.MM')} ${session.startDate.format('HH:mm')} - ${session.endDate.format('HH:mm')}`}
                            actionIcon={
                                <IconButton
                                    data-testid={"os-session-edit"}
                                    sx={{color: 'white'}}
                                    aria-label={`Session ${session.title}`}
                                    onClick={() => navigate(`${session.sessionIdentifier}/edit`)}
                                >
                                    <EditIcon/>
                                </IconButton>
                            }/>
                        <ImageListItemBar
                            position={"top"}
                            actionPosition={"left"}
                            subtitle={session.title}

                            actionIcon={
                                <IconButton
                                    data-testid={"os-session-add-image"}
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
