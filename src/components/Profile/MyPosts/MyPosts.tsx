import React, {ChangeEvent, LegacyRef, MouseEvent} from 'react';
import s from './MyPosts.module.css'
import {Post} from './Post/Post';
/*import {updateNewPostText} from '../../../redux/state';*/


export type MyPostsType = {
    posts: PostsDataType[]
    newPostText: string
    addPost: () => void
    updateNewPostText: (text: string) => void
}
export type PostsDataType = {
    id: number
    message: string
    likesCount: number
}


export const MyPosts = (props: MyPostsType) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)


    const addPost = () => props.addPost()


    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)
    }

    return (
        <div className={s.postsBlock}><h3>My posts</h3>
            <div>
                <div>
                    <textarea value={props.newPostText} onChange={onPostChange}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
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