import {AllActionTypes} from './store';
import {Dispatch} from 'redux';
import {authAPI, userAPI} from '../api/api';

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
            return {...state, ...action.data, isAuth: true}
        default:
            return state
    }
}
export type SetAuthUserDataACType = ReturnType<typeof setAuthUserData>

// AC
export const setAuthUserData = (userId: string, email: string, login: string) => {
    return {
        type: SET_USER_DATA,
        data: {userId, email, login}
    } as const
}

// TC
export const getAuthUserDataTC =()=>(dispatch:Dispatch)=>{
    authAPI.authMe().then(res => {
        if (res.data.resultCode === 0) {
            let {id, login, email} = res.data.data
            dispatch(setAuthUserData(id, email, login))}})
}

export default authReducer;


