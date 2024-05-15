import React from 'react';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {Route, withRouter} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import {connect} from 'react-redux';
import {getAuthUserDataTC} from '../src/redux/auth-reducer';
import {compose} from 'redux';
import {initializedAppTC} from '../src/redux/app-reducer';


class App extends React.Component<CommonType> {

    componentDidMount() {
        this.props.getAuthUserDataTC()
    }
    render() {
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="appWrapperContent">
                    <Route exact path={'/dialogs'} render={() => <DialogsContainer/>}/>
                    <Route exact path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                    <Route exact path={'/users'} render={() => <UsersContainer/>}/>
                    <Route exact path={'/login'} render={() => <Login/>}/>

                </div>
            </div>
        )
    }
}

type mapDispatchToPropsType = {
    getAuthUserDataTC: () => void
    initializedAppTC:() => void
}
type CommonType = mapDispatchToPropsType

export default compose(
    withRouter,
    connect(null, {getAuthUserDataTC,initializedAppTC}))(App)

