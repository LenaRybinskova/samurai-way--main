import React from "react";
import s from "./MyPosts.module.css"
import {Post} from "./Post/Post";

export const MyPosts = () => {
    return (

        <div>My posts
            <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>
            <div className={s.posts}>
                <Post message="Hi, how are you?" likesCount={20}/>
                <Post message="Its my first post" likesCount={0}/>
            </div>
        </div>

    )
}
