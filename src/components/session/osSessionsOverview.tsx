import {IconButton, ImageList, ImageListItem, ImageListItemBar, ListItemButton} from "@mui/material"
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {useFetcher, useLoaderData, useNavigate} from "react-router-dom";
import {OsWithSessions} from "../../api/sessionApi";
import {OsSessionDetailsApiType, OsSessionImage} from "../../types/session";
import {OsSessionsMenu} from "./osSessionsMenu";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {useSelectionMenu} from "../image/menu";
import {Endpoints} from "../../config/Endpoints";


export const OsSessionsOverview = () => {
    const addSessionFetcher = useFetcher()
    const osWithSessions = useLoaderData() as OsWithSessions
    const navigate = useNavigate()

    const {menu, selected} = useSelectionMenu()

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
                    <ImageListItemBar title={osWithSessions.sessions.length > 0 ? null : "no sessions yet"}
                                      subtitle={"click to add impressions"}/>
                </ImageListItem>
                {osWithSessions.sessions.map((session) => (
                    <ImageListItem key={session.sessionIdentifier}>
                        {session.header.isAvailable ?
                            <img onClick={() => navigate(`${session.sessionIdentifier}/i`)}
                                 src={Endpoints.openSpaceSessionImage((session.header as OsSessionImage))}
                                 alt={session.sessionIdentifier}
                                 loading="lazy"
                                 data-testid={"os-session-image"}
                            /> :
                            <img
                                src={'/img/no-image-icon.png'}
                                onClick={() => navigate(`${session.sessionIdentifier}/i`)}
                                alt={'no image yet available'}
                            />
                        }

                        <ImageListItemBar
                            data-testid={'os-session-time-bar'}
                            subtitle={`${session.startDate.format('DD.MM')} ${session.startDate.format('HH:mm')} - ${session.endDate.format('HH:mm')}`}
                            actionIcon={
                                <IconButton
                                    data-testid={"os-session-menu"}
                                    sx={{color: 'white'}}
                                    aria-label={`Session ${session.title}`}
                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => menu.open(event, session.sessionIdentifier)}
                                >
                                    <KeyboardArrowUpIcon/>
                                </IconButton>
                            }/>
                        <ImageListItemBar
                            position={"top"}
                            actionPosition={"left"}
                            subtitle={session.title}
                            data-testid={'os-session-title-bar'}/>

                    </ImageListItem>
                ))}
            </ImageList>
            <OsSessionsMenu menu={menu} selected={selected}/>
        </>
    )
}
