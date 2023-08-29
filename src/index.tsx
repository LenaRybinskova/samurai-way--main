import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store, {RootStateType, StoreType} from './redux/state'
import {BrowserRouter} from 'react-router-dom';


// этой функ нужен глоб стейт чтобы отрисовать приложение
const rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App store={store} addPost={store.addPost.bind(store)} updateNewPostText={store.updateNewPostText.bind(store)}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}


rerenderEntireTree(); //отрисовка Арр

store.subscribe(rerenderEntireTree) // функ из стейта, которой отдали коллбеком rerenderEntireTree. Мы ее создали, чтобы в state.ts не было ни одного импорта(соответственно, чтоб не было зацикленности)

