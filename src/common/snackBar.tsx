import React, {useEffect} from "react";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>;
});

export default function CustomizedSnackbars() {

    const isError = useSelector<RootState, string>(state => state.AppRoot.error)
    const [open, setOpen] = React.useState(!!isError)
    useEffect(()=>{
        if(!open){
            setOpen(!!isError)
        }
    },[isError])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {isError}
                </Alert>
            </Snackbar>
        </Stack>
    );
}