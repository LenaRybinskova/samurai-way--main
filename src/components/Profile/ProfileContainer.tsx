import React from 'react';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {
    getUserProfileTC,
    getUserStatusTC,
    ResponseAPIProfileType,
    updateProfileStatusTC
} from '../../redux/profileReducer';
import {toggleIsFetching} from '../../redux/usersReducer';
import {Profile} from './Profile';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose} from 'redux';


class ProfileContainer extends React.Component<OwnPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId //string
        if (!userId) {
            userId = '30404'
        }
        this.props.getUserProfileTC(Number(userId))
        this.props.getUserStatusTC(Number(userId))
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} updateProfileStatusTC={this.props.updateProfileStatusTC} profileStatus={this.props.profileStatus}/>
    }
}

type MapDispatchToProsType = {
    toggleIsFetching: (isFetching: boolean) => void
    getUserProfileTC: (userId: number) => void
    getUserStatusTC : (userId: number) =>void
    updateProfileStatusTC:(newStatus:string)=> void
}
type MapStateToPropsType = {
    profile: ResponseAPIProfileType | null,
    profileStatus:string
}
type ProfileContainerType = MapDispatchToProsType & MapStateToPropsType
type PathParamsType = {
    userId: string
}
// вытащили типы из RouteComponentProps и свои типы для контейнерной компоненты добавили
type OwnPropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

const mapStateToProps = (state: AppRootSTateType): MapStateToPropsType => {
    return {profile: state.profilePage.profile,
    profileStatus:state.profilePage.profileStatus}
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {toggleIsFetching, getUserProfileTC,getUserStatusTC, updateProfileStatusTC}) ,
    withRouter,
    WithAuthRedirect)
(ProfileContainer)
