import React from 'react'
import {ObtainedFormType, ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ResponseAPIProfileType} from '../../redux/profileReducer';




export type ProfileType = {
    //setUserProfile и toggleIsFetching считаются "транзитными" их не надо типизировать, тк непосредственно в Profile они не используются
    profile:ResponseAPIProfileType  | null
    updateProfileStatusTC:(newStatus:string)=> void
    profileStatus:string
    isOwner:boolean
    savePhoto:(file: File) => void
    saveProfile:(formData: ObtainedFormType)=>void

}
export const Profile = (props: ProfileType) => {
    return (
        <div>Main content
            <ProfileInfo profile={props.profile} profileStatus={props.profileStatus} updateProfileStatusTC={props.updateProfileStatusTC} isOwner={props.isOwner} savePhoto={props.savePhoto} saveProfile={props.saveProfile}/>
            <MyPostsContainer/>
        </div>
    )
}
