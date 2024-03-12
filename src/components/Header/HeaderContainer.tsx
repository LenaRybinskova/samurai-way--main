import React from 'react';
import {Header} from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import { setAuthUserData} from '../../redux/auth-reducer';


class HeaderContainer extends React.Component<CommonType> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.1/auth/me', {withCredentials: true}).then(res => {
                if (res.data.resultCode === 0) {
                    let {id, login, email} = res.data.data
                    this.props.setAuthUserData(id, email, login)}})}
    render() {
        return <Header {...this.props} />
    }
}

type CommonType = MapStateToPropsType & mapDispatchToPropsType
type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type mapDispatchToPropsType = {
    setAuthUserData: (userId: string, email: string, login: string) => void
}
const mapStateToProps = (state: AppRootSTateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)