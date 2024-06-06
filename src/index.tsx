import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SamuraiJSApp from './App'

/*const rerenderEntireTree = (state: StoreType) => {*/
ReactDOM.render(
    <SamuraiJSApp/>,
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
