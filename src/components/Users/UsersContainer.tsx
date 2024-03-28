import React from 'react';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {
    follow, followTC,
    setCurrentPage,
    setTotalCount,
    setUsers, setUsersTC,
    toggleIsFetching, toggleIsFollowingProgress,
    unfollow, unfollowTC,
    UserType
} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
import {userAPI} from '../../api/api';


// 2я контейнерная компонента, которая обращ к АПИ
class UsersContainerClass extends React.Component<UsersContainerType> {

    componentDidMount() {
        this.props.setUsersTC(this.props.currentPage,this.props.pageSize)
        /*/!*         со старта приложения, запрос идет этот и подгружает пользователей и totalCount пользователей*!/
        this.props.toggleIsFetching(true)//крутилка вкл
        userAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.setUsers(data.items)
            this.props.setTotalCount(data.totalCount)
            this.props.toggleIsFetching(false) //крутилка выкл
        })*/
    }

    onPageChanged(pageNumber: number) {
        this.props.setUsersTC(pageNumber,this.props.pageSize)
       /* this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)  //крутилка вкл
        userAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
        this.props.toggleIsFetching(false)  //крутилка выкл
        this.props.setUsers(data.items)
        })*/
    }

    render(): React.ReactNode {
        return (
            <>{this.props.isFetching ? <Preloader/> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       //обернула в стрел чтобы не потерялся контекст
                       onPageChanged={(p) => this.onPageChanged(p)}
/*                       unfollow={this.props.unfollow}*/
/*                       follow={this.props.follow}*/
                       followingProgress={this.props.followingProgress}
                       //обернула в стрел чтобы не потерялся контекст
/*                       toggleIsFollowingProgress={(userId, isFetching) => this.props.toggleIsFollowingProgress(userId, isFetching)}*/
                       followTC={this.props.followTC}
                       unfollowTC={this.props.unfollowTC}
                />
            </>
        );
    }
}

// 1я контейнерная компонента, которая обращается к стору
type mapStateToPropsType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
    followingProgress: Number[]
}
type mapDispatchToProsType = {
    setCurrentPage: (pageNumber: number) => void
    setUsersTC:(currentPage:number,pageSize:number)=>void
    followTC: (userId: number) => void
    unfollowTC: (userId: number) => void
/*    follow: (id: number) => void*/
/*    unfollow: (id: number) => void*/
/*    setUsers: (users: UserType[]) => void*/
/*    setTotalCount: (totalCount: number) => void*/
/*    toggleIsFetching: (isFetching: boolean) => void*/
/*    toggleIsFollowingProgress: (userId: number, isFetching: boolean) => void*/


}
export type UsersContainerType = mapStateToPropsType & mapDispatchToProsType

const mapStateToProps = (state: AppRootSTateType): mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress
    }
}

export default connect(mapStateToProps, {
    setCurrentPage,
    setUsersTC,
    followTC,
    unfollowTC
/*    follow,*/
/*    unfollow,*/
/*    setUsers,*/
/*    setTotalCount,*/
/*    toggleIsFetching,*/
/*    toggleIsFollowingProgress,*/
})
(UsersContainerClass)


/*const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToProsType => {
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
        setTotalCount: (totalUsersCount: number) => {
            dispatch(setTotalCountAC(totalUsersCount))
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    }
}*/