import React from 'react'
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ResponseAPIProfileType} from '../../redux/profileReducer';




export type ProfileType = {
    //setUserProfile и toggleIsFetching считаются "транзитными" их не надо типизировать, тк непосредственно в Profile они не используются
    profile:ResponseAPIProfileType  | null
    updateProfileStatusTC:(newStatus:string)=> void
    profileStatus:string


}
export const Profile = (props: ProfileType) => {
    return (
        <div>Main content
            <ProfileInfo profile={props.profile} updateProfileStatusTC={props.updateProfileStatusTC} profileStatus={props.profileStatus} />
            <MyPostsContainer/>
        </div>
    )
}
