import React from 'react';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {getUserProfileTC, ResponseAPIProfileType, setUserProfile} from '../../redux/profileReducer';
import {toggleIsFetching} from '../../redux/usersReducer';
import {Profile} from './Profile';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';


//2
class ProfileContainer extends React.Component<OwnPropsType> {

    componentDidMount() {
        let userId=this.props.match.params.userId //string
        if(!userId){userId="2"}
        this.props.getUserProfileTC(Number(userId))
    }

    render() {
        if(!this.props.isAuth){
            return <Redirect to={"/login"}/>
        }
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

//1
type MapDispatchToProsType = {
    toggleIsFetching: (isFetching: boolean) => void
    getUserProfileTC:(userId:number)=>void
}
type MapStateToPropsType = { profile: ResponseAPIProfileType | null,
    isAuth:boolean
}
type ProfileContainerType = MapDispatchToProsType & MapStateToPropsType
type PathParamsType={
    userId:string
}
// вытащили типы из RouteComponentProps и свои типы для контейнерной компоненты добавили
type OwnPropsType=RouteComponentProps<PathParamsType> & ProfileContainerType

const mapStateToProps = (state: AppRootSTateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth:state.auth.isAuth
    }
}

//3 контейнерная компонента для отслеж УРЛ
const withURLDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {/*setUserProfile,*/ toggleIsFetching, getUserProfileTC})(withURLDataContainerComponent)