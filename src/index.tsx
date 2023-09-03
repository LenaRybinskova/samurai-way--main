import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store, {AppRootSTateType} from './redux/reduxStore'
import {BrowserRouter} from 'react-router-dom';


// этой функ нужен глоб стейт чтобы отрисовать приложение
const rerenderEntireTree = (state: AppRootSTateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App store={store} dispatch={store.dispatch.bind(store)}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}


store.subscribe(() => {
    let state = store.getState() //чтобы вызвал обновленный стейт
    rerenderEntireTree(state)
})
rerenderEntireTree(store.getState()); // функ из стейта, которой отдали коллбеком rerenderEntireTree. Мы ее создали, чтобы в store.ts не было ни одного импорта(соответственно, чтоб не было зацикленности)