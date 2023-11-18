import React from 'react';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {AllActionTypes} from '../../redux/store';
import {ProfilePageType} from '../../redux/profileReducer';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {StoreType} from '../../redux/reduxStore';


export type ProfileType = {
    store: StoreType //аналог initialStateType из profileReducer.ts

}
export const Profile = (props: ProfileType) => {

    return (
        <div>Main content
            <ProfileInfo/>
            <MyPostsContainer store={props.store}
            />
        </div>
    )
}
