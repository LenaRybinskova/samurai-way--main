import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state, {addPost, RootStateType, updateNewPostText} from './redux/state'
import {BrowserRouter} from 'react-router-dom';

// этой функ нужен глоб стейт чтобы отрисовать приложение
export const rerenderEntireTree = (globalState:RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={globalState} addPost={addPost} updateNewPostText={updateNewPostText} />
        </BrowserRouter>,
        document.getElementById('root')
    );
}




