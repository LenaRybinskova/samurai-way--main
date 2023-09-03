import React from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {AllActionTypes} from '../../redux/store';
import {ProfilePageType} from '../../redux/profileReducer';


export type ProfileType = {
    profilePage: ProfilePageType //аналог initialStateType из profileReducer.ts
    dispatch: (action: AllActionTypes) => void
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
