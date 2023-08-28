import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state, {addPost, RootStateType, subscribe, updateNewPostText} from './redux/state'
import {BrowserRouter} from 'react-router-dom';


// этой функ нужен глоб стейт чтобы отрисовать приложение
const rerenderEntireTree = (state:RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

rerenderEntireTree(state);
subscribe(rerenderEntireTree) // функ из стейта, которой отдали коллбеком rerenderEntireTree. Мы ее создали, чтобы в state.ts не было ни одного импорта(соответственно, чтоб не было зацикленности)