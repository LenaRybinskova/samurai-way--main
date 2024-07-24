import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {logoutTC} from '../../redux/auth-reducer';


class HeaderContainer extends React.Component<CommonType> {

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
    logoutTC: () => void
}
const mapStateToProps = (state: AppRootSTateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {logoutTC})(HeaderContainer)