import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store, { StoreType} from './redux/reduxStore'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

/*const rerenderEntireTree = (state: StoreType) => {*/
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
/*}*/


/*store.subscribe(() => {
/!*    let state = store.getState() //чтобы вызвал обновленный стейт*!/
    rerenderEntireTree(store)
/!*    rerenderEntireTree(state)*!/
})*/
/*rerenderEntireTree(store); // функ из стейта, которой отдали коллбеком rerenderEntireTree. Мы ее создали, чтобы в store.ts не было ни одного импорта(соответственно, чтоб не было зацикленности)*/
/*rerenderEntireTree(store.getState()); // функ из стейта, которой отдали коллбеком rerenderEntireTree. Мы ее создали, чтобы в store.ts не было ни одного импорта(соответственно, чтоб не было зацикленности)*/
