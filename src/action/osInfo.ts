import {ActionFunctionArgs, redirect} from "react-router-dom";
import {apiOsServices} from "../helper/markerApi";

export const handleDeleteAction = async (args: ActionFunctionArgs) => {
    const osId = args.params.os_id!;
    return apiOsServices.delete(osId).then(() => {
        return redirect('/')
    })
}

export const handleEditAction = async (args: ActionFunctionArgs) => {
    const formData = await args.request.json();
    return apiOsServices.putApiMarker(formData).then((result) => {
        return redirect(`/os/${result.identifier}`)
    })
}

export const handleAddAction = async (args: ActionFunctionArgs) => {
    const formData = await args.request.json();
    return apiOsServices.save(formData)
}