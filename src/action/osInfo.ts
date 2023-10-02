import {ActionFunctionArgs, redirect} from "react-router-dom";
import {OsApiServices} from "../api/osApi";

export const handleDeleteAction = async (args: ActionFunctionArgs) => {
    const osId = args.params.os_id!;
    return args.request.json().then((formData) => OsApiServices.delete(osId, formData.token).then(() => {
        return redirect('/')
    }))
}

export const handleEditAction = async (args: ActionFunctionArgs) => {
    const formData = await args.request.json();
    return OsApiServices.putApiMarker(formData).then((result) => {
        return redirect(`..`)
    })
}

export const handleAddAction = async (args: ActionFunctionArgs) => {
    return args.request.json().then((formData) => OsApiServices.save(formData.os, formData.token))
}