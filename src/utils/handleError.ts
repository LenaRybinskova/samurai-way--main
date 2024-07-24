import {Dispatch} from 'redux';
import axios from 'axios';
import {setAppError} from '../redux/app-reducer';

export const handleError = (e: unknown, dispatch: Dispatch) => {
    let err: string
    if (axios.isAxiosError(e)) {
        err = e.response ? e.response.data.errorMessages : e.message // axios обор в АксиосЭррор все ошибки и те что с сервера пришли, и те что даже на сервер не ушли из-за пробл с инетом
    } else {
        err = (e as Error).message // нативные ошибки( undefined мапим и тд)
    }
    dispatch(setAppError(err))
}