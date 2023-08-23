import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import state, {StateType} from './redux/state';

export type AppType={
    state:StateType
}

/*// делала сама, Димыч делал все через render={()=>{}}
const RenderComponentDialogs =(dialogs:DialogsType[],messages:MessageType[] )=>{
    return <Dialogs dialogs={dialogs} messages={messages}/>
}*/


function App(props:AppType) {

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route exact path={'/dialogs'} render={()=><Dialogs state={props.state.dialogsPage}/>}/>
                    <Route exact path={'/profile'} render={()=><Profile state={props.state.profilePage}/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

{/*                    // тк тут в компоненту нельзя добавить атрибуты и передать пропсы, используем для Route атрибут
                    render
                    <Route exact path={'/dialogs'} component={Dialogs}/>
                    <Route path={'/profile'} component={Profile}/>

{/*                    <Route exact path={'/dialogs'} component={RenderComponentDialogs}/>*/}