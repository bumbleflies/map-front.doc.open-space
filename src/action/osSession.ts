import {ActionFunctionArgs, redirect} from "react-router-dom";
import {SessionApiServices} from "../api/sessionApi";
import {TransientOsSessionApiType} from "../types/session";

export const handleSessionAddAction = async (args: ActionFunctionArgs) => {
    return args.request.json().then((newSessionData: TransientOsSessionApiType) => {
        console.log(`About to create session ${JSON.stringify(newSessionData)}`)
        return SessionApiServices.add(args.params.os_id!, newSessionData)
    })
}

export const handleSessionEditAction = async (args: ActionFunctionArgs) => {
    return args.request.json().then((newSessionData: TransientOsSessionApiType) => {
        console.log(`About to create session ${JSON.stringify(newSessionData)}`)
        return SessionApiServices.edit({
            ...newSessionData,
            identifier: args.params.session_id!,
            os_identifier: args.params.os_id!
        }).then((newSession) => {
            return redirect(`/os/${args.params.os_id!}/s`);
        })
    })
}
