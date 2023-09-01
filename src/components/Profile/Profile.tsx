import React from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import s from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {
    ActionsTypes,
    AddPostActionType,
    PostType,
    ProfilePageType,
    UpdateNewPostTextActionType
} from '../../redux/state';


export type ProfileType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsTypes) => void
}
export const Profile = (props: ProfileType) => {

    return (
        <div>Main content
            <ProfileInfo/>
            <MyPosts
                posts={props.profilePage.posts}
                newPostText={props.profilePage.newPostText}
                dispatch={props.dispatch}
            />
        </div>
    )
}
