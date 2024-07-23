import React, {lazy} from 'react';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {HashRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {getAuthUserDataTC} from '../src/redux/auth-reducer';
import {compose} from 'redux';
import {initializedAppTC} from '../src/redux/app-reducer';
import {AppRootSTateType} from '../src/redux/reduxStore';
import Preloader from '../src/components/common/preloader/Preloader';
import store from './redux/reduxStore';
import {WithSuspense} from './hoc/WithSuspense';
import Subscribers from '../src/components/Subscribers/Subscribers';
import ThemeProvider from '../src/context/ThemeProvider';
import Settings from '../src/components/Settings/Settings';
import GlobalError from '../src/components/GlobalError/GlobalError';
/*import DialogsContainer from './components/Dialogs/DialogsContainer';*/
/*import ProfileContainer from './components/Profile/ProfileContainer';*/

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));


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
            <div className="appWrapper">
                <GlobalError />
                <HeaderContainer/>
                <div className={"appMainWrapper"}>
                    <div className={"appWrapperLeftSide"}>
                        <nav><Navbar/></nav>
                        <Subscribers/>
                    </div>
                    <div className="appWrapperContent">
                        <Switch>
                            <Route exact path={'/'}
                                   render={() => <Redirect to={'profile'}/>}/> {/*со старта дб Профайл*/}
                            <Route path={'/dialogs/:userId?'} render={WithSuspense(DialogsContainer)}/>
                            <Route path={'/users'} render={() => <UsersContainer/>}/>
                            {<Route path={'/profile/:userId?'} render={WithSuspense(ProfileContainer)}/>}
                            {/*   <Route exact path={'/profile/:userId?'} render={() => {return <React.Suspense fallback={<div>Loading ...</div>}><ProfileContainer/></React.Suspense>}}/>*/}
                            <Route path={'/login'} render={() => <Login/>}/>
                            <Route path={'/settings'} render={() => <Settings/>}/>
                            <Route path={'*'} render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </div>
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

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {
        getAuthUserDataTC, initializedAppTC
    }))(App) as React.ComponentClass


const SamuraiJSApp = (props: any) => {
    return (
        <HashRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <ThemeProvider>
                    <AppContainer/>
                </ThemeProvider>
            </Provider>
        </HashRouter>
    )
}

export default SamuraiJSApp;