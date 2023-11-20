import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Route} from 'react-router-dom';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';



export type AppType = {
}

function App(props: AppType) {

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="appWrapperContent">
                <Route exact path={'/dialogs'} render={() => <DialogsContainer/>}/>
                <Route exact path={'/profile'} render={() => <Profile/>}/>
            </div>
        </div>
    );
}

export default App;

