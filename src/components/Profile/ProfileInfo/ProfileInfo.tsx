import React, {ChangeEvent, ChangeEventHandler, FC} from 'react';
import s from './ProfilInfo.module.css'
import {ResponseAPIProfileType} from '../../../redux/profileReducer';
import Preloader from '../../common/preloader/Preloader';
import UserPhotoNull from '../../../assets/images/usersNull.png'
import ProfileStatusWithHooks from '../ProfileInfo/ProfileStatus/ProfileStatusWithHooks';


export type ProfileInfoType = {
    profile: ResponseAPIProfileType | null
    updateProfileStatusTC: (newStatus: string) => void
    profileStatus: string
    isOwner: boolean
    savePhoto: (file: File) => void
}

export const ProfileInfo: FC<ProfileInfoType> = ({
                                                     profile,
                                                     profileStatus,
                                                     updateProfileStatusTC,
                                                     isOwner,
                                                     savePhoto
                                                 }) => {
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log("e.target.files[0]",typeof e.target.files[0])
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                {/* <img src={profile?.photos.large != null ? profile?.photos.large : UserPhotoNull}/>*/}
                <img src={profile?.photos.large || UserPhotoNull} className={s.mainPhoto}/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={profileStatus} updateProfileStatusTC={updateProfileStatusTC}/>
                <div>Полное имя: {profile.fullName}</div>
                <div>Контакты: {profile.contacts.vk}</div>
                <div>Ищу работу:{profile.lookingForAJob ? 'Да' : 'Нет'}</div>
                ava+description
            </div>
        </div>
    )
}
