import {Dispatch} from 'redux';
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
export const setInitializedAC = () => {
    return {
        type: INITIALIZED_SUCCESS
    } as const
}

// TC
export const initializedAppTC = (): AppThunk => (dispatch) => {
    const dispachResult = dispatch(getAuthUserDataTC()) // запраш, кука есть?

}

export type SetInitializedType = ReturnType<typeof setInitializedAC>
export type AppACType = SetInitializedType

export default appReducer;


