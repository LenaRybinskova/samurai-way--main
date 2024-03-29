import React from 'react';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {followTC, setCurrentPage, setUsersTC, unfollowTC, UserType} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose} from 'redux';


// 2я контейнерная компонента, которая обращ к АПИ
class UsersContainerClass extends React.Component<UsersContainerType> {

    componentDidMount() {
        this.props.setUsersTC(this.props.currentPage,this.props.pageSize)
    }

    onPageChanged(pageNumber: number) {
        this.props.setUsersTC(pageNumber,this.props.pageSize)
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
                       followingProgress={this.props.followingProgress}
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

const withRedirect = WithAuthRedirect<UsersContainerType>(UsersContainerClass)

connect(mapStateToProps, {
    setCurrentPage,
    setUsersTC,
    followTC,
    unfollowTC
})
(withRedirect)

export default compose<React.ComponentType>(connect(mapStateToProps, {
    setCurrentPage,
    setUsersTC,
    followTC,
    unfollowTC
}) , withRedirect,WithAuthRedirect)(UsersContainerClass)


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