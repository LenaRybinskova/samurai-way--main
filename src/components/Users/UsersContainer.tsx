import React from 'react';
import Users from './Users';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {followAC,  setUsersAC, unfollowAC,  UserType} from '../../redux/usersReducer';

type mapStateToPropsType = {
    users: UserType[]
}
type mapDispatchToProsType = {
    follow: (id: number) => void
    unfollow: (id: number) => void
    setUsers:(users:UserType[])=>void
}
export type UsersContainerType = mapStateToPropsType & mapDispatchToProsType

const mapStateToProps = (state: AppRootSTateType): mapStateToPropsType => {
    return {users: state.usersPage.users}
}
const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToProsType => {
    return {
        follow: (id: number) => {
            dispatch(followAC(id))
        },
        unfollow: (id: number) => {
            dispatch(unfollowAC(id))
        },
        setUsers:(users:UserType[])=>{dispatch(setUsersAC(users))}
    }
}


export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)