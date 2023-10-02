import {ActionFunctionArgs, redirect} from "react-router-dom";
import {OsApiServices} from "../api/osApi";

export const handleDeleteAction = async (args: ActionFunctionArgs) => {
    const osId = args.params.os_id!;
    return args.request.json().then((formData) => OsApiServices.delete(osId, formData.token).then(() =>
        redirect('/')
    ))
}

export const handleEditAction = async (args: ActionFunctionArgs) =>
    args.request.json().then((formData) =>
         OsApiServices.putApiMarker(formData.os, formData.token).then((result) => {
            return redirect(`..`)
        })
    )


export const handleAddAction = async (args: ActionFunctionArgs) =>
    args.request.json().then((formData) => OsApiServices.save(formData.os, formData.token))
