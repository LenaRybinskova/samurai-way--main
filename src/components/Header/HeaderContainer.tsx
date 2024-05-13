import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {AppRootSTateType} from '../../redux/reduxStore';
import {getAuthUserDataTC, logoutTC} from '../../redux/auth-reducer';


class HeaderContainer extends React.Component<CommonType> {

    componentDidMount() {
        this.props.getAuthUserDataTC()
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
    getAuthUserDataTC: () => void
    logoutTC: () => void
}
const mapStateToProps = (state: AppRootSTateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {getAuthUserDataTC, logoutTC})(HeaderContainer)