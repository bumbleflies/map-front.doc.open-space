import {ActionFunctionArgs, redirect} from "react-router-dom";
import {apiServices} from "../helper/markerApi";

export const handleDeleteAction = async (args: ActionFunctionArgs) => {
    const osId = args.params.os_id!;
    return apiServices.delete(osId).then(() => {
        return redirect('/')
    })
}

export const handleEditAction = async (args: ActionFunctionArgs) => {
    const formData = await args.request.json();
    return apiServices.putApiMarker(formData).then((result) => {
        return redirect(`/os/${result.identifier}`)
    })
}
