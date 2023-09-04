import {ActionFunctionArgs, redirect} from "react-router-dom";
import {ImageApiServices} from "../helper/imageApi";
import {ImageDetailsApiService} from "../helper/imageDetailsApi";

export const handleImageUploadAction = async (args: ActionFunctionArgs) => {
    // return the ids of uploading images until they are finally uploaded
    return args.request.formData().then((data) => {
        for (const [key, value] of data.entries()) {
            console.log(key + '=' + value)
        }
        console.log(`handle upload image action for ${JSON.stringify(Array.from(data.values()))}`)
        return Array.from(data.values())
    })
}

export const handleImageDeleteAction = async (args: ActionFunctionArgs) => {
    await ImageApiServices.delete({
        osIdentifier: args.params.os_id!,
        imageIdentifier: args.params.image_id!,
    });
    return redirect(`/os/${args.params.os_id!}/i`);
}

export const handleImageHeaderAction = async (args: ActionFunctionArgs) => {
    await ImageApiServices.makeHeader({
        osIdentifier: args.params.os_id!,
        imageIdentifier: args.params.image_id!,
    });
    return redirect(`/os/${args.params.os_id!}/i`);
}

export const handleImageDetailsEditAction = async (args: ActionFunctionArgs) => {
    const details = await args.request.json();
    return ImageDetailsApiService.editDetails({
        osIdentifier: args.params.os_id!,
        imageIdentifier: args.params.image_id!,
    }, details)
}
