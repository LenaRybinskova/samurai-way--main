import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {ResponseAPIProfileType, setUserProfile} from '../../redux/profileReducer';
import {toggleIsFetching} from '../../redux/usersReducer';
import {Profile} from './Profile';

//ProfineContainet контейнерная компонента
// класс компонента это объект, который получаем за счет extends React.Component, котрый получает метод рендер и методы жизн цикла с помощью которых Реакт взаимодействует с этим объектом(Монтирование, апдейт, удаление компоненты и тд)
//2
class ProfileContainer extends React.Component<ProfileContainerType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
            this.props.setUserProfile(response.data)
        })
    }

    render() {
        return (
            //Profile чистая презентационная компонента
            //{...this.props} через Профайл пробросим все пропсы для дочерних в Profile их можно не типизировать, они чисто транзитные
            // profile={this.props.profile} а это чисто для профайла пропс
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}


//1
type MapDispatchToProsType = {
    setUserProfile: (profile: ResponseAPIProfileType | null) => void
    toggleIsFetching: (isFetching: boolean) => void
}
type MapStateToPropsType = {
    profile: ResponseAPIProfileType | null
}
type ProfileContainerType = MapDispatchToProsType & MapStateToPropsType

const mapStateToProps = (state: AppRootSTateType): MapStateToPropsType => {
    return {profile: state.profilePage.profile}
}

export default connect(mapStateToProps, {setUserProfile, toggleIsFetching})(ProfileContainer)