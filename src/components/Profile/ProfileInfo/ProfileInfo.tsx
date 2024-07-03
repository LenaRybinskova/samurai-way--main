import React, {ChangeEvent, FC, useState} from 'react';
import s from './ProfilInfo.module.css'
import {ContactsType, ResponseAPIProfileType} from '../../../redux/profileReducer';
import Preloader from '../../common/preloader/Preloader';
import UserPhotoNull from '../../../assets/images/usersNull.png'
import ProfileStatusWithHooks from '../ProfileInfo/ProfileStatus/ProfileStatusWithHooks';
import {ReduxProfileDataForm} from '../../Profile/ProfileInfo/ProfileDataForm/ProfileDataForm';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRootSTateType} from '../../../redux/reduxStore';


export type ProfileInfoType = {
    profile: ResponseAPIProfileType | null
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
    const {userId} = useParams<{ userId: string }>()
    const ownUserId = useSelector<AppRootSTateType, string | null>(state => state.auth.userId)

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

    console.log('userId', userId)
    console.log('ownUserId', ownUserId)
    console.log('userId ==ownUserId', userId == ownUserId)
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile?.photos.large || UserPhotoNull} className={s.mainPhoto}/>

{/*                {userId === ownUserId && <input type={'file'} className={s.customFileInput} onChange={onMainPhotoSelected}/>}*/}
                                {isOwner && <input type={'file'} className={s.customFileInput} onChange={onMainPhotoSelected}/>}
                {editMode
                    ? <ReduxProfileDataForm initialValues={profile} profile={profile} isOwner={isOwner}
                                            onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} toEditMode={() => setEditMode(true)}/>}
                <ProfileStatusWithHooks status={profileStatus} updateProfileStatusTC={updateProfileStatusTC}/>
            </div>
        </div>
    )
}

export type ProfileDataType = {
    profile: ResponseAPIProfileType | null
    isOwner: boolean
    toEditMode: () => void
}


export const ProfileData: FC<ProfileDataType> = ({profile, isOwner, toEditMode}) => {

    return (
        <div>

            <div>{isOwner && <button onClick={() => {
                toEditMode()
            }}>редактировать</button>}</div>
            <div>Full name:
                <span>{profile?.fullName}</span>
            </div>
            <div>Looking for a job:
                <span>{profile?.lookingForAJob ? 'Да' : 'Нет'}</span>
            </div>
            <div>Description: {profile?.lookingForAJob &&
                <span> {profile.lookingForAJobDescription}</span>
            }</div>

            <div>About me:
                <span>{profile?.aboutMe}</span>
            </div>
            <div>Contacts:
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
        <div className={s.contacts}>{contactTitle}:{contactValue}</div>
    )
}

{/* <img src={profile?.photos.large != null ? profile?.photos.large : UserPhotoNull}/>*/
}