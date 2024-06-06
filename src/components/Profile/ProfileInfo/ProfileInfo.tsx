import React, {FC} from 'react';
import s from './ProfilInfo.module.css'
import {ResponseAPIProfileType} from '../../../redux/profileReducer';
import Preloader from '../../common/preloader/Preloader';
import UserPhotoNull from '../../../assets/images/usersNull.png'
import ProfileStatusWithHooks from '../ProfileInfo/ProfileStatus/ProfileStatusWithHooks';


export type ProfileInfoType = {
    profile: ResponseAPIProfileType | null
    updateProfileStatusTC: (newStatus: string) => void
    profileStatus: string
}

export const ProfileInfo: FC<ProfileInfoType> = ({profile, profileStatus, updateProfileStatusTC}) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile?.photos.large != null ? profile?.photos.large : UserPhotoNull}/>
                <ProfileStatusWithHooks status={profileStatus} updateProfileStatusTC={updateProfileStatusTC}/>
                <div>Полное имя: {profile.fullName}</div>
                <div>Контакты: {profile.contacts.vk}</div>
                <div>Ищу работу:{profile.lookingForAJob ? 'Да' : 'Нет'}</div>
                ava+description
            </div>
        </div>
    )
}
