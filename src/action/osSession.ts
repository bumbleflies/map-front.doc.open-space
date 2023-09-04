import {ActionFunctionArgs} from "react-router-dom";
import {SessionApiServices} from "../api/sessionApi";
import {TransientOsSessionApiType} from "../types/session";

export const handleSessionAddAction = async (args: ActionFunctionArgs) => {
    return args.request.formData().then(formData => {
        const session: TransientOsSessionApiType = {
            title: formData.get('title') as string,
            start_date: formData.get('startDate') as string,
            end_date: formData.get('endDate') as string
        }
        console.log(`About to create session ${JSON.stringify(session)}`)
        return SessionApiServices.add(args.params.os_id!, session)
    })
}
