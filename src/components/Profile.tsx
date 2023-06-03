import React from "react";
import s from "./Profile.module.css"

export const Profile = () => {
    return (
        <div className={s.content}>Main content
            <div>
                <img
                    src="https://mobimg.b-cdn.net/v3/fetch/fe/fe9778a706308a25d2e6143e7bce5207.jpeg" alt=""/>
            </div>
            <div>ava+description</div>
            <div>my-posts
                <div>new post</div>
            </div>
            <div className={s.posts}>
                <div className={s.item}>post1</div>
                <div className={`${s.item} ${s.active}`}>post2</div>
            </div>
        </div>
    )
}
