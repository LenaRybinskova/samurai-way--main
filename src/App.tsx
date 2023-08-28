import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import state, {RootStateType, updateNewPostText} from './redux/state';

export type AppType = {
    state: RootStateType
    addPost:()=>void
    updateNewPostText:(text:string)=>void
}


function App(props:AppType) {

    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar state={props.state.sideBar}/>
            <div className="appWrapperContent">
                <Route exact path={'/dialogs'} render={() => <Dialogs state={props.state.dialogsPage}/>}/>
                <Route exact path={'/profile'} render={() => <Profile profilePage={props.state.profilePage} addPost={props.addPost} updateNewPostText={props.updateNewPostText}/>}/>
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