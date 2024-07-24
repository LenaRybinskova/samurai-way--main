import {userAPI} from '../api/api';
import {Dispatch} from 'redux';
import {updateObjectInArray} from '../utils/object-helher';
import {handleError} from '../utils/handleError';

const FOLLOW = 'samurai-network/users/FOLLOW'
const UNFOLLOW = 'samurai-network/users/UNFOLLOW'
const SET_USERS = 'samurai-network/users/SET_USERS'
const SET_CURRENT_PAGE = 'samurai-network/users/SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'samurai-network/users/SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'samurai-network/users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'samurai-network/users/TOGGLE_IS_FOLLOWING_PROGRESS'

export type UserType = {
    id: number,
    photos: UserPhotoType,
    followed: boolean,
    name: string,
    status: string | null,
    uniqueUrlName:string | null,
}
export type UserPhotoType = {
    small: string | null,
    large: string | null
}


// ЗНАЧЕНИЕ стартовый стейт
const initialState: initialStateType = {
    users: [] as UserType[],
    pageSize: 18,
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
            return {...state, users: updateObjectInArray(state.users, action.id, 'id', {followed: true})}
        case UNFOLLOW:
            return {...state, users: updateObjectInArray(state.users, action.id, 'id', {followed: false})}
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
export const requestUsersTC = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    /*со старта приложения, запрос идет этот и подгружает пользователей и totalCount пользователей*/
    dispatch(setCurrentPage(currentPage)) // чтобы выделялась текущ строка
    dispatch(toggleIsFetching(true))//крутилка вкл
    const data = await userAPI.getUsers(currentPage, pageSize)
    dispatch(setUsers(data.items))
    dispatch(setTotalCount(data.totalCount))
    dispatch(toggleIsFetching(false)) //крутилка выкл
}
const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: (userId: number) => any, actionCreator: any) => {
    dispatch(toggleIsFollowingProgress(userId, true))
    try{
        const res = await apiMethod(userId)
        if (res.data.resultCode === 0) {
            dispatch(actionCreator(userId))
        }
        dispatch(toggleIsFollowingProgress(userId, false))
    }catch (e) {
        handleError(e, dispatch)
    }

}
export const followTC = (userId: number) => {
    return async (dispatch: Dispatch) => {
        try{
            const apiMethod = userAPI.follow.bind(userAPI)
            followUnfollowFlow(dispatch, userId, apiMethod, follow)
        }
        catch (e) {
            handleError(e, dispatch)
        }
    }
}
export const unfollowTC = (userId: number) => async (dispatch: Dispatch) => {
    try{
        const apiMethod = userAPI.unfollow.bind(userAPI)
        followUnfollowFlow(dispatch, userId, apiMethod, unfollow)
    }catch (e) {
        handleError(e, dispatch)
    }
}
export default usersReducer;


