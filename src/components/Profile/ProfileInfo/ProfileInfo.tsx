import React from 'react';
import s from './ProfilInfo.module.css'
import {ResponseAPIProfileType} from '../../../redux/profileReducer';
import Preloader from '../../common/preloader/Preloader';
import UserPhotoNull from '../../../assets/images/usersNull.png'
import ProfileStatusWithHooks from '../ProfileInfo/ProfileStatus/ProfileStatusWithHooks';


export type ProfileInfoType = {
    profile: ResponseAPIProfileType | null
    updateProfileStatusTC:(newStatus:string)=> void
    profileStatus:string
}

export const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) {return <Preloader/>}



    return (
        <div>
{/*            <div>
                <img
                    src="https://mobimg.b-cdn.net/v3/fetch/fe/fe9778a706308a25d2e6143e7bce5207.jpeg" alt=""/>
            </div>*/}
            <div className={s.descriptionBlock}>
                <img src={props.profile?.photos.large !=null ?props.profile?.photos.large : UserPhotoNull}/>
                <ProfileStatusWithHooks status={props.profileStatus} updateProfileStatusTC={props.updateProfileStatusTC} />
                <div>Полное имя: {props.profile.fullName}</div>
                <div>Контакты: {props.profile.contacts.vk}</div>
                <div>Ищу работу:{props.profile.lookingForAJob?"Да":"Нет"}</div>
                ava+description
            </div>
        </div>
    )
}

//props.profile?.photos.large? props.profile?.photos.large : "../../../assets/images/usersNull.png"