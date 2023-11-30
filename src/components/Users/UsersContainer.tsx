import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {followAC, setCurrentPageAC, setTotalCountAC, setUsersAC, unfollowAC, UserType} from '../../redux/usersReducer';
import UsersClassComponent from './UsersClassComponent';

type mapStateToPropsType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
}
type mapDispatchToProsType = {
    follow: (id: number) => void
    unfollow: (id: number) => void
    setUsers: (users: UserType[]) => void
    setCurrenPage: (pageNumber: number) => void
    setTotalCount:(totalCount: number)=>void
}
export type UsersContainerType = mapStateToPropsType & mapDispatchToProsType

const mapStateToProps = (state: AppRootSTateType): mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToProsType => {
    return {
        follow: (id: number) => {
            dispatch(followAC(id))
        },
        unfollow: (id: number) => {
            dispatch(unfollowAC(id))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users))
        },
        setCurrenPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalCount:(totalUsersCount: number)=>{
            dispatch(setTotalCountAC(totalUsersCount))
        }
    }
}


export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersClassComponent)