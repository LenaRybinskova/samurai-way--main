import React from 'react';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {Route} from 'react-router-dom';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';


function App() {

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
    );
}

export default App;

