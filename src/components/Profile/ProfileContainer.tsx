import React from 'react';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {
    getUserProfileTC,
    getUserStatusTC,
    ResponseAPIProfileType, savePhoto,
    saveProfile,
    updateProfileStatusTC
} from '../../redux/profileReducer';
import {toggleIsFetching} from '../../redux/usersReducer';
import {Profile} from './Profile';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose} from 'redux';
import {ObtainedFormType} from "./ProfileInfo/ProfileInfo";



class ProfileContainer extends React.Component<OwnPropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId //string
        if (!userId) {
            userId = this.props.authorizedUserId + ''
            if (!userId) {
                this.props.history.push('/login')// через history.push делаем редирект, если нет куки и в стейте не присвоен userId
            }
        }
        this.props.getUserProfileTC(Number(userId))
        this.props.getUserStatusTC(Number(userId))
    }

    // чтобы при перех на др юзера он отобр, а перех на Профайл отобр всегда мой
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<OwnPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        //если ИД в УРЛЕ изменился, то рефреш профайла
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}
                        updateProfileStatusTC={this.props.updateProfileStatusTC}
                        profileStatus={this.props.profileStatus}
                        isOwner={!this.props.match.params.userId}
                        savePhoto={this.props.savePhoto} saveProfile={this.props.saveProfile}/>
    }
}

type MapDispatchToProsType = {
    toggleIsFetching: (isFetching: boolean) => void
    getUserProfileTC: (userId: number) => void //убрала |null
    getUserStatusTC: (userId: number) => void
    updateProfileStatusTC: (newStatus: string) => void
    savePhoto: (photo: any) => void
    saveProfile: (formData: ObtainedFormType) => Promise<void>
}
type MapStateToPropsType = {
    profile: ResponseAPIProfileType | null,
    profileStatus: string
    authorizedUserId: string | null
    isAuth: boolean
}
type ProfileContainerType = MapDispatchToProsType & MapStateToPropsType
type PathParamsType = {
    userId: string
}
// вытащили типы из RouteComponentProps и свои типы для контейнерной компоненты добавили
type OwnPropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

const mapStateToProps = (state: AppRootSTateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        profileStatus: state.profilePage.profileStatus,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        toggleIsFetching,
        getUserProfileTC,
        getUserStatusTC,
        updateProfileStatusTC,
        savePhoto,
        saveProfile
    }),
    withRouter,
    WithAuthRedirect)
(ProfileContainer)
