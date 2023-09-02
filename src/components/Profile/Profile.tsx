import React from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {AllActionTypes, DialogsPageType, ProfilePageType} from '../../redux/state';
import {DialogsReducerAcTypes} from '../../redux/DialogsReducer';
import {ProfileReducerAcTypes} from '../../redux/ProfileReducer';


export type ProfileType = {
    profilePage: ProfilePageType
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
