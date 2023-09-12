import {IconButton, ImageList, ImageListItem, ImageListItemBar, ListItemButton} from "@mui/material"
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {Await, useFetcher, useLoaderData, useNavigate} from "react-router-dom";
import {OsSessionDetailsApiType, OsSessionImage, OsWithSessions} from "../../types/session";
import {OsSessionsMenu} from "./osSessionsMenu";
import {useSelectionMenu} from "../image/menu";
import React, {useEffect, useState} from "react";
import {DeferredSessionType} from "../../api/sessionApi";
import {Endpoints} from "../../config/Endpoints";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";


export const OsSessionsOverview = () => {
    const addSessionFetcher = useFetcher()
    const deferredData = useLoaderData() as DeferredSessionType
    const navigate = useNavigate()

    const {menu, selected} = useSelectionMenu()

    const [osWithSessions, setOsWithSessions] = useState<OsWithSessions | null>(null)

    useEffect(() => {
        deferredData.osWithSession.then((osWithSessionData) => setOsWithSessions(osWithSessionData))
    }, [deferredData.osWithSession, setOsWithSessions])

    const addSession = () => {
        if (osWithSessions !== null) {
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
    }

    return (
        <>
            <React.Suspense
                fallback={<p>Loading Sessions...</p>}
            >
                <Await
                    resolve={deferredData.osWithSession}>
                    {(osWithSessionData) => (
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
                    {osWithSessions!==null?
                    <ImageListItemBar title={osWithSessions.sessions.length > 0 ? null : "no sessions yet"}
                                      subtitle={"click to add impressions"}/>
                        : null}
                </ImageListItem>
                {osWithSessions===null? null : osWithSessions.sessions.map((session) => (
                    <ImageListItem key={session.sessionIdentifier}>
                        {session.header.isAvailable ?
                            <img onClick={() => navigate(`${session.sessionIdentifier}/i`)}
                                 src={Endpoints.openSpaceSessionImage((session.header as OsSessionImage))}
                                 alt={session.sessionIdentifier}
                                 loading="lazy"
                                 data-testid={"os-session"}
                            /> :
                            <img
                                src={'/img/no-image-icon.png'}
                                onClick={() => navigate(`${session.sessionIdentifier}/i`)}
                                alt={'not available yet'}
                                data-testid={"os-session"}
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
            )

                    }

                </Await>
            </React.Suspense>

            <OsSessionsMenu menu={menu} selected={selected}/>
        </>
    )
}
