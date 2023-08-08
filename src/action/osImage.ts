import {ActionFunctionArgs, redirect} from "react-router-dom";
import {apiServices} from "../helper/imageApi";

export const handleImageUploadAction = async (args: ActionFunctionArgs) => {
    // use the action just to trigger the loader reload...actual upload is done on the caller side
    const osId = args.params.os_id!;
    return redirect(`/os/${osId}/i`)
}

export const handleImageDeleteAction = (args: ActionFunctionArgs) => {
    const osId = args.params.os_id!;
    const imageId = args.params.image_id!;
    return apiServices.delete({
        osIdentifier: osId,
        imageIdentifier: imageId,
        isAvailable: true
    }).then(() => redirect(`/os/${osId}/i`))
}
