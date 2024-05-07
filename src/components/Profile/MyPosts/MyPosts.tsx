import React from 'react';
import s from './MyPosts.module.css'
import {Post} from './Post/Post';
import {MyPostsContainerPropsType} from './MyPostsContainer';
import AddNewPost, {InputFormType} from '../AddNewPost/AddNewPost';


export const MyPosts = (props: MyPostsContainerPropsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    const addPost = (data: InputFormType) => {
        console.log('text ', data)
        props.addPost(data.newPostText)
    }

    return (
        <div className={s.postsBlock}><h3>My posts</h3>
            <div>
                <AddNewPost onSubmit={addPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>

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