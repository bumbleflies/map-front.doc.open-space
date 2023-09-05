import {ActionFunctionArgs, redirect} from "react-router-dom";
import {SessionApiServices} from "../api/sessionApi";
import {OsSessionDetailsApiType} from "../types/session";

export const handleSessionAddAction = async (args: ActionFunctionArgs) =>
    args.request.json().then((newSessionData: OsSessionDetailsApiType) => {
        console.log(`About to create session ${JSON.stringify(newSessionData)}`)
        return SessionApiServices.add(args.params.os_id!, newSessionData)
    })


export const handleSessionEditAction = async (args: ActionFunctionArgs) =>
    args.request.json().then(async (newSessionData: OsSessionDetailsApiType) => {
        console.log(`About to edit session ${JSON.stringify(newSessionData)}`)
        return SessionApiServices.edit({
            sessionIdentifier: args.params.session_id!,
            osIdentifier: args.params.os_id!
        }, newSessionData).then(() => redirect('..'))
    })


export const handleSessionDeleteAction = async (args: ActionFunctionArgs) =>
    SessionApiServices.delete({
        sessionIdentifier: args.params.session_id!,
        osIdentifier: args.params.os_id!
    }).then(() => redirect(`/os/${args.params.os_id!}/s`))
