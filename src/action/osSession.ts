import {ActionFunctionArgs, redirect} from "react-router-dom";
import {SessionApiServices} from "../api/sessionApi";
import {SessionImageApiServices} from "../api/sessionImageApi";

export const handleSessionAddAction = async (args: ActionFunctionArgs) =>
    args.request.json().then((newSessionData) => {
        console.log(`About to create session ${JSON.stringify(newSessionData)}`)
        return SessionApiServices.add(args.params.os_id!, newSessionData.session, newSessionData.token)
    })


export const handleSessionEditAction = async (args: ActionFunctionArgs) =>
    args.request.json().then(async (newSessionData) => {
        console.log(`About to edit session ${JSON.stringify(newSessionData)}`)
        return SessionApiServices.edit({
            sessionIdentifier: args.params.session_id!,
            osIdentifier: args.params.os_id!
        }, newSessionData.session, newSessionData.token).then(() => redirect('..'))
    })


export const handleSessionDeleteAction = async (args: ActionFunctionArgs) =>
    args.request.json().then(async (newSessionData) => SessionApiServices.delete({
        sessionIdentifier: args.params.session_id!,
        osIdentifier: args.params.os_id!
    }, newSessionData.token).then(() => redirect(`/os/${args.params.os_id!}/s/_`)))

export const handleSessionImageDeleteAction = async (args: ActionFunctionArgs) => {
    return SessionImageApiServices.delete({
        osIdentifier: args.params.os_id!,
        sessionIdentifier: args.params.session_id!,
        imageIdentifier: args.params.image_id!,
        isAvailable: true,
        isHeader: false
    }).then(() => redirect(`/os/${args.params.os_id!}/s/_/${args.params.session_id!}/i`))
}
export const handleSessionImageHeaderAction = async (args: ActionFunctionArgs) => {
    return SessionImageApiServices.makeHeader({
        osIdentifier: args.params.os_id!,
        sessionIdentifier: args.params.session_id!,
        imageIdentifier: args.params.image_id!,
        isAvailable: true,
        isHeader: false
    }).then(() => redirect(`/os/${args.params.os_id!}/s/_/${args.params.session_id!}/i`))
}

