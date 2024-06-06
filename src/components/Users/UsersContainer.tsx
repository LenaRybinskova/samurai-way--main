import React from 'react';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {followTC, requestUsersTC, setCurrentPage, unfollowTC, UserType} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUserSelector
} from '../../redux/users-selectors';


// 2я контейнерная компонента, которая обращ к АПИ
class UsersContainerClass extends React.Component<UsersContainerType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.setUsersTC(currentPage, pageSize)
    }

    onPageChanged(pageNumber: number) {
        const {pageSize} = this.props
        this.props.setUsersTC(pageNumber, pageSize)
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
    setUsersTC: (currentPage: number, pageSize: number) => void
    followTC: (userId: number) => void
    unfollowTC: (userId: number) => void


}
export type UsersContainerType = mapStateToPropsType & mapDispatchToProsType

const mapStateToProps = (state: AppRootSTateType): mapStateToPropsType => {
    return {
        users: getUserSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state)
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, {
        setCurrentPage,
        setUsersTC: requestUsersTC,
        followTC,
        unfollowTC
    }),
)(UsersContainerClass)
