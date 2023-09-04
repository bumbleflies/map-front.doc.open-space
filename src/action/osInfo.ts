import {ActionFunctionArgs, redirect} from "react-router-dom";
import {OsApiServices} from "../api/osApi";

export const handleDeleteAction = async (args: ActionFunctionArgs) => {
    const osId = args.params.os_id!;
    return OsApiServices.delete(osId).then(() => {
        return redirect('/')
    })
}

export const handleEditAction = async (args: ActionFunctionArgs) => {
    const formData = await args.request.json();
    return OsApiServices.putApiMarker(formData).then((result) => {
        return redirect(`/os/${result.identifier}`)
    })
}

export const handleAddAction = async (args: ActionFunctionArgs) => {
    const formData = await args.request.json();
    return OsApiServices.save(formData)
}