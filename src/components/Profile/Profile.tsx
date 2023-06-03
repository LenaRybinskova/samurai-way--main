import React from "react";
import s from "./Profile.module.css"
import {MyPosts} from "./MyPosts/MyPosts";

export const Profile = () => {
    return (
        <div className={s.content}>Main content
            <div>
                <img
                    src="https://mobimg.b-cdn.net/v3/fetch/fe/fe9778a706308a25d2e6143e7bce5207.jpeg" alt=""/>
            </div>
            <div>ava+description</div>
            <MyPosts/>
        </div>
    )
}
