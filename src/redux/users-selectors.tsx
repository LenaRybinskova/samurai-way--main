import {AppRootSTateType} from '../redux/reduxStore';

export const getUsers = (state: AppRootSTateType) => {
    return state.usersPage.users
}

export const getPageSize = (state: AppRootSTateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppRootSTateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppRootSTateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppRootSTateType) => {
    return state.usersPage.isFetching
}

export const getFollowingProgress = (state: AppRootSTateType) => {
    return state.usersPage.followingProgress
}

