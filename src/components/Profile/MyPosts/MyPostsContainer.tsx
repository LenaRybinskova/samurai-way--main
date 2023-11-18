import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import {Post} from './Post/Post';
import {addPostAC, updateNewPostTextAC} from '../../../redux/profileReducer';
import {AllActionTypes} from '../../../redux/store';
import {MyPosts, PostsDataType} from './MyPosts';
import {StoreType} from '../../../redux/reduxStore';


export type MyPostsType = {
    store:StoreType
}


export const MyPostsContainer = (props: MyPostsType) => {

    let state=props.store.getState()

    const addPost = () => {
        props.store.dispatch(addPostAC())
    }

    const onPostChange = (text: string) => {
        const action = updateNewPostTextAC(text)
        props.store.dispatch(action)
    }

    return (
        <MyPosts
            updateNewPostText={onPostChange} addPost={addPost}
            posts={state.profilePage.posts}
            newPostText={state.profilePage.newPostText}
            />
    )


}


/*   //1 вариант
    const addPost = () => {
            alert(newPostElement.current?.value) // если вдруг такой ссылки на ТексЭрия не будет и Реакт вернет null undefined и не будет брать value
    }

    //2 вариант
    const addPost2 = () => {
        if(newPostElement.current)
        alert(newPostElement.current.value)
    }

    //3 вариант
    const addPost3 = () => {
            alert(newPostElement.current && newPostElement.current.value)
    }*/


/*    const newPostElement = React.createRef<HTMLTextAreaElement>()*/ // теперь через евент проще сделать, чем вещать хук реф