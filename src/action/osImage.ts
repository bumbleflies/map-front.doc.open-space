import {ActionFunctionArgs, redirect} from "react-router-dom";
import {apiImageServices} from "../helper/imageApi";

export const handleImageUploadAction = async (args: ActionFunctionArgs) => {
    // use the action just to trigger the loader reload...actual upload is done on the caller side
    const osId = args.params.os_id!;
    return redirect(`/os/${osId}/i`)
}

export const handleImageDeleteAction = (args: ActionFunctionArgs) => {
    return apiImageServices.delete({
        osIdentifier: args.params.os_id!,
        imageIdentifier: args.params.image_id!,
    }).then(() => redirect(`/os/${args.params.os_id!}/i`))
}

export const handleImageHeaderAction = (args: ActionFunctionArgs) => {
    return apiImageServices.makeHeader({
        osIdentifier: args.params.os_id!,
        imageIdentifier: args.params.image_id!,
    }).then(() => redirect(`/os/${args.params.os_id!}/i`))
}