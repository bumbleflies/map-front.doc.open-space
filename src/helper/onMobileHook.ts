import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";

export const useOnMobile=()=>{
    const theme = useTheme()
    const onMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (onMobile)
}

export default useOnMobile
