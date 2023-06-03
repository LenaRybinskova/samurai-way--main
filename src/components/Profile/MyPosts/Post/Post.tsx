import React from "react";
import s from "./Post.module.css"

type PostType={
    message?: string
}

export const Post: React.FC<PostType> = (props) => {
    return (
        <div className={s.item}>
            <img src="https://as2.ftcdn.net/v2/jpg/01/88/16/11/1000_F_188161181_ECXsk62DZLJR611UniB6oScNJsyZVEdZ.jpg"/>
            {props.message}
            <div><span>Like</span></div>
        </div>
    )
}
