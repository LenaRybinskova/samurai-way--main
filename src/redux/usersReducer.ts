import {userAPI} from '../api/api';
import {Dispatch} from 'redux';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

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
    isFetching: false,
    followingProgress: [] //массив с ИД юзеров фоловеров(временный, для того чтобы понимать, что то происх с юз или нет)

}

export type initialStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean,
    followingProgress: Number[]
}

export const usersReducer = (state: initialStateType = initialState, action: UsersReducerAcTypes): initialStateType => {
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
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state, followingProgress: action.isFetching // если ТРУ ИД добавится, если фолс - верн новый массив без этого ИД
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}
export type followACType = ReturnType<typeof follow>
export type unfollowACType = ReturnType<typeof unfollow>
export type setUsersACType = ReturnType<typeof setUsers>
export type setCurrentPageACType = ReturnType<typeof setCurrentPage>
export type setTotalCountACType = ReturnType<typeof setTotalCount>
export type setIsFetchingType = ReturnType<typeof toggleIsFetching>
export type ToggleIsFollowingProgressType = ReturnType<typeof toggleIsFollowingProgress>
export type UsersReducerAcTypes =
    followACType
    | unfollowACType
    | setUsersACType
    | setCurrentPageACType
    | setTotalCountACType
    | setIsFetchingType
    | ToggleIsFollowingProgressType

// AC
export const follow = (userId: number) => {
    return {
        type: FOLLOW,
        id: userId
    } as const
}
export const unfollow = (userId: number) => {
    return {
        type: UNFOLLOW,
        id: userId
    } as const
}
export const setUsers = (users: UserType[]) => {
    return {
        type: SET_USERS,
        users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        pageNumber: currentPage
    } as const
}
export const setTotalCount = (totalUsersCount: number) => {
    return {
        type: SET_TOTAL_COUNT,
        totalUsersCount: totalUsersCount
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    } as const
}
export const toggleIsFollowingProgress = (userId: number, isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        userId,
        isFetching
    } as const
}


//TC
export const requestUsersTC = (currentPage: number, pageSize: number) => (dispatch: Dispatch) => {
    /*со старта приложения, запрос идет этот и подгружает пользователей и totalCount пользователей*/
    dispatch(setCurrentPage(currentPage)) // чтобы выделялась текущ строка
    dispatch(toggleIsFetching(true))//крутилка вкл
    userAPI.getUsers(currentPage, pageSize).then(data => {
        dispatch(setUsers(data.items))
        dispatch(setTotalCount(data.totalCount))
        dispatch(toggleIsFetching(false)) //крутилка выкл
    })
}


export const followTC = (userId: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgress(userId, true))
    userAPI.follow(userId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(follow(userId))
        }
        dispatch(toggleIsFollowingProgress(userId, false))
    })
}

export const unfollowTC = (userId: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgress(userId, true))
    userAPI.unfollow(userId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(unfollow(userId))
        }
        dispatch(toggleIsFollowingProgress(userId, false))
    })
}
export default usersReducer;


