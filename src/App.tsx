import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import state, {ActionsTypes, AddPostActionType, StoreType, UpdateNewPostTextActionType} from './redux/state';
import store from './redux/state';

export type AppType = {
    store: StoreType
    dispatch: (action: ActionsTypes) => void
}


function App(props: AppType) {

    const state = props.store.getState() // весь стейт вытащили

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar state={state.sideBar}/>
            <div className="appWrapperContent">
                <Route exact path={'/dialogs'} render={() => <Dialogs store={props.store} />}/>
                <Route exact path={'/profile'}
                       render={() => <Profile profilePage={state.profilePage} dispatch={props.dispatch}/>}/>
            </div>
        </div>
    );
}

export default App;

{/*                    // тк тут в компоненту нельзя добавить атрибуты и передать пропсы, используем для Route атрибут
                    render
                    <Route exact path={'/dialogs'} component={Dialogs}/>
                    <Route path={'/profile'} component={Profile}/>

{/*                    <Route exact path={'/dialogs'} component={RenderComponentDialogs}/>*/
}


/*// делала сама, Димыч делал все через render={()=>{}}
const RenderComponentDialogs =(dialogs:DialogsType[],messages:MessageType[] )=>{
    return <Dialogs dialogs={dialogs} messages={messages}/>
}*/