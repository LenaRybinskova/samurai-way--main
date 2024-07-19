import React, {ChangeEvent, FC, useState} from 'react';
import s from './ProfilInfo.module.css'
import {ContactsType, ProfileResaponseType} from '../../../redux/profileReducer';
import Preloader from '../../common/preloader/Preloader';
import UserPhotoNull from '../../../assets/images/usersNull.png'
import ProfileStatusWithHooks from '../ProfileInfo/ProfileStatus/ProfileStatusWithHooks';
import {ReduxProfileDataForm} from '../../Profile/ProfileInfo/ProfileDataForm/ProfileDataForm';


export type ProfileInfoType = {
    profile: ProfileResaponseType | null
    updateProfileStatusTC: (newStatus: string) => void
    profileStatus: string
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: ObtainedFormType) => Promise<void>
}

export type ObtainedFormType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription?: string
    MyProfessionalSkills: string

};


// Указываем тип  ИМЕННО ключей contacts // ContactsKeys будет СТРОГО типом 'github' | 'vk' | 'facebook' | 'instagram' | 'twitter' | 'website' | 'youtube' | 'mainLink'
export  type ContactsKeys = keyof ContactsType;

export const ProfileInfo: FC<ProfileInfoType> = ({
                                                     profile,
                                                     profileStatus,
                                                     updateProfileStatusTC,
                                                     isOwner,
                                                     savePhoto,
                                                     saveProfile
                                                 }) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: ObtainedFormType) => {
        saveProfile(formData).then(() => setEditMode(false))
    }

    return (
        <div className={s.descriptionBlock}>
            <div className={s.mainPhotoBlock}>
                <img src={profile?.photos.large || UserPhotoNull} className={s.mainPhoto}/>
                {isOwner && (
                    <label className={`${s.customLabelFileInput}`}>
                        <input type={'file'} onChange={onMainPhotoSelected}/>
                    </label>)
                }
            </div>
            {editMode
                ?
                <ReduxProfileDataForm initialValues={profile} profile={profile} isOwner={isOwner} onSubmit={onSubmit}/>
                : <ProfileData profile={profile} isOwner={isOwner} toEditMode={() => setEditMode(true)}/>}
            <ProfileStatusWithHooks status={profileStatus} updateProfileStatusTC={updateProfileStatusTC}/>
        </div>
    )
}

export type ProfileDataType = {
    profile: ProfileResaponseType | null
    isOwner: boolean
    toEditMode: () => void
}


export const ProfileData: FC<ProfileDataType> = ({profile, isOwner, toEditMode}) => {

    return (
        <div className={s.profileInfo}>
            <div>{isOwner && <button className={s.editProfileButton} onClick={() => {
                toEditMode()
            } }>редактировать профиль</button>}</div>
            <div><b>Full name: </b>
                <span>{profile?.fullName}</span>
            </div>
            <div><b>Looking for a job: </b>
                <span>{profile?.lookingForAJob ? 'Да' : 'Нет'}</span>
            </div>
            <div><b>Description: </b>{profile?.lookingForAJob &&
                <span> {profile.lookingForAJobDescription}</span>
            }</div>
            <div><b>About me: </b>
                <span>{profile?.aboutMe}</span>
            </div>
            <div><b>Contacts:</b>
                <div>{Object.keys(profile?.contacts as ContactsType).map((key: string) => {
                    return profile != null &&
                        <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as ContactsKeys]}/>
                })}</div>
            </div>

        </div>
    )

}


export type ContactType = {
    contactTitle: string
    contactValue?: string
}

export const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return (
        <div className={s.contacts}><b>{contactTitle}</b>:{contactValue}</div>
    )
}

{/* <img src={profile?.photos.large != null ? profile?.photos.large : UserPhotoNull}/>*/
}

{/*                {userId === ownUserId && <input type={'file'} className={s.customFileInput} onChange={onMainPhotoSelected}/>}*/
}


/*
(<button className={""}>
    <input type={'file'} id="inputFile" hidden
           className={`${s.customFileInput}`}
           onChange={onMainPhotoSelected}/>
    <label htmlFor={'inputFile'} className={'customFileUpload'}>изменить фото</label>
</button>*/
