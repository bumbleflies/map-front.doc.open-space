import {ActionFunctionArgs} from "react-router-dom";

export const handleSessionAddAction = async (args: ActionFunctionArgs) => {
    console.log(JSON.stringify(args.request.formData()))
}
