import React from "react";
import {MyPosts} from "./MyPosts/MyPosts";
import s from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostType, ProfilePageType} from '../../redux/state';



export type ProfileType={
    state:ProfilePageType
    addPost:(text:string)=>void
}
export const Profile = (props:ProfileType) => {


    return (
        <div >Main content
            <ProfileInfo/>
            <MyPosts posts={props.state.posts} addPost={props.addPost}/>
        </div>
    )
}
