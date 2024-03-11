import {AllActionTypes} from './store';

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'



// стартовый стейт
let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Its my first post', likesCount: 0}
    ] as PostType[],
    newPostText: 'IT-kamasutra',
    profile: {
        userId: 2,
        lookingForAJob: true,
        lookingForAJobDescription: "11",
        fullName: "11",
        contacts: {
            github: "11",
            vk: "11",
            facebook: "11",
            instagram: "11",
            twitter: "11",
            website:"11",
            youtube: "11",
            mainLink: "11"
        },
        photos: {
            small: "11",
            large: "11"
        }
    } as ResponseAPIProfileType
}

export const profileReducer = (state: initialStateType = initialState, action: AllActionTypes): initialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {id: 5, message: state.newPostText, likesCount: 0}
            return {...state, posts: [...state.posts, newPost], newPostText: ''}
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newText}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state
    }
}

// Types
export type initialStateType = typeof initialState
export type ResponseAPIProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string,
        vk: string,
        facebook: string,
        instagram: string,
        twitter: string,
        website: string,
        youtube: string,
        mainLink: string
    }
    photos: {
        small: string,
        large: string
    }
}
export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
    profile: ResponseAPIProfileType  | null
}

export type ProfileReducerAcTypes = AddPostActionType | UpdateNewPostTextActionType | SetUserProfileType
export type AddPostActionType = ReturnType<typeof addPostAC>
export type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextAC>
export type SetUserProfileType = ReturnType<typeof setUserProfile>


// AC
export const addPostAC = () => {
    return {
        type: ADD_POST
    } as const
}
export const updateNewPostTextAC = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    } as const
}
export const setUserProfile = (profile: ResponseAPIProfileType | null) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}

export default profileReducer;