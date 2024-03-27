import React from 'react';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {
    follow,
    setCurrentPage,
    setTotalCount,
    setUsers,
    toggleIsFetching, toggleIsFollowingProgress,
    unfollow,
    UserType
} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
import {userAPI} from '../../api/api';


// 2я контейнерная компонента, которая обращ к АПИ
class UsersContainerClass extends React.Component<UsersContainerType> {

    componentDidMount() {
        // со старта приложения, запрос идет этот и подгружает пользователей и totalCount пользователей
        this.props.toggleIsFetching(true)//крутилка вкл
        userAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.setUsers(data.items)
            this.props.setTotalCount(data.totalCount)
            this.props.toggleIsFetching(false) //крутилка выкл
        })
    }

    onPageChanged(pageNumber: number) {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)  //крутилка вкл

        userAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)  //крутилка выкл
            this.props.setUsers(data.items)
        })
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
                       unfollow={this.props.unfollow}
                       follow={this.props.follow}
                       followingProgress={this.props.followingProgress}
                    //обернула в стрел чтобы не потерялся контекст
                       toggleIsFollowingProgress={(userId,isFetching)=>this.props.toggleIsFollowingProgress(userId,isFetching )}
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
    follow: (id: number) => void
    unfollow: (id: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleIsFollowingProgress: (userId:number,isFetching:boolean) => void
}
export type UsersContainerType = mapStateToPropsType & mapDispatchToProsType

const mapStateToProps = (state: AppRootSTateType): mapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress:state.usersPage.followingProgress
    }
}

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

//
export default connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalCount, toggleIsFetching,toggleIsFollowingProgress})
(UsersContainerClass)


