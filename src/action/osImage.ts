import {ActionFunctionArgs, redirect} from "react-router-dom";
import {apiImageServices} from "../helper/imageApi";

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