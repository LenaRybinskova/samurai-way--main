import {Dispatch} from 'redux';
import {authAPI, LoginType} from '../api/api';
import {AppThunk} from '../redux/reduxStore';
import {stopSubmit} from 'redux-form';

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

export const authReducer = (state: AuthStateType = initialState, action: SetAuthUserDataACType): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state
    }
}
export type SetAuthUserDataACType = ReturnType<typeof setAuthUserData>
export type  AuthReducerAcTypes = SetAuthUserDataACType

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
    authAPI.login(value).then(res => {
        if (res.data.resultCode === 0) { //значи есть кука, значит залогинены
            dispatch(getAuthUserDataTC())
        } else {
            const message = res.data.messages.length > 0 ? res.data.messages[0] : 'some error'
            /*const action = stopSubmit('login', {email: 'email is wrong'})*/ //email значит валидироваться  будет только поле email
            dispatch(stopSubmit('login', {_error: message})) // валидируется вся форма _error
        }
    })
}

export const logoutTC = (): AppThunk => (dispatch) => {
    authAPI.logout().then(res => {
        if (res.data.resultCode === 0) { // значит все, мы вылогинились
            dispatch(setAuthUserData(null, null, null, false)) // устанавливаем данные юзера в стор
        }
    })
}


export default authReducer;


