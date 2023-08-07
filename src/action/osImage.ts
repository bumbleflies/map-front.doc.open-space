import {ActionFunctionArgs, redirect} from "react-router-dom";

export const handleImageUploadAction = async (args: ActionFunctionArgs) => {
    // use the action just to trigger the loader reload...actual upload is done on the caller side
    const osId = args.params.os_id!;
    return redirect(`/os/${osId}/i`)
}
