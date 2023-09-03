import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import {StoreType} from './redux/reduxStore';
import {AllActionTypes} from './redux/store';


export type AppType = {
    store: StoreType
    dispatch: (action: AllActionTypes) => void
}

function App(props: AppType) {

    const state = props.store.getState() // весь стейт вытащили

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar state={state.sideBar}/>
            <div className="appWrapperContent">
                <Route exact path={'/dialogs'} render={() => <Dialogs store={props.store}/>}/>
                <Route exact path={'/profile'}
                       render={() => <Profile profilePage={state.profilePage} dispatch={props.dispatch}/>}/>
            </div>
        </div>
    );
}

export default App;

