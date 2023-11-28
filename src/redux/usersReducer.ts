import {AllActionTypes} from './store';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

export type UserType = {
    id: number,
    photos: UserPhotoType,
    followed: boolean,
    name: string,
    status: string,
    location: locationUserType
}

export type UserPhotoType={
    small:string,
    large:string
}
export type locationUserType = {
    city: string,
    country: string
}

// ЗНАЧЕНИЕ стартовый стейт
const initialState: initialStateType = {
    users: [] as UserType[]
}

export type initialStateType = {
    users: UserType[]
}

export const usersReducer = (state: initialStateType = initialState, action: AllActionTypes): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: false} : u)}
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}
export type followACType = ReturnType<typeof followAC>
export type unfollowACType = ReturnType<typeof unfollowAC>
export type setUsersACType = ReturnType<typeof setUsersAC>


// ActionCreators
export const followAC = (userId: number) => {
    return {
        type: FOLLOW,
        id: userId
    } as const
}
export const unfollowAC = (userId: number) => {
    return {
        type: UNFOLLOW,
        id: userId
    } as const
}

export const setUsersAC = (users: UserType[]) => {
    return {
        type: SET_USERS,
        users
    } as const
}

export default usersReducer;


/*
let initialState = {
    users: [
        /!* {
             id: 1,
             followed: false,
             fullName: 'Sasha',
             status: 'i am a boss',
             location: {sity: 'Zelenograd', country: 'RF'}
         },
         {id: 2, followed: true, fullName: 'Dima', status: 'i am a boss2', location: {sity: 'Zhuk', country: 'RF'}},
         {
             id: 3,
             followed: false,
             fullName: 'Vera',
             status: 'i am a boss3',
             location: {sity: 'Serpuchov', country: 'RF'}
         },
         {id: 4, followed: true, fullName: 'Anna', status: 'i am a boss4', location: {sity: 'Zelenograd', country: 'RF'}}*!/
    ]
} as UserType[]*/
