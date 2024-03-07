import {AllActionTypes} from './store';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING="TOGGLE_IS_FETCHING"

export type UserType = {
    id: number,
    photos: UserPhotoType,
    followed: boolean,
    name: string,
    status: string | null,
    location: locationUserType
}
export type UserPhotoType = {
    small: string | null,
    large: string | null
}
export type locationUserType = {
    city: string,
    country: string
}

// ЗНАЧЕНИЕ стартовый стейт
const initialState: initialStateType = {
    users: [] as UserType[],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching:false
}

export type initialStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching:boolean
}

export const usersReducer = (state: initialStateType = initialState, action: AllActionTypes): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: false} : u)}
        case SET_USERS:
            // копий юзеров не делаем, тк хотим, чтобы при пагинации одна порция юзеров заменяла другую порцию
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.pageNumber}
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching:action.isFetching}

        default:
            return state
    }
}
export type followACType = ReturnType<typeof followAC>
export type unfollowACType = ReturnType<typeof unfollowAC>
export type setUsersACType = ReturnType<typeof setUsersAC>
export type setCurrentPageACType = ReturnType<typeof setCurrentPageAC>
export type setTotalCountACType = ReturnType<typeof setTotalCountAC>
export type setIsFetchingType = ReturnType<typeof toggleIsFetchingAC>


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
export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        pageNumber: currentPage
    } as const
}
export const setTotalCountAC = (totalUsersCount: number) => {
    return {
        type: SET_TOTAL_COUNT,
        totalUsersCount: totalUsersCount
    } as const
}
export const toggleIsFetchingAC = (isFetching:boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    } as const
}

export default usersReducer;


