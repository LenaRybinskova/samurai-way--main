import {getAuthUserDataTC} from '../redux/auth-reducer';
import {AppThunk} from '../redux/reduxStore';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const initialState = {
    initialized: false
}

export type AppReducerType = {
    initialized: boolean
}

export const appReducer = (state: AppReducerType = initialState, action: AppACType): AppReducerType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        default:
            return state
    }
}

// AC
export const initializedSuccessAC = () => {
    return {type: INITIALIZED_SUCCESS} as const
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
export type AppACType = SetInitializedType

export default appReducer;


