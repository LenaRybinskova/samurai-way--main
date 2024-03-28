import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {authMeTC, setAuthUserData} from '../../redux/auth-reducer';


class HeaderContainer extends React.Component<CommonType> {

    componentDidMount() {
        this.props.authMeTC()
/*        axios.get('https://social-network.samuraijs.com/api/1.1/auth/me', {withCredentials: true}).then(res => {
                if (res.data.resultCode === 0) {
                    let {id, login, email} = res.data.data
                    this.props.setAuthUserData(id, email, login)}})*/
    }

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
/*    setAuthUserData: (userId: string, email: string, login: string) => void*/
    authMeTC:()=>void
}
const mapStateToProps = (state: AppRootSTateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {/*setAuthUserData,*/authMeTC})(HeaderContainer)