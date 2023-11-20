import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import {Post} from './Post/Post';
import {addPostAC,  updateNewPostTextAC} from '../../../redux/profileReducer';
import {AllActionTypes} from '../../../redux/store';
import {MyPostsContainerPropsType} from './MyPostsContainer';


/*export type MyPostsType = {
    posts: PostsDataType[]
    newPostText: string
    updateNewPostText: (text:string) => void
    addPost:()=>void
}*/
/*export type PostsDataType = {
    id: number
    message: string
    likesCount: number
}*/


export const MyPosts = (props: MyPostsContainerPropsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)

    const onAddPost = () =>{
        props.addPost()
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value
        props.updateNewPostText(text)

    }

    return (
        <div className={s.postsBlock}><h3>My posts</h3>
            <div>
                <div>
                    <textarea value={props.newPostText} onChange={onPostChange}></textarea>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>

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