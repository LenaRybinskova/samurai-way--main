import {getAuthUserDataTC} from '../redux/auth-reducer';
import {AppThunk} from '../redux/reduxStore';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const SET_APP_ERROR="SET_APP_ERROR"
const initialState = {
    initialized: false,
    error: null,
}

export type AppReducerType = {
    initialized: boolean
    error: string | null
}

export const appReducer = (state: AppReducerType = initialState, action: AppACType): AppReducerType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        case SET_APP_ERROR:
            return {...state, error: action.message}
        default:
            return state
    }
}

// AC
export const initializedSuccessAC = () => {
    return {type: INITIALIZED_SUCCESS} as const
}
export const setAppError=(message:string | null)=>{
    return {type: SET_APP_ERROR, message} as const
}


// пример, если надо ждать неск промисов когда зарезолваятся и тогда что что диспатчить
/*export const initializedAppTC = (): AppThunk => (dispatch) => {
    const promise = dispatch(getAuthUserDataTC()) // запраш, кука есть?
    Promise.all([promise]) //когда они ВСЕ зарезолвятся, тогда только в зен попадем
        .then(res => {dispatch(initializedSuccessAC())})
}*/
// я переписала
export const initializedAppTC = (): AppThunk => (dispatch) => {
    dispatch(getAuthUserDataTC()).then(res => { // если ответ серв 200
        dispatch(initializedSuccessAC()) // инициал =ТРУ
    })
}


export type SetInitializedType = ReturnType<typeof initializedSuccessAC>
export type SetAppErrorType = ReturnType<typeof setAppError>
export type AppACType = SetInitializedType | SetAppErrorType

export default appReducer;


