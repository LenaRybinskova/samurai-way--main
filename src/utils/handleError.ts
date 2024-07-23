import {Dispatch} from 'redux';
import axios from 'axios';
import {setAppError} from '../redux/app-reducer';

export const handleError = (e: unknown, dispatch: Dispatch) => {
    let err: string
    if (axios.isAxiosError(e)) {
        console.log("axios.isAxiosError", e)
        err = e.response ? e.response.data.errorMessages : e.message
    } else {
        console.log("e as Error", e)
        err = (e as Error).message
    }
    dispatch(setAppError(err))
}