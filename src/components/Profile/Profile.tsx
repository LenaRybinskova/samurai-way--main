import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import s from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';

export const Profile = () => {
    return (
        <div >Main content
            <ProfileInfo/>
            <MyPosts/>
        </div>
    )
}
