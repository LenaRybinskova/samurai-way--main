import {Dispatch} from 'redux';
import {authAPI, LoginType, securityAPI} from '../api/api';
import {AppThunk} from '../redux/reduxStore';
import {stopSubmit} from 'redux-form';

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL'
const SET_SMALL_PHOTO = 'samurai-network/auth/SET_SMALL_PHOTO'

// со старта вся инфа по юзеру null - тк не залогинен
const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    smallPhoto: null
}

export type AuthStateType = {
    userId: string | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
    smallPhoto: string | null
}

export const authReducer = (state: AuthStateType = initialState, action: AuthReducerAcTypes): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        case GET_CAPTCHA_URL_SUCCESS:
            return {...state, captchaUrl: action.captchaUrl}
        case SET_SMALL_PHOTO:
            return {...state,smallPhoto:action.smallPhoto }
        default:
            return state
    }
}
export type SetAuthUserDataACType = ReturnType<typeof setAuthUserData>
export type GetCaptchaUrlACType = ReturnType<typeof getCaptchaUrl>
export type SetUserAvatarType = ReturnType<typeof setUserAvatar>
export type AuthReducerAcTypes = SetAuthUserDataACType | GetCaptchaUrlACType | SetUserAvatarType
// AC
export const setAuthUserData = (userId: string | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    } as const
}
export const getCaptchaUrl = (captchaUrl: string) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        captchaUrl
    } as const
}
export const setUserAvatar = (smallPhoto: string) => {
    return {type: SET_SMALL_PHOTO, smallPhoto} as const
}

// TC
export const getAuthUserDataTC = () => async (dispatch: Dispatch) => {
    const res = await authAPI.authMe() //res то, чем зарезолвится промис
    if (res.data.resultCode === 0) {
        let {id, login, email} = res.data.data
        dispatch(setAuthUserData(id, email, login, true))
    } else {
        return res // если резКод===1, значит ошибка какая то
    }
    /*return  authAPI.authMe().then(res => { // доб ретурт чтобы исп промис в initializedAppTC
         if (res.data.resultCode === 0) {
             let {id, login, email} = res.data.data
             dispatch(setAuthUserData(id, email, login, true))
         }
     })*/
}

export const loginTC = (value: LoginType): AppThunk => async (dispatch) => {
    const res = await authAPI.login(value)
    if (res.data.resultCode === 0) { //значи есть кука, значит залогинены
        dispatch(getAuthUserDataTC())
    } else {
        if (res.data.resultCode === 10) {
            dispatch(getCaptchaURL())
        }
        const message = res.data.messages.length > 0 ? res.data.messages[0] : 'some error'
        const action = stopSubmit('login', {email: 'email is wrong'}) //email значит валидироваться  будет только поле email
        dispatch(stopSubmit('login', {_error: message})) // валидируется вся форма _error
    }
}

export const getCaptchaURL = () => async (dispatch: Dispatch) => {
    const res = await securityAPI.getCaptcha()
    const captchURL = res.data.url
    dispatch(getCaptchaUrl(captchURL))
}

export const logoutTC = (): AppThunk => async (dispatch) => {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) { // значит все, мы вылогинились
        dispatch(setAuthUserData(null, null, null, false)) // устанавливаем данные юзера в стор
    }
    /*authAPI.logout().then(res => {
        if (res.data.resultCode === 0) { // значит все, мы вылогинились
            dispatch(setAuthUserData(null, null, null, false)) // устанавливаем данные юзера в стор
        }
    })*/
}


export default authReducer;


