import {AppRootSTateType} from '../redux/reduxStore';
import {createSelector} from 'reselect';
import {UserType} from '../redux/usersReducer';


// пример простого легкого селектора
export const getUsers = (state: AppRootSTateType): UserType[] => {
    return state.usersPage.users
}

export const getIsFetching = (state: AppRootSTateType) => {
    return state.usersPage.isFetching
}

// пример тяжелого селектора, закешированного. На проде не надо называть суперселектор, надо getUsers, а просто селетор getUsersSelector
export const getUserSelector = createSelector([getUsers], (users: UserType[]) => {
        return users.filter(u => true)
    }
)

export const getPageSize = (state: AppRootSTateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppRootSTateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppRootSTateType) => {
    return state.usersPage.currentPage
}


export const getFollowingProgress = (state: AppRootSTateType) => {
    return state.usersPage.followingProgress
}

