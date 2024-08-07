import {AnyAction, Dispatch} from 'redux';
import {profileAPI, userAPI} from '../api/api';
import {ObtainedFormType} from '../components/Profile/ProfileInfo/ProfileInfo';
import {AppRootSTateType, AppThunk} from '../redux/reduxStore';
import {ThunkDispatch} from 'redux-thunk';
import {stopSubmit} from 'redux-form';
import {setUserAvatar} from '../redux/auth-reducer';
import moment from 'moment/moment';
import {handleError} from '../utils/handleError';

const ADD_POST = 'samurai-network/profile/ADD-POST'
const DELETE_POST = 'samurai-network/profile/DELETE-POST'
const SET_USER_PROFILE = 'samurai-network/profile/SET_USER_PROFILE'
const SET_PROFILE_STATUS = 'samurai-network/profile/SET_PROFILE_STATUS'
const SET_PHOTO_SUCCESS = 'samurai-network/profile/SET_PHOTO_SUCCESS'


/*{ profile: { photos: { small: string; large: string } }; profileStatus: string; newPostText: string; posts: PostType[] }*/
export const profileReducer = (state: initialStateType = initialState, action: ProfileReducerAcTypes): initialStateType => {
    switch (action.type) {
        case ADD_POST:
            const timeStamp = moment().format('MMM Do YY')
            let newPost = {id: 5, message: action.newPostText, likesCount: 0, time: timeStamp}
            return {...state, posts: [newPost, ...state.posts], newPostText: ''}
        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_PROFILE_STATUS:
            return {...state, profileStatus: action.newStatus}
        case SET_PHOTO_SUCCESS:
            //тк profile может быть null надо доп проверку делать
            if (state.profile) {
                return {...state, profile: {...state.profile, photos: action.photo}}
            }
            return state

        default:
            return state
    }
}

// стартовый стейт
let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12, time: 'May 11th 24'},
        {id: 2, message: 'Its my first post', likesCount: 0, time: 'Des 25th 23 '}
    ] as PostType[],
    newPostText: 'IT-kamasutra',
    profileStatus: '',
    profile: {
        aboutMe: '',
        userId: 30404,
        lookingForAJob: true,
        lookingForAJobDescription: '11',
        fullName: '11',
        contacts: {
            github: '11',
            vk: '11',
            facebook: '11',
            instagram: '11',
            twitter: '11',
            website: '11',
            youtube: '11',
            mainLink: '11'
        } as ContactsType,
        photos: {
            small: '11',
            large: '11'
        }
    } as ProfileResaponseType,
}

// Types
export type initialStateType = typeof initialState
export type ProfileResaponseType = {
    aboutMe: string,
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: {
        small: string,
        large: string
    }
}
export type PostType = {
    id: number
    message: string
    likesCount: number
    time?: string
}
export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
    profile: ProfileResaponseType | null,
    profileStatus: string
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfileReducerAcTypes =
    AddPostActionType
    | SetUserProfileType
    | SetProfileStatusType
    | deletePostActionType
    | SetPhotoSuccessType

export type AddPostActionType = ReturnType<typeof addPostAC>
export type deletePostActionType = ReturnType<typeof deletePostAC>
export type SetUserProfileType = ReturnType<typeof setUserProfile>
export type SetProfileStatusType = ReturnType<typeof setProfileStatus>
export type SetPhotoSuccessType = ReturnType<typeof savePhotoSuccess>


// AC
export const addPostAC = (newPostText: string) => {
    return {
        type: ADD_POST,
        newPostText
    } as const
}
export const deletePostAC = (postId: number) => {
    return {
        type: DELETE_POST,
        postId
    } as const
}
export const setUserProfile = (profile: ProfileResaponseType | null) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}
export const setProfileStatus = (newStatus: string) => {
    return {type: SET_PROFILE_STATUS, newStatus} as const
}
export const savePhotoSuccess = (photo: { small: string, large: string }) => {
    return {type: SET_PHOTO_SUCCESS, photo} as const
}

// TC
export const getUserProfileTC = (userId: number) => async (dispatch: Dispatch, getState: () => AppRootSTateType) => {
    try {
        const response = await userAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))

        const hasSmallPhoto = getState().auth.smallPhoto
        const isAuth = getState().auth.isAuth

        if (!hasSmallPhoto && isAuth) {
            dispatch(setUserAvatar(response.data.photos.small))
        }
    } catch (e) {
        handleError(e, dispatch)
    }
}
export const getUserStatusTC = (userId: number) => async (dispatch: Dispatch) => {
    try {
        const res = await profileAPI.getStatus(userId)
        dispatch(setProfileStatus(res.data))
    } catch (e) {
        handleError(e, dispatch)
    }

}
export const updateProfileStatusTC = (newStatus: string) => async (dispatch: Dispatch) => {
    try {
        const res = await profileAPI.updateStatus(newStatus)
        if (res.data.resultCode === 0) {
            dispatch(setProfileStatus(newStatus))
        }
    } catch (e) {
        handleError(e, dispatch)
    }
}

export const savePhoto = (file: string) => async (dispatch: Dispatch) => {
    try {
        const res = await profileAPI.savePhoto(file)
        if (res.data.resultCode === 0) {
            dispatch(savePhotoSuccess(res.data.data.photos))
        }
    } catch (e) {
        handleError(e, dispatch)
    }
}

export const saveProfile = (profile: ObtainedFormType): AppThunk =>
    async (dispatch: ThunkDispatch<AppRootSTateType, unknown, AnyAction>, getState: () => AppRootSTateType) => {
        try {
            const userId = getState().auth.userId;
            const res = await profileAPI.saveProfile(profile);
            if (res.data.resultCode === 0) {
                dispatch(getUserProfileTC(Number(userId)))
            } else {
                /*dispatch(stopSubmit('edit-profile', {_error: res.data.messages[0]})) //сохр текст ошибки для всей формы*/ /*Invalid url format (Contacts->Facebook)*/
                console.log('общая ошибка:', res.data.messages[0])
                const separatorSymbol = res.data.messages[0].indexOf('>')
                const contactName = res.data.messages[0].slice([separatorSymbol + 1]).slice(0, -1).toLowerCase() //вытаск из текста ош название поля с ошибкой и задаем его динамически
                dispatch(stopSubmit('edit-profile', {'contacts': {[contactName]: res.data.messages[0]}})) //сохр текст этой ошибки
                return Promise.reject(res.data.messages[0])
            }
        } catch (e) {
            handleError(e, dispatch)
        }
    };


export default profileReducer;