import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {ResponseAPIProfileType, setUserProfile} from '../../redux/profileReducer';
import {toggleIsFetching} from '../../redux/usersReducer';
import {Profile} from './Profile';
import {RouteComponentProps, withRouter} from 'react-router-dom';

//2
class ProfileContainer extends React.Component<OwnPropsType> {

    componentDidMount() {
// вытаскивает ИД из текущего УРЛ и диспатчит в редакс стор
        let userId=this.props.match.params.userId
        if(!userId){userId="2"}
        // делаем запрос на сервер за профилем по этому ИД
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
            // диспатчим данные в стейт и mstp потом увидит изм стейта и Профайл перерисуется.
            this.props.setUserProfile(response.data)
        })
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

//1
type MapDispatchToProsType = {
    setUserProfile: (profile: ResponseAPIProfileType | null) => void
    toggleIsFetching: (isFetching: boolean) => void
}
type MapStateToPropsType = { profile: ResponseAPIProfileType | null }
type ProfileContainerType = MapDispatchToProsType & MapStateToPropsType
type PathParamsType={
    userId:string
}
// вытащили типы из RouteComponentProps и свои типы для контейнерной компоненты добавили
type OwnPropsType=RouteComponentProps<PathParamsType> & ProfileContainerType

const mapStateToProps = (state: AppRootSTateType): MapStateToPropsType => {
    return {profile: state.profilePage.profile}
}

//3 контейнерная компонента для отслеж УРЛ
const withURLDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile, toggleIsFetching})(withURLDataContainerComponent)