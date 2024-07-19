import React from 'react'
import {ObtainedFormType, ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ProfileResaponseType} from '../../redux/profileReducer';
import s from '../Profile/Profile.module.css'


export type ProfileType = {
    //setUserProfile и toggleIsFetching считаются "транзитными" их не надо типизировать, тк непосредственно в Profile они не используются
    profile: ProfileResaponseType | null
    updateProfileStatusTC: (newStatus: string) => void
    profileStatus: string
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ObtainedFormType) => Promise<void>

}
export const Profile = (props: ProfileType) => {

    return (
        <div className={s.profileContainer}>
            <ProfileInfo profile={props.profile} profileStatus={props.profileStatus}
                         updateProfileStatusTC={props.updateProfileStatusTC} isOwner={props.isOwner}
                         savePhoto={props.savePhoto} saveProfile={props.saveProfile}/>
            {props.isOwner && <MyPostsContainer/>}
        </div>
    )
}
