import {AllActionTypes} from './store';
import {Dispatch} from 'redux';
import {authAPI, LoginType} from '../api/api';
import {AppThunk} from '../redux/reduxStore';

const SET_USER_DATA = 'SET_USER_DATA'
// со старта вся инфа по юзеру null - тк не залогинен
const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export type AuthStateType = {
    userId: string | null
    email: string | null
    login: string | null
    isAuth: boolean
}

export const authReducer = (state: AuthStateType = initialState, action: AllActionTypes): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            console.log('authReducer')
            return {...state, ...action.payload}
        default:
            return state
    }
}
export type SetAuthUserDataACType = ReturnType<typeof setAuthUserData>

// AC
export const setAuthUserData = (userId: string | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    } as const
}

// TC
export const getAuthUserDataTC = () => (dispatch: Dispatch) => {
    authAPI.authMe().then(res => {
        if (res.data.resultCode === 0) {
            let {id, login, email} = res.data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    })
}

export const loginTC = (value: LoginType): AppThunk => (dispatch) => {
    console.log('зашла loginTC')
    authAPI.login(value).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(getAuthUserDataTC())
        }
    })
}

export const logoutTC = (): AppThunk => (dispatch) => {
    authAPI.logout().then(res => {
        if (res.data.resultCode === 0) { // значит все, мы залогинены
            dispatch(setAuthUserData(null, null, null, false)) // устанавливаем данные юзера в стор
        }
    })
}


export default authReducer;


