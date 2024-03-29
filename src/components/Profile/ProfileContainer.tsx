import React from 'react';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {getUserProfileTC, ResponseAPIProfileType} from '../../redux/profileReducer';
import {toggleIsFetching} from '../../redux/usersReducer';
import {Profile} from './Profile';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {WithAuthRedirect} from '../../hoc/WithAuthRedirect';
import {compose} from 'redux';


class ProfileContainer extends React.Component<OwnPropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId //string
        if (!userId) {
            userId = '2'
        }
        this.props.getUserProfileTC(Number(userId))
    }
    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

type MapDispatchToProsType = {
    toggleIsFetching: (isFetching: boolean) => void
    getUserProfileTC: (userId: number) => void
}
type MapStateToPropsType = {
    profile: ResponseAPIProfileType | null,
/*    isAuth: boolean*/
}
type ProfileContainerType = MapDispatchToProsType & MapStateToPropsType
type PathParamsType = {
    userId: string
}
// вытащили типы из RouteComponentProps и свои типы для контейнерной компоненты добавили
type OwnPropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

const mapStateToProps = (state: AppRootSTateType): MapStateToPropsType => {
    return {profile: state.profilePage.profile,}
}

/*//HOC
const AuthRedirectComponent=WithAuthRedirect<OwnPropsType>(ProfileContainer)
/!*const AuthRedirectComponent = (props: OwnPropsType) => {
    if (!props.isAuth) {
        return <Redirect to={'/login'}/>
    }
    return <ProfileContainer {...props}/>
}*!/


//3 контейнерная компонента для отслеж УРЛ
const withURLDataContainerComponent = withRouter(AuthRedirectComponent)

export default  connect(mapStateToProps, {toggleIsFetching, getUserProfileTC
})(withURLDataContainerComponent)*/
export default compose<React.ComponentType>(
    connect(mapStateToProps, {toggleIsFetching, getUserProfileTC}) ,
    withRouter,
    WithAuthRedirect)
(ProfileContainer)
