import {IconButton, ImageList, ImageListItem, ImageListItemBar, ListItemButton} from "@mui/material"
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {Outlet, useFetcher, useLoaderData, useNavigate} from "react-router-dom";
import {OsSessionDetailsApiType, OsSessionWithHeaderImage} from "../../types/session";
import {OsSessionsMenu} from "./osSessionsMenu";
import {useSelectionMenu} from "../image/menu";
import React, {useState} from "react";
import {Endpoints} from "../../config/Endpoints";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {MarkerType} from "../../types/marker";
import {useDataFromMatcher} from "../../helper/dataFromMatcher";
import ImageOptions from "../../config/Settings";


export const OsSessionsOverview = () => {
    const addSessionFetcher = useFetcher()
    const sessions = useLoaderData() as OsSessionWithHeaderImage[]
    const navigate = useNavigate()

    const {menu, selected} = useSelectionMenu()

    const [os, setOs] = useState<MarkerType | null>(null)

    useDataFromMatcher<MarkerType | null>({id: 'os', stateSetter: setOs})

    const addSession = () => {
        if (os !== null) {
            const newSessionData: OsSessionDetailsApiType = {
                title: `Session #${sessions.length + 1} of OS [${os.title}]`,
                start_date: os.startDate.toISOString(),
                end_date: os.startDate.clone().add(1, 'hour').toISOString()
            }
            addSessionFetcher.submit(newSessionData, {
                method: 'post',
                encType: "application/json"
            })
        }
    }

    return (
        <>
            <Outlet/>
            <ImageList>
                <ImageListItem key={"session-add"} sx={{
                    alignItems: "center",
                    verticalAlign: "middle",
                }}>
                    <ListItemButton data-testid={"os-session-add-button"}
                                    onClick={addSession}
                                    sx={{
                                        minHeight: ImageOptions.height
                                    }}>
                        <NoteAddIcon fontSize={"large"}/>
                    </ListItemButton>
                    <ImageListItemBar title={sessions.length > 0 ? null : "no sessions yet"}
                                      subtitle={"add session impressions"}/>
                </ImageListItem>
                {sessions.map((session) => (
                    <ImageListItem key={session.sessionIdentifier}>
                        {session.header.isAvailable ?
                            <img onClick={() => navigate(`${session.sessionIdentifier}/i`)}
                                 alt={session.sessionIdentifier}
                                 src={Endpoints.openSpaceSessionImage(session.header)}
                                 loading="lazy"
                                 data-testid={"os-session"}
                                 {...ImageOptions}
                            /> :
                            <img
                                src={'/img/no-image-icon.png'}
                                onClick={() => navigate(`${session.sessionIdentifier}/i`)}
                                alt={'not available yet'}
                                data-testid={"os-session"}
                                {...ImageOptions}
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
