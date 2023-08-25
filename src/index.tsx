import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state, {addPost} from './redux/state'
import {BrowserRouter} from 'react-router-dom';
import {rerenderEntireTree} from './render';

/*export type DialogsType ={
    id:number
    name: string
}

export type MessageType={
    id:number
    message: string
}

export type PostsDataType={
    id:number
    message:string
    likesCount:number
}

let dialogs: DialogsType[] = [
    {id: 1, name: 'Sasha'},
    {id: 2, name: 'Dima'},
    {id: 3, name: 'Vera'},
    {id: 4, name: 'Anna'}
]

let messages: MessageType[] = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'fine'},
    {id: 4, message: 'smthng'}
]

let postsData:PostsDataType[] = [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: 'Its my first post', likesCount: 0}
]*/

/*const rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App addPost={addPost}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}*/

rerenderEntireTree(state);

