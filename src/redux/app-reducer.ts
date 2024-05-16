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

// TC
export const initializedAppTC = (): AppThunk => (dispatch) => {
    const promise = dispatch(getAuthUserDataTC()) // запраш, кука есть?
    /*  dispatch(njsdjfjkhsd()) // еще может какие то запросы
        dispatch(njsdjfjkhsd())*/
    Promise.all([promise]) //когда они ВСЕ зарезолвятся, тогда только в зен попадем
        .then(res => {
            dispatch(initializedSuccessAC())
        })
}

export type SetInitializedType = ReturnType<typeof initializedSuccessAC>
export type AppACType = SetInitializedType

export default appReducer;


