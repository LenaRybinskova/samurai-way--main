import React from 'react';
import s from './MyPosts.module.css'
import {Post} from './Post/Post';

export const MyPosts = () => {

    let postsData = [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Its my first post', likesCount: 0}
    ]
    let postsElements = postsData.map(p => <Post likesCount={p.likesCount}/>)

    return (
        <div className={s.postsBlock}><h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>

            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>

    )
}
