import React from 'react';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import {connect, Provider} from 'react-redux';
import {getAuthUserDataTC} from '../src/redux/auth-reducer';
import {compose} from 'redux';
import {initializedAppTC} from '../src/redux/app-reducer';
import {AppRootSTateType} from '../src/redux/reduxStore';
import Preloader from '../src/components/common/preloader/Preloader';
import store from './redux/reduxStore';


class App extends React.Component<CommonType> {

    componentDidMount() {
        this.props.initializedAppTC()
    }

    render() {
        {
            if (!this.props.initialized) {
                return <Preloader/>
            }
        }
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
    initializedAppTC: () => void
}
type mapStateToPropsType = {
    initialized: boolean
}
type CommonType = mapDispatchToPropsType & mapStateToPropsType
const mapStateToProps = (state: AppRootSTateType): mapStateToPropsType => {
    return {
        initialized: state.app.initialized,
    }
}

const AppContainer= compose(
    withRouter,
    connect(mapStateToProps, {getAuthUserDataTC, initializedAppTC}))(App) as React.ComponentClass


const SamuraiJSApp=(props:any)=>{
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer  />
            </Provider>
        </BrowserRouter>
    )
}

export default SamuraiJSApp;